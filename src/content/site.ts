/**
 * FUENTE ÚNICA DE VERDAD DE LOS DATOS DE CONTACTO
 * ------------------------------------------------------------------------
 * Requisito explícito del brief (sección 5): teléfono, correo, dirección y
 * redes viven acá y en ningún otro lugar. Ningún componente escribe estos
 * valores en línea. Cambian con el tiempo y no deben quedar repartidos.
 *
 * El WhatsApp +56 9 8199 2658 que usaban las versiones anteriores del sitio
 * quedó OBSOLETO. El número vigente es el de abajo.
 */

export const site = {
  nombre: "AGS Soluciones",
  nombreLargo: "AGS Soluciones Industriales Aéreas",
  url: "https://agssoluciones.cl",
  fundacion: 2016,

  contacto: {
    email: "servicios@agssoluciones.cl",
    telefono: "+56 9 7947 4352",
    /** E.164 sin signos, para `tel:` y para la API de WhatsApp. */
    telefonoE164: "+56979474352",
    whatsapp: "56979474352",
    direccion: {
      calle: "Avenida José Miguel Carrera 1587",
      detalle: "Oficina 406",
      ciudad: "Antofagasta",
      region: "II Región",
      regionLarga: "Región de Antofagasta",
      pais: "CL",
      /** Versión abreviada para la barra superior, donde el ancho es escaso. */
      corta: "Av. J. M. Carrera 1587, of. 406, Antofagasta",
      completa: "Avenida José Miguel Carrera 1587, oficina 406, Antofagasta, II Región",
    },
  },

  redes: {
    instagram: "https://www.instagram.com/agssoluciones.cl",
    linkedin: "https://www.linkedin.com/company/agssoluciones/",
  },

  legal: {
    aviso: "Todos los derechos reservados",
  },

  /** Territorio de operación, verificado en el texto de "Quiénes somos". */
  operacion: ["Chile", "Perú", "Argentina"],
} as const;

/** Une una lista en español: "Chile, Perú y Argentina". */
export function enumerar(items: readonly string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  return `${items.slice(0, -1).join(", ")} y ${items[items.length - 1]}`;
}

/**
 * Enlace de WhatsApp con mensaje precargado (F-13). Se construye desde el
 * número central: si el número cambia, el botón flotante lo sigue solo.
 */
export const whatsappHref = `https://wa.me/${site.contacto.whatsapp}?text=${encodeURIComponent(
  "Hola, quiero cotizar un servicio con drones",
)}`;

export const telHref = `tel:${site.contacto.telefonoE164}`;
export const mailHref = `mailto:${site.contacto.email}`;
