import type { Metadata } from "next";
import { Librito } from "@/components/brochure/Librito";
import { ContactoBloque } from "@/components/home/ContactoBloque";
import { CabeceraPagina } from "@/components/ui/CabeceraPagina";
import { brochure, contratapa } from "@/content/brochure";
import { metadatosDe } from "@/lib/seo";

export const metadata: Metadata = metadatosDe({
  titulo: "Brochure AGS 2026",
  descripcion:
    "Hojea el brochure comercial de AGS Soluciones: capacidades operacionales, servicios con drones, plataformas digitales y por qué elegirnos.",
  ruta: "/nosotros/brochure",
});

/**
 * Brochure comercial de AGS, como librito que se hojea en la web.
 *
 * El escenario es oscuro para que las páginas, que son oscuras, se lean como
 * un objeto sobre la mesa y no como una imagen pegada en la página. Termina,
 * como todas las páginas internas, en el bloque de contacto.
 */
export default function PaginaBrochure() {
  return (
    <>
      <CabeceraPagina
        titulo={brochure.titulo}
        bajada="La presentación comercial de AGS: capacidades operacionales, servicios, plataformas y por qué elegirnos."
        migas={[{ label: "Nosotros", href: "/nosotros" }, { label: "Brochure" }]}
      />

      <section aria-label="Brochure" className="border-t border-white/5 bg-steel-950 py-12 sm:py-16">
        <Librito
          titulo={brochure.titulo}
          ancho={brochure.ancho}
          alto={brochure.alto}
          paginas={brochure.paginas}
          contratapa={contratapa}
        />
        <p className="mx-auto mt-8 max-w-[1600px] px-4 text-[0.8125rem] text-steel-500 sm:px-8">
          Arrastra la esquina de la hoja o usa las flechas del teclado para pasar de página.
        </p>
      </section>

      <ContactoBloque />
    </>
  );
}
