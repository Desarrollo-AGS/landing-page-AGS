import type { Metadata } from "next";
import { Newspaper } from "@phosphor-icons/react/dist/ssr";
import { CabeceraPagina } from "@/components/ui/CabeceraPagina";
import { Contenedor } from "@/components/ui/Contenedor";
import { Revelar } from "@/components/ui/Revelar";
import { TarjetaNoticia } from "@/components/ui/TarjetaNoticia";
import { ContactoBloque } from "@/components/home/ContactoBloque";
import { getNoticias } from "@/content/noticias";
import { metadatosDe } from "@/lib/seo";

export const metadata: Metadata = metadatosDe({
  titulo: "Noticias y novedades",
  descripcion:
    "Novedades de AGS Soluciones: campañas de inspección, nuevos servicios, participación en ferias y actividad de la empresa en Antofagasta.",
  ruta: "/noticias",
});

/**
 * F-09 · Índice de noticias.
 *
 * Se comporta bien con cero, una y veinte: sin noticias muestra un estado
 * vacío redactado, con una muestra una sola tarjeta a ancho normal (no
 * estirada a tres columnas), y con muchas la grilla crece sin cambios.
 */
export default async function PaginaNoticias() {
  const noticias = await getNoticias();

  return (
    <>
      <CabeceraPagina
        titulo="Noticias"
        bajada="Campañas, servicios nuevos y actividad de la empresa."
        migas={[{ label: "Noticias" }]}
      />

      <section className="bg-white py-16 sm:py-20">
        <Contenedor>
          {noticias.length === 0 ? (
            <div className="chamfer max-w-[38rem] border border-steel-200 bg-steel-50 p-8 sm:p-10">
              <Newspaper
                size={26}
                weight="light"
                aria-hidden="true"
                className="text-steel-400"
              />
              <h2 className="mt-5 text-xl font-semibold text-steel-900">
                Todavía no hay noticias publicadas
              </h2>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-steel-600">
                Cuando publiquemos la primera, aparecerá acá y también en la portada. Mientras
                tanto, los proyectos ejecutados están en la sección de casos.
              </p>
            </div>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {noticias.map((n, i) => (
                <Revelar as="li" key={n.slug} delay={(i % 3) * 0.06} className="h-full h-full">
                  <TarjetaNoticia noticia={n} />
                </Revelar>
              ))}
            </ul>
          )}
        </Contenedor>
      </section>

      <ContactoBloque />
    </>
  );
}
