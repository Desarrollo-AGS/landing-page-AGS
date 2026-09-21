import type { Metadata } from "next";
import { ContactoBloque } from "@/components/home/ContactoBloque";
import { IndustrialAirOperations } from "@/components/vistaPrevia/iao/IndustrialAirOperations";

/**
 * Vista previa privada: la PRIMERA versión del brochure, la del recorrido con
 * GSAP y el dron 3D, que se descartó al reemplazarla por el librito estilo
 * FlipHTML5 que hoy vive en /nosotros/brochure.
 *
 * NO ES NAVEGABLE. No está en `nav.ts` ni en `sitemap.ts`, ninguna página
 * enlaza acá y `robots.ts` bloquea /vista-previa/. Se llega solo escribiendo
 * la URL. Es material de revisión, no una página del sitio.
 *
 * Vive aparte de `components/brochure/` (el librito) para que las dos versiones
 * puedan convivir sin pisarse: sus datos están en `content/brochureIao.ts` y su
 * dron en `components/vistaPrevia/iao/`.
 */
export const metadata: Metadata = {
  title: "Vista previa · AGS Industrial Air Operations",
  robots: { index: false, follow: false, nocache: true },
};

export default function PaginaVistaPreviaBrochureGsap() {
  return (
    <>
      <IndustrialAirOperations />
      <ContactoBloque />
    </>
  );
}
