import type { Metadata } from "next";
import { CabeceraPagina } from "@/components/ui/CabeceraPagina";
import { ContactoBloque } from "@/components/home/ContactoBloque";
import { metadatosDe } from "@/lib/seo";
import { site } from "@/content/site";
import { diccionario } from "@/content/i18n";
import { IDIOMA_POR_DEFECTO, esIdioma } from "@/lib/idioma";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const idioma = esIdioma(lang) ? lang : IDIOMA_POR_DEFECTO;
  const seo = diccionario(idioma).seo.paginas["/contacto"];

  return metadatosDe({
    titulo: seo.titulo,
    descripcion: seo.descripcion
      .replace("{telefono}", site.contacto.telefono)
      .replace("{email}", site.contacto.email),
    ruta: "/contacto",
    lang: idioma,
  });
}

/**
 * El botón flotante de WhatsApp lo monta el layout raíz, y se aparta solo
 * cuando el control de envío del formulario entra en pantalla (ver
 * `BotonWhatsApp`). Acá no hay que hacer nada especial.
 */
export default async function PaginaContacto({ params }: Props) {
  const { lang } = await params;
  const idioma = esIdioma(lang) ? lang : IDIOMA_POR_DEFECTO;
  const t = diccionario(idioma);

  return (
    <>
      <CabeceraPagina
        titulo={t.paginas.contacto.titulo}
        bajada={t.paginas.contacto.bajada}
        migas={[{ label: t.paginas.migas["/contacto"] }]}
        lang={idioma}
      />
      <ContactoBloque conTitulo={false} lang={idioma} />
    </>
  );
}
