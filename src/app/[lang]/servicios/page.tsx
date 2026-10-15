import type { Metadata } from "next";
import { CabeceraPagina } from "@/components/ui/CabeceraPagina";
import { ListadoServicios } from "@/components/servicios/ListadoServicios";
import { ContactoBloque } from "@/components/home/ContactoBloque";
import { metadatosDe } from "@/lib/seo";
import { diccionario } from "@/content/i18n";
import { IDIOMA_POR_DEFECTO, esIdioma } from "@/lib/idioma";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const idioma = esIdioma(lang) ? lang : IDIOMA_POR_DEFECTO;
  const seo = diccionario(idioma).seo.paginas["/servicios"];
  return metadatosDe({ ...seo, ruta: "/servicios", lang: idioma });
}

export default async function PaginaServicios({ params }: Props) {
  const { lang } = await params;
  const idioma = esIdioma(lang) ? lang : IDIOMA_POR_DEFECTO;
  const t = diccionario(idioma);

  return (
    <>
      <CabeceraPagina
        titulo={t.paginas.servicios.titulo}
        bajada={t.paginas.servicios.bajada}
        migas={[{ label: t.paginas.migas["/servicios"] }]}
        lang={idioma}
      />

      <ListadoServicios lang={idioma} />

      <ContactoBloque lang={idioma} />
    </>
  );
}
