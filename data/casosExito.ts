export interface CasoExito {
  /** Slug idéntico al del sitio actual (agssoluciones.cl/casos-exito/[slug]/) — no cambiar, ver spec 0.1 y ticket 4.3. */
  slug: string;
  cliente: string;
  ubicacion: string;
  cifraDestacada: string;
  servicio: string;
  /** Slug del servicio relacionado en servicios.ts, para enlazar internamente. */
  servicioSlug: string;
  texto: string;
  imagen: string;
  /** true mientras no exista una foto real del proyecto — ver blocker "Fotos reales por caso de éxito" (Sprint 4). */
  imagenPendiente: boolean;
  /** true = aparece en el preview de Home (ticket 4.2) — ver criterio de selección junto a cada caso marcado. */
  destacado?: boolean;
}

/**
 * Contenido extraído de https://agssoluciones.cl/casos-exito/ (fetch en vivo, Sprint 0).
 * Las slugs se mantienen exactas para no perder posicionamiento/backlinks existentes.
 *
 * Los últimos 9 casos (enel-pfv-lalackama en adelante) se agregaron en el ticket 6.4:
 * no aparecían en la página de listado /casos-exito/ (de donde salió la lista original
 * de 10), pero SÍ están en el sitemap XML real del sitio (sitemap-posttype-casos-exito)
 * y responden 200 en vivo — son URLs reales e indexadas que habrían quedado huérfanas
 * (404) en el sitio nuevo si no se agregaban. Contenido extraído en vivo de cada URL.
 */
