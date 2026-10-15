import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { CabeceraPagina } from "@/components/ui/CabeceraPagina";
import { Contenedor } from "@/components/ui/Contenedor";
import { Revelar } from "@/components/ui/Revelar";
import { ContactoBloque } from "@/components/home/ContactoBloque";
import { aoc, certificaciones, marcoRegulatorio } from "@/content/certificaciones";
import { metadatosDe } from "@/lib/seo";
import { diccionario } from "@/content/i18n";
import { IDIOMA_POR_DEFECTO, esIdioma } from "@/lib/idioma";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const idioma = esIdioma(lang) ? lang : IDIOMA_POR_DEFECTO;
  const seo = diccionario(idioma).seo.paginas["/nosotros/certificaciones"];
  return metadatosDe({ ...seo, ruta: "/nosotros/certificaciones", lang: idioma });
}

/**
 * F-05 · Permisos, normas y certificaciones.
 *
 * ORDEN DE LA PÁGINA
 * ------------------
 * Primero el AOC, porque es la pregunta que trae a alguien a esta página:
 * si la empresa está habilitada para volar. Después la norma bajo la que se
 * vuela, que es contexto del rubro y no una credencial de AGS. Y al final la
 * tabla de documentos, que solo aparece cuando hay documentos.
 *
 * Lo que se publique en esa tabla se llena SOLO con lo que AGS valide, con
 * entidad emisora, número y vigencia reales: publicar una certificación
 * vencida, o una que no se posee, es un riesgo concreto en una licitación
 * minera, donde el mandante la verifica.
 */
export default async function PaginaCertificaciones({ params }: Props) {
  const { lang } = await params;
  const idioma = esIdioma(lang) ? lang : IDIOMA_POR_DEFECTO;
  const t = diccionario(idioma);
  const pag = t.paginas.certificaciones;
  const hayCertificaciones = certificaciones.length > 0;

  return (
    <>
      <CabeceraPagina
        titulo={pag.titulo}
        bajada={pag.bajada}
        migas={[
          { label: t.paginas.migas["/nosotros"], href: "/nosotros" },
          { label: t.paginas.migas["/nosotros/certificaciones"] },
        ]}
        lang={idioma}
      />

      {/* ---- EL AOC. Lo primero y lo más grande de la página ----
          Quien evalúa un proveedor de drones busca una sola cosa antes que
          cualquier otra: si está habilitado para volar de forma remunerada.
          Por eso el AOC encabeza, ocupa el ancho completo y lleva la foto del
          aparato al lado; la norma bajo la que se vuela viene después y más
          chica, porque es contexto y no una credencial de AGS.

          El enlace al registro de la DGAC no es un adorno: una empresa que
          dice de sí misma que está certificada vale poco, y el enlace deja
          que el lector lo compruebe en la fuente sin pedirnos nada. */}
      <section className="bg-white py-16 sm:py-20">
        <Contenedor>
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-16">
            <Revelar>
              <span className="rule-accent mb-6" aria-hidden="true" />
              <p className="eyebrow text-steel-500">{pag.aocAntetitulo}</p>
              <h2 className="mt-3 text-d3 text-steel-900">{pag.aocTitulo}</h2>
              <p className="measure mt-5 text-[1.0625rem] leading-relaxed text-steel-700">
                {pag.aocParrafo}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-steel-100 pt-7">
                <Image
                  src={aoc.logoEntidad}
                  alt={pag.aocLogoAlt}
                  width={560}
                  height={237}
                  className="h-14 w-auto shrink-0"
                />
                <a
                  href={aoc.fuente}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-orange-ink underline-offset-4 hover:underline"
                >
                  {pag.aocVerificar}
                  <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
                </a>
              </div>
            </Revelar>

            {/* La insignia va SOBRE la fotografía del aparato: el permiso y la
                máquina que habilita, en una sola imagen. */}
            <Revelar delay={0.08}>
              <div className="relative">
                <div className="chamfer relative aspect-[3/2] overflow-hidden bg-steel-100">
                  <Image
                    src={aoc.foto}
                    alt={pag.aocFotoAlt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <Image
                  src={aoc.insignia}
                  alt={pag.aocInsigniaAlt}
                  width={220}
                  height={96}
                  className="absolute -bottom-5 left-5 h-auto w-[9.5rem] bg-white p-2 shadow-e3 sm:left-7 sm:w-[11rem]"
                />
              </div>
            </Revelar>
          </div>
        </Contenedor>
      </section>

      {/* ---- La norma, en segundo plano ---- */}
      <section className="bg-steel-50 py-16 sm:py-20">
        <Contenedor>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-16">
            <Revelar>
              <h2 className="text-d4 text-steel-900">{pag.normaTitulo}</h2>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-steel-500">
                {pag.normaParrafo}
              </p>
            </Revelar>

            <Revelar delay={0.08}>
              <div className="chamfer bg-white p-8 sm:p-10">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <h3 className="text-d4 text-steel-900">{marcoRegulatorio.norma}</h3>
                  <span className="border border-orange px-2 py-0.5 text-[0.75rem] font-semibold text-orange-ink">
                    {t.certificaciones.edicion}
                  </span>
                </div>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-steel-700">
                  {t.certificaciones.descripcion}
                </p>
                <dl className="mt-8 grid gap-6 border-t border-steel-200 pt-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs text-steel-500">{pag.entidad}</dt>
                    <dd className="mt-1.5 text-[0.9375rem] font-medium text-steel-900">
                      {t.certificaciones.entidad}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-steel-500">{pag.vigenteDesde}</dt>
                    <dd className="mt-1.5 text-[0.9375rem] font-medium text-steel-900">
                      {t.certificaciones.vigenteDesde}
                    </dd>
                  </div>
                </dl>
              </div>
            </Revelar>
          </div>
        </Contenedor>
      </section>

      {/* ---- Documentación de AGS ----
          Solo cuando haya algo que listar. El bloque de "listado en
          preparación" se quitó: una sección cuyo único contenido es decir que
          está vacía no le sirve a nadie, y el canal para pedir documentos ya
          está en el bloque de contacto del pie. La tabla se queda armada: el
          día que `certificaciones` tenga entradas, la sección aparece sola. */}
      {hayCertificaciones ? (
        <section className="bg-white py-16 sm:py-20">
          <Contenedor>
            <Revelar>
              <h2 className="text-d3 text-steel-900">{pag.docTitulo}</h2>
            </Revelar>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[38rem] border-collapse text-left">
                <thead>
                  <tr className="border-b border-steel-300">
                    {pag.tabla.map((h) => (
                      <th
                        key={h}
                        scope="col"
                        className="pb-3 pr-6 text-xs font-semibold uppercase tracking-[0.08em] text-steel-500"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {certificaciones.map((c) => (
                    <tr key={c.nombre} className="border-b border-steel-200">
                      <td className="py-4 pr-6 text-[0.9375rem] font-medium text-steel-900">
                        {c.nombre}
                      </td>
                      <td className="py-4 pr-6 text-[0.9375rem] text-steel-600">{c.entidad}</td>
                      <td className="num py-4 pr-6 text-[0.9375rem] text-steel-600">
                        {c.numero ?? "—"}
                      </td>
                      <td className="num py-4 text-[0.9375rem] text-steel-600">
                        {c.vigenteHasta ?? pag.indefinida}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Contenedor>
        </section>
      ) : null}

      <ContactoBloque lang={idioma} />
    </>
  );
}
