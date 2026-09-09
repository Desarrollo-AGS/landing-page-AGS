/**
 * SOFTWARE — F-07.
 *
 * Framing obligatorio del brief: AGS no vende software suelto. Vende el
 * servicio con drones y la plataforma que lo acompaña, desde la captura hasta
 * la entrega del dato. Ninguna ficha habla de planes, licencias ni precios: la
 * plataforma es el soporte del servicio, no un SaaS aparte.
 *
 * Solo se publican estos dos productos. La estructura admite un tercero sin
 * rehacer el layout: basta agregar un objeto a este arreglo.
 */

export interface Producto {
  slug: string;
  nombre: string;
  /** Una línea de qué resuelve. Requisito literal del brief. */
  resuelve: string;
  descripcion: string;
  /** Slugs de servicios.ts a los que se engancha la plataforma. */
  servicios: string[];
  sitio: string;
  /**
   * Captura del producto. PENDIENTE DE ENTREGA POR AGS (brief, sección 8,
   * punto 7). Mientras no llegue, la ficha muestra un marco de reserva con la
   * proporción final, no una imagen falsa ni una maqueta dibujada.
   */
  captura: string | null;
  capturaAlt: string;
}

export const productos: Producto[] = [
  {
    slug: "smartfield",
    nombre: "SmartField",
    resuelve:
      "Centraliza el dato de terreno capturado en cada campaña y lo deja ubicable sobre el activo real.",
    descripcion:
      "SmartField es la plataforma sobre la que AGS entrega el resultado de las campañas de inspección. Las anomalías detectadas en terreno quedan clasificadas, priorizadas y asignadas a su ubicación exacta dentro de la instalación, de modo que el equipo de mantenimiento del cliente trabaje sobre el hallazgo y no sobre un informe suelto.",
    servicios: ["inspecciones-fotovoltaicas", "inspeccion-lineas-electricas"],
    sitio: "https://www.smart-field.cl",
    captura: null,
    capturaAlt: "Interfaz de SmartField mostrando anomalías georreferenciadas sobre una planta",
  },
  {
    slug: "smartlayout",
    nombre: "SmartLayout",
    resuelve:
      "Convierte el levantamiento aéreo en un layout medible para planificar sobre el terreno real.",
    descripcion:
      "SmartLayout toma el modelo tridimensional y el ortomosaico generados en el levantamiento y los deja disponibles como base de planificación. Es la contraparte digital del servicio de topografía y aerofotogrametría: el mismo vuelo que produce la nube de puntos alimenta la vista sobre la que el cliente proyecta y mide.",
    servicios: ["topografia-aerofotogrametria", "control-riego-pilas-lixiviacion"],
    sitio: "https://www.smartlayout.cl",
    captura: null,
    capturaAlt: "Interfaz de SmartLayout con un layout medible sobre un levantamiento aéreo",
  },
];

export const getProducto = (slug: string) => productos.find((p) => p.slug === slug);
