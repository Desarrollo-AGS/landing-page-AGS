export const siteConfig = {
  name: "AGS Soluciones",
  url: "https://agssoluciones.cl",
  defaultTitle:
    "Servicios de Drones en Antofagasta | Minería, Energía y Construcción — AGS Soluciones",
  defaultDescription:
    "Servicios profesionales de drones en Antofagasta para minería, energía y construcción: inspección termográfica, topografía y aerofotogrametría, limpieza de fachadas y más.",
  /**
   * Datos reales confirmados: sección 1.2 del spec + verificación en agssoluciones.cl
   * (número de WhatsApp del sitio coincide: 56981992658). No hay una dirección con
   * calle/número real disponible en ningún lugar del sitio actual (el footer en vivo
   * está vacío) — se usa solo localidad/región/país, sin inventar streetAddress.
   */
  contacto: {
    email: "servicios@agssoluciones.cl",
    telefono: "+56 9 8199 2658",
    telefonoE164: "+56981992658",
    direccion: {
      localidad: "Antofagasta",
      region: "Antofagasta",
      pais: "CL",
    },
  },
  /**
   * URLs reales provistas por el cliente (spec_mejoras_landing_page.md, ticket 7).
   * Antes se habían omitido a propósito en Footer.tsx y en el `sameAs` del schema
   * LocalBusiness (ticket 6.2) por no tener una fuente real — ya confirmadas.
   */
  redes: {
    linkedin: "https://cl.linkedin.com/company/agssoluciones",
    instagram: "https://www.instagram.com/agssoluciones.cl/",
  },
} as const;

// Helpers de generateMetadata() por ruta se implementan en Sprint 6 (SEO técnico, ticket 6.1).
