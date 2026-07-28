export type Industria =
  | "Energía"
  | "Minería"
  | "Construcción"
  | "Industria"
  | "Multimedia";

export interface Servicio {
  slug: string;
  titulo: string;
  industrias: Industria[];
  resumenCorto: string;
  descripcionCompleta: string;
  imagen: string;
  /** true mientras la foto sea el fallback genérico y no una foto real de terreno del servicio (ver spec 0.5). */
  imagenEsFallback: boolean;
}

/**
 * Contenido extraído de https://agssoluciones.cl/servicios/ (fetch en vivo, Sprint 0).
 * `imagen` apunta al fallback genérico para los 7 servicios: no hay fotos reales
 * por servicio disponibles en /assets todavía — seguimiento pendiente (ver sección
 * 0.5 del spec: reemplazar por fotos reales de terreno en cuanto el cliente las entregue).
 */
export const servicios: Servicio[] = [
  {
    slug: "produccion-audiovisual",
    titulo: "Producción Audiovisual",
    industrias: ["Multimedia"],
    resumenCorto:
      "Contenido audiovisual corporativo que captura la esencia del mensaje del cliente.",
    descripcionCompleta:
      "Especialización en creación de contenido audiovisual de impacto. Ofrecemos videos corporativos que reflejan la identidad empresarial para presentaciones, marketing y comunicación interna. Destacamos por experiencia profesional, creatividad innovadora y compromiso con la calidad. El servicio incluye captura de imágenes de precisión superior a los métodos tradicionales, recopilación rápida de datos en horas versus días o semanas, y acceso a áreas remotas o inaccesibles.",
    imagen: "/images/servicio-fallback-generico.webp",
    imagenEsFallback: true,
  },
  {
    slug: "control-riego-pilas-lixiviacion",
    titulo: "Control de Distribución de Riego en Pilas de Lixiviación",
    industrias: ["Minería"],
    resumenCorto:
      "Datos precisos, rápidos y con seguridad a un menor costo mediante soluciones con drones.",
    descripcionCompleta:
      "Utilizamos drones con cámaras y sensores de alta resolución para capturar datos detallados de pilas de lixiviación. Generamos mapas que muestran la distribución de riego, informes personalizados con análisis de eficiencia, e integración con los sistemas de control existentes. Los beneficios incluyen la reducción del desperdicio de recursos, una mayor uniformidad del riego para maximizar la recuperación de metales, y ahorro de costos de agua y químicos.",
    imagen: "/images/servicio-fallback-generico.webp",
    imagenEsFallback: true,
  },
  {
    slug: "inspeccion-lineas-electricas",
    titulo: "Inspección de Líneas Eléctricas",
    industrias: ["Minería", "Industria"],
    resumenCorto: "Anticipa los riesgos y garantiza la continuidad de la operación.",
    descripcionCompleta:
      "Garantizamos el rendimiento óptimo de las instalaciones eléctricas sin interrupciones. Ofrecemos inspección termográfica (detecta puntos calientes), inspección visual (identifica daños y corrosión), inspección láser Lidar (mapea riesgos de vegetación e interferencia), inspección de hebras de conductor (detecta desgaste y daños), e informes detallados con recomendaciones específicas.",
    imagen: "/images/servicio-fallback-generico.webp",
    imagenEsFallback: true,
  },
  {
    slug: "inspeccion-instalaciones-industriales",
    titulo: "Inspección de Instalaciones Industriales",
    industrias: ["Industria", "Construcción"],
    resumenCorto: "Rápido. Preciso. Seguro.",
    descripcionCompleta:
      "Realizamos inspecciones sin exponer a personal a situaciones peligrosas, con capacidad de vuelo en espacios confinados y estructuras elevadas. Capturamos imágenes y videos de alta resolución que detectan daños, desgarre y corrosión. Los beneficios incluyen precisión sin igual, eficiencia y rapidez que reducen el tiempo de inactividad, y acceso a áreas inaccesibles o peligrosas para métodos tradicionales.",
    imagen: "/images/servicio-fallback-generico.webp",
    imagenEsFallback: true,
  },
  {
    slug: "inspecciones-fotovoltaicas",
    titulo: "Inspecciones Fotovoltaicas",
    industrias: ["Energía"],
    resumenCorto: "Rápido. Preciso. Trabajable.",
    descripcionCompleta:
      "Somos líderes en inspecciones termográficas de plantas fotovoltaicas a nivel nacional. Procesamos imágenes térmicas identificando, clasificando y priorizando el 100% de las anomalías, asignadas a un gemelo digital. Ofrecemos entrega rápida de informes confiables, clasificación granular de anomalías, una plataforma digital geoespacial interactiva con ubicaciones exactas, y digitalización de inspecciones anteriores para contar con un histórico completo.",
    imagen: "/images/servicio-fallback-generico.webp",
    imagenEsFallback: true,
  },
  {
    slug: "topografia-aerofotogrametria",
    titulo: "Topografía con Drones. Aerofotogrametría",
    industrias: ["Construcción"],
    resumenCorto: "Rápido. Preciso. Seguro.",
    descripcionCompleta:
      "Generamos modelos 3D y mapas topográficos precisos mediante cámaras de alta resolución. Ofrecemos precisión centimétrica que supera los métodos tradicionales, recopilación de datos en horas versus días o semanas, acceso a terrenos remotos o inaccesibles, y visualización 3D con análisis avanzados e interactivos para la planificación de proyectos.",
    imagen: "/images/servicio-fallback-generico.webp",
    imagenEsFallback: true,
  },
  {
    slug: "limpieza-fachadas-maquinarias",
    titulo: "Limpieza de Fachadas y Maquinarias con Drones",
    industrias: ["Construcción"],
    resumenCorto: "Rápido. Preciso. Seguro.",
    descripcionCompleta:
      "Realizamos limpieza segura de fachadas eliminando la necesidad de andamios o personal colgado, utilizando tecnología avanzada para eliminar suciedad, polvo y contaminantes. Los beneficios incluyen mayor seguridad al minimizar riesgos, eficiencia operacional al reducir la inactividad, y soluciones para áreas inaccesibles con métodos tradicionales.",
    imagen: "/images/servicio-fallback-generico.webp",
    imagenEsFallback: true,
  },
];

export function getServicioBySlug(slug: string): Servicio | undefined {
  return servicios.find((servicio) => servicio.slug === slug);
}
