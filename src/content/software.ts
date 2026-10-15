/**
 * SOFTWARE — F-07.
 *
 * Framing obligatorio del brief: AGS no vende software suelto. Vende el
 * servicio con drones y la plataforma que lo acompaña, desde la captura hasta
 * la entrega del dato. Ninguna ficha habla de planes, licencias ni precios: la
 * plataforma es el soporte del servicio, no un SaaS aparte.
 *
 * Se publican tres productos. La estructura admite más sin rehacer el layout:
 * basta agregar un objeto a este arreglo, y con eso aparece en el índice de
 * software, en su propia ficha `/software/<slug>`, en el menú, en el footer y
 * en el sitemap.
 */

/**
 * Las tres vistas de una plataforma: la de escritorio donde se trabaja, la del
 * teléfono con que se consulta en terreno, y el QR que lleva de una a la otra.
 *
 * Es opcional. Solo las plataformas que tengan las tres entregadas abren su
 * ficha con la composición de dispositivos; el resto abre con su captura
 * única, que es lo que había antes y sigue sirviendo.
 */
export interface Dispositivos {
  escritorio: string;
  movil: string;
  qr: string;
}

export interface Producto {
  slug: string;
  nombre: string;
  /** Una línea de qué resuelve. Requisito literal del brief. */
  resuelve: string;
  descripcion: string;
  sitio: string;
  /**
   * Captura principal. Es la que sale en el carrusel del inicio y la que
   * encabeza la ficha. Si vuelve a `null`, cae al marco de reserva con la
   * proporción final (ver `ui/MarcoCaptura`), nunca a una imagen falsa ni a
   * una maqueta dibujada.
   */
  captura: string | null;
  capturaAlt: string;
  /** Si está, la ficha abre con la composición en vez de la captura suelta. */
  dispositivos?: Dispositivos;
}

export const productos: Producto[] = [
  {
    slug: "smartfield",
    nombre: "SmartField",
    resuelve:
      "Centraliza el dato de terreno capturado en cada campaña y lo deja ubicable sobre el activo real.",
    descripcion:
      "SmartField es la plataforma sobre la que AGS entrega el resultado de las campañas de inspección. Las anomalías detectadas en terreno quedan clasificadas, priorizadas y asignadas a su ubicación exacta dentro de la instalación, de modo que el equipo de mantenimiento del cliente trabaje sobre el hallazgo y no sobre un informe suelto.",
    sitio: "https://www.smart-field.cl",
    captura: "/images/imagen-Smartfield.png",
    capturaAlt:
      "Interfaz de SmartField: menú de Mapa, Hallazgos, Dashboard y Administración junto a una vista aérea del área de trabajo",
  },
  {
    slug: "smartlayout",
    nombre: "SmartLayout",
    resuelve:
      "Diseña, controla y publica los layouts operacionales de tu faena desde un solo lugar.",
    descripcion:
      "Los layouts se dibujan por capas directamente sobre ortofotos georreferenciadas de la operación. Cada cambio pasa por revisión y aprobación antes de publicarse, y queda registrado con su autor, revisor y motivo. La versión vigente se distribuye mediante código QR y se consulta desde el teléfono en terreno, incluso ubicando al usuario por GPS para mostrarle el layout del lugar donde está.",
    sitio: "https://www.smartlayout.cl",
    captura: "/images/smartlayout-editor.avif",
    dispositivos: {
      escritorio: "/images/smartlayout-escritorio.webp",
      movil: "/images/smartlayout-movil.webp",
      qr: "/images/smartlayout-qr.webp",
    },
    capturaAlt:
      "Editor de SmartLayout: panel de capas de segregación, tránsito, emergencias, maquinaria y riesgos sobre un layout operacional dibujado encima de una ortofoto de faena",
  },
  {
    slug: "smartlix",
    nombre: "SmartLix",
    resuelve:
      "Convierte cada vuelo sobre la pila de lixiviación en un estado de riego medible por módulo.",
    descripcion:
      "SmartLix toma el par de ortofotos de cada vuelo —RGB y térmica de la misma fecha— y las alinea sobre la grilla real de módulos de la pila. Cada celda queda clasificada por bandas de temperatura configurables, de modo que la operación lee el estado del riego sobre la pila completa y compara un vuelo con otro bajo la misma escala térmica.",
    sitio: "https://www.smartlix.cl",
    captura: "/images/imagen-smartlix.png",
    capturaAlt:
      "Interfaz de SmartLix: monitoreo térmico de una pila de lixiviación, con la grilla de módulos coloreada por temperatura y la escala en grados",
  },
];

export const getProducto = (slug: string) => productos.find((p) => p.slug === slug);
