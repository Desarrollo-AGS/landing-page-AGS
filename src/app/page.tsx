import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ClientesFranja } from "@/components/home/ClientesFranja";
import { ServiciosIndice } from "@/components/home/ServiciosIndice";
import { FaenaVideo } from "@/components/home/FaenaVideo";
import { NosotrosBloque } from "@/components/home/NosotrosBloque";
import { CasosBloque } from "@/components/home/CasosBloque";
import { SoftwareBloque } from "@/components/home/SoftwareBloque";
import { NoticiasBloque } from "@/components/home/NoticiasBloque";
import { ContactoBloque } from "@/components/home/ContactoBloque";
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
 *   Hero        qué hacen
 *   Clientes    a quién le han hecho esto antes
 *   Servicios   qué operaciones cubren
 *   Faena       cómo se ve en terreno de verdad
 *   Nosotros    quiénes son
 *   Casos       la prueba con cifras
 *   Software    qué queda después del vuelo
 *   Noticias    si la empresa está viva
 *   Contacto    cómo se parte
 *
 * Ninguna familia de layout se repite: tarjetas asimétricas, marquesina, banda
 * de video a sangre, dos columnas con foto, grilla de datos y formulario
 * partido son seis composiciones distintas.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <ClientesFranja />
      <ServiciosIndice />
      <FaenaVideo />
      <NosotrosBloque />
      <CasosBloque />
      <SoftwareBloque />
      <NoticiasBloque />
      <ContactoBloque />
    </>
  );
}
