import type { Metadata } from "next";
import { ContactoBloque } from "@/components/home/ContactoBloque";
import { NoticiasBloque } from "@/components/home/NoticiasBloque";
import { InicioGsap } from "@/components/vistaPrevia/inicio/InicioGsap";
import { IDIOMA_POR_DEFECTO, esIdioma } from "@/lib/idioma";
import { metadatosDe } from "@/lib/seo";
import { diccionario } from "@/content/i18n";
import { site } from "@/content/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const idioma = esIdioma(lang) ? lang : IDIOMA_POR_DEFECTO;
  const t = diccionario(idioma).seo.paginas["/"];

  return metadatosDe({
    titulo: `${t.titulo} | ${site.nombre}`,
    descripcion: t.descripcion,
    ruta: "/",
    lang: idioma,
  });
}

/**
 * ORDEN DE LA PORTADA
 * -------------------
 * Cada sección responde una pregunta distinta, en el orden en que se la hace
 * alguien de abastecimiento evaluando un proveedor:
 *
 *   Portada     qué hacen
 *   Clientes    a quién le han hecho esto antes
 *   Servicios   qué operaciones cubren
 *   Software    qué queda después del vuelo
 *   Faena       cómo se ve en terreno de verdad
 *   Nosotros    quiénes son
 *   Proyectos   la prueba con cifras
 *   Noticias    si la empresa está viva
 *   Contacto    cómo se parte
 *
 * El software va pegado a servicios y no al final: la plataforma no es un
 * producto aparte, es la parte del servicio que queda cuando el vuelo termina,
 * y leerla ahí es lo que lo deja claro.
 *
 * Las siete primeras son un recorrido con capítulos fijados, coreografía GSAP y
 * el dron 3D acompañando (ver `InicioGsap`). Noticias y contacto son la cola de
 * la página y se leen solas: el recorrido del dron termina antes, en casos.
 */
export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const idioma = esIdioma(lang) ? lang : IDIOMA_POR_DEFECTO;
  return (
    <>
      <InicioGsap lang={idioma} />
      <NoticiasBloque lang={idioma} />
      <ContactoBloque lang={idioma} />
    </>
  );
}
