import type { Metadata } from "next";
import { CabeceraPagina } from "@/components/ui/CabeceraPagina";
import { ContactoBloque } from "@/components/home/ContactoBloque";
import { metadatosDe } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata: Metadata = metadatosDe({
  titulo: "Contacto y cotización",
  descripcion: `Cotiza un servicio con drones en Antofagasta. Teléfono ${site.contacto.telefono}, correo ${site.contacto.email}.`,
  ruta: "/contacto",
});

/**
 * El botón flotante de WhatsApp lo monta el layout raíz, y se aparta solo
 * cuando el control de envío del formulario entra en pantalla (ver
 * `BotonWhatsApp`). Acá no hay que hacer nada especial.
 */
export default function PaginaContacto() {
  return (
    <>
      <CabeceraPagina
        titulo="Cuéntanos qué hay que inspeccionar"
        bajada="Revisamos el caso y enviamos propuesta técnica y comercial. Si la operación lo requiere, coordinamos una visita a faena."
        migas={[{ label: "Contacto" }]}
      />
      <ContactoBloque conTitulo={false} />
    </>
  );
}