export const casosExito: CasoExito[] = [
  {
    slug: "enel-pfv-la-silla",
    cliente: "Enel Green Power",
    ubicacion: "La Higuera, Región de Coquimbo",
    cifraDestacada: "1,7 mW / 4 Ha",
    servicio: "Termografía en planta fotovoltaica",
    servicioSlug: "inspecciones-fotovoltaicas",
    texto: "Esta instalación cuenta con 3 tipos de módulos fotovoltaicos.",
    imagen: "/images/caso-enel-pfv-la-silla.webp",
    imagenPendiente: false,
  },
  {
    slug: "acciona-pfv-almeyda",
    cliente: "Acciona (AeroProtechnik)",
    ubicacion: "Diego de Almagro, Región de Atacama",
    cifraDestacada: "62 mW / 150 Ha",
    servicio: "Termografía en planta fotovoltaica",
    servicioSlug: "inspecciones-fotovoltaicas",
    texto:
      "187.620 módulos instalados, en colaboración con AGS Soluciones durante el cuarto año consecutivo.",
    imagen: "/images/servicio-fallback-generico.webp",
    imagenPendiente: true,
  },
  {
    slug: "acciona-pfv-el-romero",
    cliente: "Acciona (AeroProtechnik)",
    ubicacion: "Desierto de Atacama",
    cifraDestacada: "246 mW / 262 Ha",
    servicio: "Termografía en planta fotovoltaica",
    servicioSlug: "inspecciones-fotovoltaicas",
    texto: "La planta fotovoltaica más grande de América Latina, que abastece a 240.000 hogares.",
    imagen: "/images/servicio-fallback-generico.webp",
    imagenPendiente: true,
    // Mayor capacidad (mW) del set + claim real "planta más grande de América Latina".
    destacado: true,
  },
  {
    slug: "acciona-pfv-malgarida",
    cliente: "Acciona (AeroProtechnik)",
    ubicacion: "Diego de Almagro, Región de Atacama",
    cifraDestacada: "238 mW / 535 Ha",
    servicio: "Termografía en planta fotovoltaica",
    servicioSlug: "inspecciones-fotovoltaicas",
    texto: "Abastece a 280.000 hogares y reduce 512.000 toneladas de CO2 anualmente.",
    imagen: "/images/servicio-fallback-generico.webp",
    imagenPendiente: true,
  },
  {
    slug: "acciona-pfv-usya",
    cliente: "Acciona (AeroProtechnik)",
    ubicacion: "Calama, Región de Antofagasta",
    cifraDestacada: "64 mW / 105 Ha",
    servicio: "Termografía en planta fotovoltaica",
    servicioSlug: "inspecciones-fotovoltaicas",
    texto: "La tercera planta fotovoltaica más grande de Acciona, con 187.200 módulos instalados.",
    imagen: "/images/servicio-fallback-generico.webp",
    imagenPendiente: true,
  },
  {
    slug: "antofagasta-minerals-topografia",
    cliente: "Antofagasta Minerals",
    ubicacion: "Antofagasta",
    cifraDestacada: "520 Ha",
    servicio: "Levantamiento aerofotogramétrico",
    servicioSlug: "topografia-aerofotogrametria",
    texto: 'Proyecto de exploración "Polo Sur", con mapeo de 520 hectáreas.',
    imagen: "/images/servicio-fallback-generico.webp",
    imagenPendiente: true,
    // Mayor cifra individual de todo el set (520 Ha) + cliente reconocido — citado como ejemplo en el propio ticket 4.2.
    destacado: true,
  },
  {
    slug: "colbun-pfv-diego-de-almagro",
    cliente: "Colbún",
    ubicacion: "Diego de Almagro, Región de Atacama",
    cifraDestacada: "230 mW / 330 Ha",
    servicio: "Inspección termográfica en planta fotovoltaica",
    servicioSlug: "inspecciones-fotovoltaicas",
    texto: "Segundo año consecutivo de colaboración en este parque solar.",
    imagen: "/images/servicio-fallback-generico.webp",
    imagenPendiente: true,
    // Segunda mayor capacidad (mW) del set + diversifica cliente (Colbún) frente a Acciona/Enel.
    destacado: true,
  },
  {
    slug: "colbun-pfv-machicura",
    cliente: "Colbún",
    ubicacion: "Colbún, Región del Maule",
    cifraDestacada: "9 mW / 14 Ha",
    servicio: "Termografía en planta fotovoltaica",
    servicioSlug: "inspecciones-fotovoltaicas",
    texto: "Planta ubicada a 6 kilómetros de la localidad de Colbún.",
    imagen: "/images/servicio-fallback-generico.webp",
    imagenPendiente: true,
  },
  {
    slug: "colbun-pfv-ovejeria",
    cliente: "Colbún",
    ubicacion: "Tiltil, Región Metropolitana",
    cifraDestacada: "9,9 mW / 18 Ha",
    servicio: "Inspección termográfica en planta fotovoltaica",
    servicioSlug: "inspecciones-fotovoltaicas",
    texto: "Ubicada a 15 kilómetros al este de Tiltil.",
    imagen: "/images/servicio-fallback-generico.webp",
    imagenPendiente: true,
  },
  {
    slug: "enel-pfv-finis-terrae",
    cliente: "Enel",
    ubicacion: "María Elena, Región de Antofagasta",
    cifraDestacada: "160 mW / 360 Ha",
    servicio: "Termografía en planta fotovoltaica",
    servicioSlug: "inspecciones-fotovoltaicas",
    texto: "Genera más de 400 GWh al año.",
    imagen: "/images/servicio-fallback-generico.webp",
    imagenPendiente: true,
    // Cliente global reconocido (Enel) + buena capacidad (160 mW) — diversifica el preview frente a Acciona/Colbún.
    destacado: true,
  },
  {
    slug: "enel-pfv-lalackama",
    cliente: "Enel",
    ubicacion: "Taltal, Región de Antofagasta",
    cifraDestacada: "78 mW / 216 Ha",
    servicio: "Termografía en planta fotovoltaica",
    servicioSlug: "inspecciones-fotovoltaicas",
    texto:
      "Genera 160 GWh al año, energía para aproximadamente 90.000 viviendas, evitando la emisión de 100.000 toneladas de CO2 anuales.",
    imagen: "/images/servicio-fallback-generico.webp",
    imagenPendiente: true,
  },
  {
    slug: "enel-pfv-pampa-norte",
    cliente: "Enel",
    ubicacion: "Taltal, Región de Antofagasta",
    cifraDestacada: "80 mW / 175 Ha",
    servicio: "Inspección termográfica en planta fotovoltaica",
    servicioSlug: "inspecciones-fotovoltaicas",
    texto:
      "258 mil paneles capaces de abastecer aproximadamente 100.000 viviendas, evitando 100 mil toneladas de CO2 al año.",
    imagen: "/images/servicio-fallback-generico.webp",
    imagenPendiente: true,
  },
  {
    slug: "megatraction-modelado-3d",
    cliente: "Megatraction",
    ubicacion: "Minera Radomiro Tomic, Calama, Región de Antofagasta",
    cifraDestacada: "Rotopala más grande de Sudamérica",
    servicio: "Modelamiento 3D",
    servicioSlug: "topografia-aerofotogrametria",
    texto:
      "Modelamiento tridimensional de la rotopala de mayor tamaño de Sudamérica, en el yacimiento a rajo abierto de Radomiro Tomic, a 3.000 metros sobre el nivel del mar.",
    imagen: "/images/servicio-fallback-generico.webp",
    imagenPendiente: true,
  },
  {
    slug: "norte-aridos-cubicacion-de-stock",
    cliente: "Grupo Norte Áridos",
    ubicacion: "Antofagasta",
    cifraDestacada: "100 Ha",
    servicio: "Topografía — cubicación de stock",
    servicioSlug: "topografia-aerofotogrametria",
    texto:
      "Levantamiento topográfico y cuantificación de inventarios para este operador minero ubicado a 40 km al sureste de Antofagasta, dedicado a la extracción y distribución de materiales pétreos.",
    imagen: "/images/servicio-fallback-generico.webp",
    imagenPendiente: true,
  },
  {
    slug: "minera-valle-central-ll-ee",
    cliente: "Minera Valle Central (MVC)",
    ubicacion: "Requínoa, Región de O'Higgins",
    cifraDestacada: "12 torres / 3,4 km",
    servicio: "Inspección de líneas eléctricas",
    servicioSlug: "inspeccion-lineas-electricas",
    texto:
      "Inspección de líneas eléctricas (154 kV) en una operación que procesa 135.000 toneladas diarias de relaves frescos y 30.000 toneladas diarias de relaves antiguos del embalse Colihues.",
    imagen: "/images/servicio-fallback-generico.webp",
    imagenPendiente: true,
  },
  {
    slug: "minera-guanaco-topografia",
    cliente: "Minera Guanaco",
    ubicacion: "Taltal, Región de Antofagasta",
    cifraDestacada: "1.800 Ha",
    servicio: "Levantamiento aerofotogramétrico",
    servicioSlug: "topografia-aerofotogrametria",
    texto:
      "Levantamiento topográfico mediante aerofotogrametría para este operador minero de oro y plata, ubicado a 220 km al sureste de Antofagasta.",
    imagen: "/images/servicio-fallback-generico.webp",
    imagenPendiente: true,
  },
  {
    slug: "minera-guanaco-modelamiento-3d",
    cliente: "Guanaco Compañía Minera (GCM)",
    ubicacion: "Taltal, Región de Antofagasta",
    cifraDestacada: "205 Ha",
    servicio: "Modelamiento 3D",
    servicioSlug: "topografia-aerofotogrametria",
    texto:
      "Modelo tridimensional del perímetro de protección industrial, para evaluar la vulnerabilidad de accesos y discontinuidades en el cierre perimetral.",
    imagen: "/images/servicio-fallback-generico.webp",
    imagenPendiente: true,
  },
  {
    slug: "minera-guanaco-ll-ee",
    cliente: "Guanaco Compañía Minera (GCM)",
    ubicacion: "Taltal, Región de Antofagasta",
    cifraDestacada: "301 torres / 34 km²",
    servicio: "Inspección de líneas eléctricas",
    servicioSlug: "inspeccion-lineas-electricas",
    texto:
      "Evaluación de infraestructuras eléctricas en 301 torres (33 kV), orientada a garantizar el desempeño óptimo y la seguridad de las instalaciones.",
    imagen: "/images/servicio-fallback-generico.webp",
    imagenPendiente: true,
  },
  {
    slug: "sqm-topografia-x6-sectores",
    cliente: "SQM",
    ubicacion: "María Elena, Región de Antofagasta",
    cifraDestacada: "+400 Ha",
    servicio: "Levantamiento aerofotogramétrico",
    servicioSlug: "topografia-aerofotogrametria",
    texto:
      "Topografía de 6 sectores para SQM, ubicada a 205 km de Antofagasta, líder global en producción de Nitrato de Potasio (KNO3).",
    imagen: "/images/servicio-fallback-generico.webp",
    imagenPendiente: true,
  },
];

export function getCasoExitoBySlug(slug: string): CasoExito | undefined {
  return casosExito.find((caso) => caso.slug === slug);
}

/**
 * Casos destacados para el preview de Home (ticket 4.2): prioriza mayor cifra
 * (mW/Ha) y diversidad de clientes reconocidos, ver comentario `destacado` junto a
 * cada caso elegido. Antofagasta Minerals se cita explícitamente como ejemplo en el
 * propio ticket.
 */
export function getCasosExitoDestacados(limit = 4): CasoExito[] {
  return casosExito.filter((caso) => caso.destacado).slice(0, limit);
}
