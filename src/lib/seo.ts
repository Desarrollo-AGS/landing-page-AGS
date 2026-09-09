import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * Metadatos por página (criterio transversal de SEO del brief): ninguna página
 * hereda el title ni la description del home.
 */

export const TITULO_BASE =
  "Servicios de drones en Antofagasta para minería, energía y construcción";
export const DESCRIPCION_BASE =
  "AGS Soluciones opera drones industriales en Chile, Perú y Argentina: inspección termográfica de plantas fotovoltaicas, líneas eléctricas, topografía y aerofotogrametría, limpieza de fachadas e inspección de instalaciones.";

/** Imagen de compartido por defecto. Ver nota en `app/opengraph-image.tsx`. */
const OG_POR_DEFECTO = "/opengraph-image";

export function metadatosDe({
  titulo,
  descripcion,
  ruta,
  imagen,
  tipo = "website",
  publicado,
}: {
  titulo: string;
  descripcion: string;
  ruta: string;
  imagen?: string | null;
  tipo?: "website" | "article";
  publicado?: string;
}): Metadata {
  const url = `${site.url}${ruta}`;
  const og = imagen ?? OG_POR_DEFECTO;

  return {
    title: titulo,
    description: descripcion,
    alternates: { canonical: ruta },
    openGraph: {
      title: titulo,
      description: descripcion,
      url,
      siteName: site.nombre,
      locale: "es_CL",
      type: tipo,
      images: [{ url: og, width: 1200, height: 630, alt: titulo }],
      ...(publicado ? { publishedTime: publicado } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: titulo,
      description: descripcion,
      images: [og],
    },
  };
}

/** Datos estructurados de organización, con dirección y teléfono reales. */
export const organizacionJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#organizacion`,
  name: site.nombre,
  legalName: site.nombreLargo,
  url: site.url,
  description: DESCRIPCION_BASE,
  foundingDate: String(site.fundacion),
  telephone: site.contacto.telefonoE164,
  email: site.contacto.email,
  image: `${site.url}/brand/ags-logo-color.svg`,
  logo: `${site.url}/brand/ags-logo-color.svg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.contacto.direccion.calle}, ${site.contacto.direccion.detalle}`,
    addressLocality: site.contacto.direccion.ciudad,
    addressRegion: site.contacto.direccion.regionLarga,
    addressCountry: site.contacto.direccion.pais,
  },
  areaServed: site.operacion.map((pais) => ({ "@type": "Country", name: pais })),
  sameAs: [site.redes.linkedin, site.redes.instagram],
};
