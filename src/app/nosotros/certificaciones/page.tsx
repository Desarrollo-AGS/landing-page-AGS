import type { Metadata } from "next";
import { ArrowUpRight, ShieldWarning } from "@phosphor-icons/react/dist/ssr";
import { CabeceraPagina } from "@/components/ui/CabeceraPagina";
import { Contenedor } from "@/components/ui/Contenedor";
import { Revelar } from "@/components/ui/Revelar";
import { ContactoBloque } from "@/components/home/ContactoBloque";
import { certificaciones, marcoRegulatorio } from "@/content/certificaciones";
import { mailHref, site } from "@/content/site";
import { metadatosDe } from "@/lib/seo";

export const metadata: Metadata = metadatosDe({
  titulo: "Permisos, normas y certificaciones",
  descripcion:
    "Marco regulatorio bajo el que AGS Soluciones opera drones en Chile, conforme a la DAN 151 de la DGAC en su edición vigente.",
  ruta: "/nosotros/certificaciones",
});

/**
 * F-05 · Permisos, normas y certificaciones.
 *
 * =================== POR QUÉ ESTA PÁGINA ESTÁ VACÍA ===================
 * No está incompleta por descuido. Publicar una certificación vencida, o una
 * que no se posee, es un riesgo legal y comercial concreto en una licitación
 * minera o energética: el mandante la verifica.
 *
 * La lista se llena SOLO con lo que AGS valide, con entidad emisora, número y
 * vigencia reales. Hasta entonces la página declara que está en preparación y
 * ofrece el canal para pedir los documentos, que es lo que efectivamente hace
 * un evaluador. Es preferible eso a una tabla verosímil e inventada.
 * ======================================================================
 */
export default function PaginaCertificaciones() {
  const hayCertificaciones = certificaciones.length > 0;

  return (
    <>
      <CabeceraPagina
        titulo="Permisos, normas y certificaciones"
        bajada="Bajo qué marco opera AGS y qué documentación respalda cada vuelo."
        migas={[{ label: "Nosotros", href: "/nosotros" }, { label: "Certificaciones" }]}
      />

      {/* ---- Marco regulatorio: contexto, no una declaración de AGS ---- */}
      <section className="bg-white py-16 sm:py-20">
        <Contenedor>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-16">
            <Revelar>
              <span className="rule-accent mb-6" aria-hidden="true" />
              <h2 className="text-d3 text-steel-900">La norma vigente</h2>
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-steel-500">
                Toda operación de drones en Chile se rige por la normativa de la DGAC. Cualquier
                proveedor que opere en faena debe acreditarla.
              </p>
            </Revelar>

            <Revelar delay={0.08}>
              <div className="chamfer bg-steel-50 p-8 sm:p-10">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <h3 className="text-d4 text-steel-900">{marcoRegulatorio.norma}</h3>
                  <span className="border border-orange px-2 py-0.5 text-[0.75rem] font-semibold text-orange-ink">
                    {marcoRegulatorio.edicion}
                  </span>
                </div>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-steel-700">
                  {marcoRegulatorio.descripcion}
                </p>
                <dl className="mt-8 grid gap-6 border-t border-steel-200 pt-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs text-steel-500">Entidad</dt>
                    <dd className="mt-1.5 text-[0.9375rem] font-medium text-steel-900">
                      {marcoRegulatorio.entidad}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-steel-500">Vigente desde</dt>
                    <dd className="mt-1.5 text-[0.9375rem] font-medium text-steel-900">
                      {marcoRegulatorio.vigenteDesde}
                    </dd>
                  </div>
                </dl>
              </div>
            </Revelar>
          </div>
        </Contenedor>
      </section>

      {/* ---- Listado, o estado de pendiente ---- */}
      <section className="bg-steel-50 py-16 sm:py-20">
        <Contenedor>
          <Revelar>
            <h2 className="text-d3 text-steel-900">Documentación de AGS</h2>
          </Revelar>

          {hayCertificaciones ? (
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[38rem] border-collapse text-left">
                <thead>
                  <tr className="border-b border-steel-300">
                    {["Documento", "Entidad emisora", "Número", "Vigente hasta"].map((h) => (
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
                        {c.vigenteHasta ?? "Indefinida"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Revelar delay={0.06}>
              <div className="chamfer mt-10 max-w-[46rem] border border-steel-200 bg-white p-8 sm:p-10">
                <ShieldWarning
                  size={26}
                  weight="light"
                  aria-hidden="true"
                  className="text-orange"
                />
                <h3 className="mt-5 text-xl font-semibold text-steel-900">
                  Listado en preparación
                </h3>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-steel-700">
                  Estamos consolidando los permisos, autorizaciones y certificaciones vigentes
                  con su entidad emisora y su fecha de vencimiento, para publicarlos acá de
                  forma verificable.
                </p>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-steel-600">
                  Si necesitas la documentación para una licitación o una acreditación de
                  contratista, la enviamos directamente.
                </p>
                <a
                  href={mailHref}
                  className="mt-7 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-orange-ink underline-offset-4 hover:underline"
                >
                  Solicitar documentación a {site.contacto.email}
                  <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
                </a>
              </div>
            </Revelar>
          )}
        </Contenedor>
      </section>

      <ContactoBloque />
    </>
  );
}
