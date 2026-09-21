/**
 * BROCHURE · el librito de /nosotros/brochure.
 *
 * Las páginas son las del PDF "Brochure AGS 26'" (Canva, 8 páginas de
 * 1440 × 810 pt), renderizadas con `pdftoppm` y comprimidas a WebP en dos
 * tamaños: 1200px para el libro y 2400px para ampliar y pantalla completa.
 * La página 8 del PDF viene en blanco y no se usa: la contratapa se arma en
 * HTML con los datos vigentes de `site.ts`.
 *
 * PARA ACTUALIZAR EL BROCHURE
 * ---------------------------
 * Se reemplazan los archivos de `public/brochure/` manteniendo los nombres, y
 * se ajusta esta lista si cambia la cantidad de páginas o su contenido. No hay
 * que tocar el componente.
 *
 * CONTENIDO QUE HAY QUE CORREGIR EN EL PDF (pendientes 11 y 15 del README)
 * -------------------------------------------------------------------------
 *   · Página 2: "Fundada en 2015". El sitio publica 2016.
 *   · Página 7: incluye el teléfono +56 9 8199 2658, que quedó obsoleto.
 */

import { mailHref, site, telHref } from "./site";

export interface PaginaBrochure {
  /** 1200px de ancho: el libro, a doble página o a una. */
  src: string;
  /** 2400px de ancho: ampliación y pantalla completa. */
  srcGrande: string;
  titulo: string;
  /** Descripción del contenido de la página, para lectores de pantalla. */
  alt: string;
}

const pagina = (n: number, titulo: string, alt: string): PaginaBrochure => {
  const id = String(n).padStart(2, "0");
  return {
    src: `/brochure/pagina-${id}-1200.webp`,
    srcGrande: `/brochure/pagina-${id}.webp`,
    titulo,
    alt,
  };
};

export const brochure = {
  titulo: "Brochure AGS 2026",
  /** Proporción de la página del PDF original. */
  ancho: 1440,
  alto: 810,
  paginas: [
    pagina(
      1,
      "Portada",
      "Portada del brochure: AGS Soluciones Industriales Aéreas. Eficiencia operacional, cero riesgo e información de terreno en tiempo real.",
    ),
    pagina(
      2,
      "Sobre nosotros",
      "Sobre nosotros: empresa chilena especializada en servicios aéreos e inteligencia de datos con drones para minería, energía y construcción.",
    ),
    pagina(
      3,
      "Capacidades operacionales",
      "Nuestras capacidades operacionales: servicios en faena, inteligencia de datos con entrega en plataformas digitales y seguridad HSEC.",
    ),
    pagina(
      4,
      "Servicios",
      "Servicios: topografía aérea y aerofotogrametría, inspección termográfica y visual fotovoltaica, inspección de líneas eléctricas, inspección de instalaciones industriales y limpieza de fachadas y maquinarias con drones.",
    ),
    pagina(
      5,
      "Softwares",
      "Softwares y diferenciales: las plataformas Smart Field, Smart Layout y Smart Inspections.",
    ),
    pagina(
      6,
      "Por qué AGS",
      "Por qué elegir AGS: presencia local, cumplimiento, seguridad operacional e innovación constante.",
    ),
    pagina(7, "Contacto", "Cierre del brochure: invitación a agendar una prueba y datos de contacto."),
  ] satisfies PaginaBrochure[],
};

/** Contratapa en HTML: datos de contacto vigentes, desde la fuente única. */
export const contratapa = {
  titulo: "Hablemos de su operación.",
  correo: { label: site.contacto.email, href: mailHref },
  telefono: { label: site.contacto.telefono, href: telHref },
  sitio: site.url.replace(/^https?:\/\//, "www."),
  ciudad: `${site.contacto.direccion.ciudad}, ${site.contacto.direccion.regionLarga}`,
};

export type Contratapa = typeof contratapa;
