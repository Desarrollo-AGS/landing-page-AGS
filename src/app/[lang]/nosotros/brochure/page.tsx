import type { Metadata } from "next";
import { Librito } from "@/components/brochure/Librito";
import { ContactoBloque } from "@/components/home/ContactoBloque";
import { CabeceraPagina } from "@/components/ui/CabeceraPagina";
import { brochure, contratapa } from "@/content/brochure";
import { metadatosDe } from "@/lib/seo";
import { diccionario } from "@/content/i18n";
import { IDIOMA_POR_DEFECTO, esIdioma } from "@/lib/idioma";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const idioma = esIdioma(lang) ? lang : IDIOMA_POR_DEFECTO;
  const seo = diccionario(idioma).seo.paginas["/nosotros/brochure"];
  return metadatosDe({ ...seo, ruta: "/nosotros/brochure", lang: idioma });
}

/**
 * Brochure comercial de AGS, como librito que se hojea en la web.
 *
 * El escenario es oscuro para que las páginas, que son oscuras, se lean como
 * un objeto sobre la mesa y no como una imagen pegada en la página. Termina,
 * como todas las páginas internas, en el bloque de contacto.
 */
export default async function PaginaBrochure({ params }: Props) {
  const { lang } = await params;
  const idioma = esIdioma(lang) ? lang : IDIOMA_POR_DEFECTO;
  const t = diccionario(idioma);

  return (
    <>
      <CabeceraPagina
        titulo={brochure.titulo}
        bajada={t.paginas.brochure.bajada}
        migas={[
          { label: t.paginas.migas["/nosotros"], href: "/nosotros" },
          { label: t.paginas.migas["/nosotros/brochure"] },
        ]}
        lang={idioma}
      />

      <section
        aria-label={t.paginas.migas["/nosotros/brochure"]}
        className="border-t border-white/5 bg-steel-950 py-12 sm:py-16"
      >
        <Librito
          titulo={brochure.titulo}
          ancho={brochure.ancho}
          alto={brochure.alto}
          paginas={brochure.paginas}
          contratapa={contratapa}
          lang={idioma}
        />
        <p className="mx-auto mt-8 max-w-[1600px] px-4 text-[0.8125rem] text-steel-500 sm:px-8">
          {t.paginas.brochure.instruccion}
        </p>
      </section>

      <ContactoBloque lang={idioma} />
    </>
  );
}
