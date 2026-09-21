import type { Metadata } from "next";
import { ContactoBloque } from "@/components/home/ContactoBloque";
import { NoticiasBloque } from "@/components/home/NoticiasBloque";
import { InicioGsap } from "@/components/vistaPrevia/inicio/InicioGsap";
import { DESCRIPCION_BASE, TITULO_BASE, metadatosDe } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata: Metadata = metadatosDe({
  titulo: `${TITULO_BASE} | ${site.nombre}`,
  descripcion: DESCRIPCION_BASE,
  ruta: "/",
});

/**
 * ORDEN DE LA PORTADA
 * -------------------
 * Cada sección responde una pregunta distinta, en el orden en que se la hace
 * alguien de abastecimiento evaluando un proveedor:
 *
 *   Portada     qué hacen
 *   Clientes    a quién le han hecho esto antes
 *   Servicios   qué operaciones cubren
 *   Faena       cómo se ve en terreno de verdad
 *   Nosotros    quiénes son
 *   Casos       la prueba con cifras
 *   Software    qué queda después del vuelo
 *   Noticias    si la empresa está viva
 *   Contacto    cómo se parte
 *
 * Las siete primeras son un recorrido con capítulos fijados, coreografía GSAP y
 * el dron 3D acompañando (ver `InicioGsap`). Noticias y contacto son la cola de
 * la página y se leen solas: el recorrido del dron termina antes, en casos.
 */
export default function Home() {
  return (
    <>
      <InicioGsap />
      <NoticiasBloque />
      <ContactoBloque />
    </>
  );
}
