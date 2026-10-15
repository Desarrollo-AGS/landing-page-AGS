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
 * Una captura dentro de un marco de aparato.
 *
 * `aspecto` es la proporción real del archivo, en formato CSS ("1695/928"). El
 * marco la adopta tal cual, así que la captura lo llena sin dejar franjas de
 * fondo a los lados. Si se cambia la imagen, se cambia acá también: es el
 * único sitio donde esa medida está escrita.
 */
export interface Captura {
  src: string;
  aspecto: string;
}

/**
 * Las vistas de una plataforma: la de escritorio donde se trabaja, la del
 * teléfono con que se consulta en terreno, y el QR que lleva de una a la otra.
 *
 * Solo `escritorio` es obligatoria. Con las tres, la ficha arma la composición
 * superpuesta; con una sola, la muestra centrada y más grande. Una plataforma
 * sin `dispositivos` abre con su captura suelta, que es lo que había antes y
 * sigue sirviendo.
 */
export interface Dispositivos {
  escritorio: Captura;
  movil?: Captura;
  qr?: Captura;
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
      "Una plataforma geoespacial para la gestión inteligente de inspecciones y hallazgos en operaciones mineras.",
    descripcion:
      "Integra ortofotos de alta resolución, visualización territorial y seguimiento de observaciones en un entorno único. Cada hallazgo queda respaldado con su imagen, ubicación, fecha, criticidad y responsable, y avanza por geozonas hasta su cierre.",
    sitio: "https://www.smart-field.cl",
    captura: "/images/smartfield-escritorio.webp",
    dispositivos: {
      escritorio: { src: "/images/smartfield-escritorio.webp", aspecto: "1800/987" },
      movil: { src: "/images/smartfield-movil.webp", aspecto: "900/1951" },
    },
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
      escritorio: { src: "/images/smartlayout-escritorio.webp", aspecto: "1112/695" },
      movil: { src: "/images/smartlayout-movil.webp", aspecto: "430/932" },
      qr: { src: "/images/smartlayout-qr.webp", aspecto: "348/219" },
    },
    capturaAlt:
      "Editor de SmartLayout: panel de capas de segregación, tránsito, emergencias, maquinaria y riesgos sobre un layout operacional dibujado encima de una ortofoto de faena",
  },
  {
    slug: "smartlix",
    nombre: "SmartLix",
    resuelve:
      "Supervisa, analiza y optimiza el riego de pilas de lixiviación desde una sola plataforma.",
    descripcion:
      "SmartLix centraliza la visualización de zonas y módulos de riego, análisis térmico, ortofotos y modelos 3D para apoyar decisiones operacionales más rápidas y precisas en terreno.",
    sitio: "https://www.smartlix.cl",
    captura: "/images/smartlix-escritorio.webp",
    dispositivos: {
      escritorio: { src: "/images/smartlix-escritorio.webp", aspecto: "1695/928" },
    },
    capturaAlt:
      "Interfaz de SmartLix: monitoreo térmico de una pila de lixiviación, con la grilla de módulos coloreada por temperatura y la escala en grados",
  },
];

export const getProducto = (slug: string) => productos.find((p) => p.slug === slug);
