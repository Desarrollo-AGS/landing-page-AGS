/**
 * Los siete servicios de AGS. El copy sale de la versión base del sitio
 * (ags-soluciones-web), extraído en su momento de agssoluciones.cl. No se
 * reescribe: el brief es explícito en que los textos se conservan.
 *
 * Los slugs se mantienen idénticos a los del sitio en producción para no
 * romper enlaces ni posicionamiento existente.
 */

export type Industria = "Energía" | "Minería" | "Construcción" | "Industria" | "Multimedia";

export interface Servicio {
  slug: string;
  titulo: string;
  /** Título corto para navbar y footer, donde el largo no cabe. */
  tituloCorto: string;
  industrias: Industria[];
  resumen: string;
  descripcion: string;
  /** Lo que se entrega al cliente al cerrar el trabajo. */
  entregables: string[];
  imagen: string;
  imagenAlt: string;
  /**
   * true mientras la foto sea genérica y no una toma real del servicio.
   * Sirve para saber qué material hay que pedirle a AGS sin revisar el HTML.
   */
  imagenPendiente: boolean;
  /** Aparece en el submenú "Servicios destacados" del navbar. */
  destacado?: boolean;
}

export const servicios: Servicio[] = [
  {
    slug: "inspecciones-fotovoltaicas",
    titulo: "Inspecciones Fotovoltaicas",
    tituloCorto: "Inspecciones fotovoltaicas",
    industrias: ["Energía"],
    resumen: "Rápido. Preciso. Trabajable.",
    descripcion:
      "Somos líderes en inspecciones termográficas de plantas fotovoltaicas a nivel nacional. Procesamos imágenes térmicas identificando, clasificando y priorizando el 100% de las anomalías, asignadas a un gemelo digital. Ofrecemos entrega rápida de informes confiables, clasificación granular de anomalías, una plataforma digital geoespacial interactiva con ubicaciones exactas, y digitalización de inspecciones anteriores para contar con un histórico completo.",
    entregables: [
      "Clasificación y priorización del 100% de las anomalías detectadas",
      "Gemelo digital geoespacial con la ubicación exacta de cada hallazgo",
      "Histórico comparable entre campañas de inspección",
    ],
    imagen: "/images/dron-en-vuelo.webp",
    imagenAlt:
      "Dron industrial de AGS en vuelo sobre una instalación en la Región de Antofagasta",
    imagenPendiente: true,
    destacado: true,
  },
  {
    slug: "inspeccion-lineas-electricas",
    titulo: "Inspección de Líneas Eléctricas",
    tituloCorto: "Inspección de líneas eléctricas",
    industrias: ["Minería", "Industria"],
    resumen: "Anticipa los riesgos y garantiza la continuidad de la operación.",
    descripcion:
      "Garantizamos el rendimiento óptimo de las instalaciones eléctricas sin interrupciones. Ofrecemos inspección termográfica que detecta puntos calientes, inspección visual que identifica daños y corrosión, inspección láser LiDAR que mapea riesgos de vegetación e interferencia, inspección de hebras de conductor que detecta desgaste y daños, e informes detallados con recomendaciones específicas.",
    entregables: [
      "Termografía de puntos calientes por torre y por tramo",
      "Nube de puntos LiDAR con riesgos de vegetación e interferencia",
      "Informe con recomendaciones priorizadas por criticidad",
    ],
    imagen: "/images/dron-en-vuelo.webp",
    imagenAlt:
      "Dron industrial de AGS en vuelo sobre una instalación en la Región de Antofagasta",
    imagenPendiente: true,
    destacado: true,
  },
  {
    slug: "topografia-aerofotogrametria",
    titulo: "Topografía con Drones. Aerofotogrametría",
    tituloCorto: "Topografía y aerofotogrametría",
    industrias: ["Construcción", "Minería"],
    resumen: "Rápido. Preciso. Seguro.",
    descripcion:
      "Generamos modelos 3D y mapas topográficos precisos mediante cámaras de alta resolución. Ofrecemos precisión centimétrica que supera los métodos tradicionales, recopilación de datos en horas versus días o semanas, acceso a terrenos remotos o inaccesibles, y visualización 3D con análisis avanzados e interactivos para la planificación de proyectos.",
    entregables: [
      "Modelo 3D y ortomosaico georreferenciado del área levantada",
      "Curvas de nivel y cubicación de stock con precisión centimétrica",
      "Entrega en horas, no en días o semanas",
    ],
    imagen: "/images/dron-en-vuelo.webp",
    imagenAlt:
      "Dron industrial de AGS en vuelo sobre una instalación en la Región de Antofagasta",
    imagenPendiente: true,
    destacado: true,
  },
  {
    slug: "limpieza-fachadas-maquinarias",
    titulo: "Limpieza de Fachadas y Maquinarias con Drones",
    tituloCorto: "Limpieza de fachadas y maquinarias",
    industrias: ["Construcción", "Industria"],
    resumen: "Rápido. Preciso. Seguro.",
    descripcion:
      "Realizamos limpieza segura de fachadas eliminando la necesidad de andamios o personal colgado, utilizando tecnología avanzada para eliminar suciedad, polvo y contaminantes. Los beneficios incluyen mayor seguridad al minimizar riesgos, eficiencia operacional al reducir la inactividad, y soluciones para áreas inaccesibles con métodos tradicionales.",
    entregables: [
      "Operación sin andamios, sin personal suspendido y sin detener la planta",
      "Registro fotográfico antes y después de la intervención",
      "Alcance sobre superficies que la grúa y el andamio no cubren",
    ],
    imagen: "/images/faena-limpieza-fachada.webp",
    imagenAlt:
      "Dron de AGS aplicando agua a presión sobre la fachada metálica de una faena minera",
    imagenPendiente: false,
  },
  {
    slug: "inspeccion-instalaciones-industriales",
    titulo: "Inspección de Instalaciones Industriales",
    tituloCorto: "Inspección de instalaciones industriales",
    industrias: ["Industria", "Construcción"],
    resumen: "Rápido. Preciso. Seguro.",
    descripcion:
      "Realizamos inspecciones sin exponer a personal a situaciones peligrosas, con capacidad de vuelo en espacios confinados y estructuras elevadas. Capturamos imágenes y videos de alta resolución que detectan daños, desgarre y corrosión. Los beneficios incluyen precisión sin igual, eficiencia y rapidez que reducen el tiempo de inactividad, y acceso a áreas inaccesibles o peligrosas para métodos tradicionales.",
    entregables: [
      "Vuelo en espacios confinados y estructuras elevadas",
      "Registro de alta resolución de daños, desgarre y corrosión",
      "Reducción del tiempo de inactividad de la instalación",
    ],
    imagen: "/images/dron-fachada.webp",
    imagenAlt:
      "Dron de AGS operando junto a una planta industrial activa, con la línea de proceso en funcionamiento",
    imagenPendiente: false,
  },
  {
    slug: "control-riego-pilas-lixiviacion",
    titulo: "Control de Distribución de Riego en Pilas de Lixiviación",
    tituloCorto: "Control de riego en pilas de lixiviación",
    industrias: ["Minería"],
    resumen: "Datos precisos, rápidos y con seguridad a un menor costo.",
    descripcion:
      "Utilizamos drones con cámaras y sensores de alta resolución para capturar datos detallados de pilas de lixiviación. Generamos mapas que muestran la distribución de riego, informes personalizados con análisis de eficiencia, e integración con los sistemas de control existentes. Los beneficios incluyen la reducción del desperdicio de recursos, una mayor uniformidad del riego para maximizar la recuperación de metales, y ahorro de costos de agua y químicos.",
    entregables: [
      "Mapa de distribución de riego sobre la pila completa",
      "Análisis de eficiencia e integración con los sistemas de control existentes",
      "Ahorro de agua y químicos por corrección de zonas mal regadas",
    ],
    imagen: "/images/dron-en-vuelo.webp",
    imagenAlt:
      "Dron industrial de AGS en vuelo sobre una instalación en la Región de Antofagasta",
    imagenPendiente: true,
  },
  {
    slug: "produccion-audiovisual",
    titulo: "Producción Audiovisual",
    tituloCorto: "Producción audiovisual",
    industrias: ["Multimedia"],
    resumen:
      "Contenido audiovisual corporativo que captura la esencia del mensaje del cliente.",
    descripcion:
      "Especialización en creación de contenido audiovisual de impacto. Ofrecemos videos corporativos que reflejan la identidad empresarial para presentaciones, marketing y comunicación interna. Destacamos por experiencia profesional, creatividad innovadora y compromiso con la calidad. El servicio incluye captura de imágenes de precisión superior a los métodos tradicionales, recopilación rápida de datos en horas versus días o semanas, y acceso a áreas remotas o inaccesibles.",
    entregables: [
      "Video corporativo terminado para presentaciones y comunicación interna",
      "Tomas aéreas en zonas remotas o de acceso restringido",
      "Material en alta resolución listo para marketing",
    ],
    imagen: "/images/dron-en-vuelo.webp",
    imagenAlt:
      "Dron industrial de AGS en vuelo sobre una instalación en la Región de Antofagasta",
    imagenPendiente: true,
  },
];

export const getServicio = (slug: string) => servicios.find((s) => s.slug === slug);

/** Opciones del select "Operación requerida" del formulario (F-11). */
export const opcionesOperacion = [
  ...servicios.map((s) => ({ value: s.slug, label: s.tituloCorto })),
  { value: "otra", label: "Otra operación" },
];

export function serviciosRelacionados(slug: string, limite = 3): Servicio[] {
  const actual = getServicio(slug);
  if (!actual) return [];
  const otros = servicios.filter((s) => s.slug !== slug);
  const mismaIndustria = otros.filter((s) =>
    s.industrias.some((i) => actual.industrias.includes(i)),
  );
  const resto = otros.filter((s) => !mismaIndustria.includes(s));
  return [...mismaIndustria, ...resto].slice(0, limite);
}
