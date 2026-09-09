/**
 * Casos de éxito. Los datos (cliente, planta, ubicación, MW, hectáreas) están
 * publicados por AGS en agssoluciones.cl/casos-exito/ y en la grilla ampliada
 * del sitio agssoluciones-test, de donde el brief pide portarla (F-10b).
 *
 * NO se inventa ninguna cifra. Un caso sin MW declarado deja `mw` en null y la
 * ficha muestra solo las hectáreas, en vez de rellenar con un número plausible.
 */

export interface Caso {
  slug: string;
  cliente: string;
  planta: string;
  ubicacion: string;
  /** Potencia instalada en MW. null cuando el proyecto no es de generación. */
  mw: number | null;
  /** Superficie intervenida en hectáreas. null cuando la cifra publicada es otra. */
  hectareas: number | null;
  /** Cifra alternativa cuando el proyecto no se mide en MW ni en Ha (torres, km). */
  cifraAlterna?: { valor: string; unidad: string };
  servicio: string;
  servicioSlug: string;
  nota: string;
  destacado?: boolean;
}

export const casos: Caso[] = [
  {
    slug: "acciona-pfv-el-romero",
    cliente: "Acciona",
    planta: "PFV El Romero",
    ubicacion: "Desierto de Atacama",
    mw: 246,
    hectareas: 262,
    servicio: "Termografía en planta fotovoltaica",
    servicioSlug: "inspecciones-fotovoltaicas",
    nota: "La planta fotovoltaica más grande de América Latina, que abastece a 240.000 hogares.",
    destacado: true,
  },
  {
    slug: "acciona-pfv-malgarida",
    cliente: "Acciona",
    planta: "PFV Malgarida",
    ubicacion: "Diego de Almagro, Región de Atacama",
    mw: 238,
    hectareas: 535,
    servicio: "Termografía en planta fotovoltaica",
    servicioSlug: "inspecciones-fotovoltaicas",
    nota: "Abastece a 280.000 hogares y reduce 512.000 toneladas de CO2 anualmente.",
    destacado: true,
  },
  {
    slug: "colbun-pfv-diego-de-almagro",
    cliente: "Colbún",
    planta: "PFV Diego de Almagro",
    ubicacion: "Diego de Almagro, Región de Atacama",
    mw: 230,
    hectareas: 330,
    servicio: "Inspección termográfica en planta fotovoltaica",
    servicioSlug: "inspecciones-fotovoltaicas",
    nota: "Segundo año consecutivo de colaboración en este parque solar.",
    destacado: true,
  },
  {
    slug: "enel-pfv-finis-terrae",
    cliente: "Enel",
    planta: "PFV Finis Terrae",
    ubicacion: "María Elena, Región de Antofagasta",
    mw: 160,
    hectareas: 360,
    servicio: "Termografía en planta fotovoltaica",
    servicioSlug: "inspecciones-fotovoltaicas",
    nota: "Genera más de 400 GWh al año.",
    destacado: true,
  },
  {
    slug: "enel-pfv-pampa-norte",
    cliente: "Enel",
    planta: "PFV Pampa Norte",
    ubicacion: "Taltal, Región de Antofagasta",
    mw: 80,
    hectareas: 175,
    servicio: "Inspección termográfica en planta fotovoltaica",
    servicioSlug: "inspecciones-fotovoltaicas",
    nota: "258 mil paneles capaces de abastecer aproximadamente 100.000 viviendas.",
  },
  {
    slug: "enel-pfv-lalackama",
    cliente: "Enel",
    planta: "PFV Lalackama",
    ubicacion: "Taltal, Región de Antofagasta",
    mw: 78,
    hectareas: 216,
    servicio: "Termografía en planta fotovoltaica",
    servicioSlug: "inspecciones-fotovoltaicas",
    nota: "Genera 160 GWh al año, energía para aproximadamente 90.000 viviendas.",
  },
  {
    slug: "acciona-pfv-usya",
    cliente: "Acciona",
    planta: "PFV Usya",
    ubicacion: "Calama, Región de Antofagasta",
    mw: 64,
    hectareas: 105,
    servicio: "Termografía en planta fotovoltaica",
    servicioSlug: "inspecciones-fotovoltaicas",
    nota: "La tercera planta fotovoltaica más grande de Acciona, con 187.200 módulos.",
  },
  {
    slug: "acciona-pfv-almeyda",
    cliente: "Acciona",
    planta: "PFV Almeyda",
    ubicacion: "Diego de Almagro, Región de Atacama",
    mw: 62,
    hectareas: 150,
    servicio: "Termografía en planta fotovoltaica",
    servicioSlug: "inspecciones-fotovoltaicas",
    nota: "187.620 módulos instalados, cuarto año consecutivo de colaboración.",
  },
  {
    slug: "colbun-pfv-ovejeria",
    cliente: "Colbún",
    planta: "PFV Ovejería",
    ubicacion: "Tiltil, Región Metropolitana",
    mw: 9.9,
    hectareas: 18,
    servicio: "Inspección termográfica en planta fotovoltaica",
    servicioSlug: "inspecciones-fotovoltaicas",
    nota: "Ubicada a 15 kilómetros al este de Tiltil.",
  },
  {
    slug: "colbun-pfv-machicura",
    cliente: "Colbún",
    planta: "PFV Machicura",
    ubicacion: "Colbún, Región del Maule",
    mw: 9,
    hectareas: 14,
    servicio: "Termografía en planta fotovoltaica",
    servicioSlug: "inspecciones-fotovoltaicas",
    nota: "Planta ubicada a 6 kilómetros de la localidad de Colbún.",
  },
  {
    slug: "enel-pfv-la-silla",
    cliente: "Enel Green Power",
    planta: "PFV La Silla",
    ubicacion: "La Higuera, Región de Coquimbo",
    mw: 1.7,
    hectareas: 4,
    servicio: "Termografía en planta fotovoltaica",
    servicioSlug: "inspecciones-fotovoltaicas",
    nota: "Esta instalación cuenta con 3 tipos de módulos fotovoltaicos.",
  },
  {
    slug: "minera-guanaco-topografia",
    cliente: "Minera Guanaco",
    planta: "Levantamiento aerofotogramétrico",
    ubicacion: "Taltal, Región de Antofagasta",
    mw: null,
    hectareas: 1800,
    servicio: "Topografía y aerofotogrametría",
    servicioSlug: "topografia-aerofotogrametria",
    nota: "Operador minero de oro y plata, a 220 km al sureste de Antofagasta.",
    destacado: true,
  },
  {
    slug: "antofagasta-minerals-topografia",
    cliente: "Antofagasta Minerals",
    planta: "Proyecto Polo Sur",
    ubicacion: "Antofagasta",
    mw: null,
    hectareas: 520,
    servicio: "Levantamiento aerofotogramétrico",
    servicioSlug: "topografia-aerofotogrametria",
    nota: "Proyecto de exploración con mapeo de 520 hectáreas.",
    destacado: true,
  },
  {
    slug: "sqm-topografia-x6-sectores",
    cliente: "SQM",
    planta: "Topografía de 6 sectores",
    ubicacion: "María Elena, Región de Antofagasta",
    mw: null,
    hectareas: 400,
    servicio: "Levantamiento aerofotogramétrico",
    servicioSlug: "topografia-aerofotogrametria",
    nota: "Líder global en producción de nitrato de potasio, a 205 km de Antofagasta.",
  },
  {
    slug: "minera-guanaco-modelamiento-3d",
    cliente: "Guanaco Compañía Minera",
    planta: "Perímetro de protección industrial",
    ubicacion: "Taltal, Región de Antofagasta",
    mw: null,
    hectareas: 205,
    servicio: "Modelamiento 3D",
    servicioSlug: "topografia-aerofotogrametria",
    nota: "Evaluación de vulnerabilidad de accesos y discontinuidades en el cierre perimetral.",
  },
  {
    slug: "norte-aridos-cubicacion-de-stock",
    cliente: "Grupo Norte Áridos",
    planta: "Cubicación de stock",
    ubicacion: "Antofagasta",
    mw: null,
    hectareas: 100,
    servicio: "Topografía y cubicación de stock",
    servicioSlug: "topografia-aerofotogrametria",
    nota: "Operador de materiales pétreos a 40 km al sureste de Antofagasta.",
  },
  {
    slug: "minera-guanaco-ll-ee",
    cliente: "Guanaco Compañía Minera",
    planta: "Líneas eléctricas 33 kV",
    ubicacion: "Taltal, Región de Antofagasta",
    mw: null,
    hectareas: null,
    cifraAlterna: { valor: "301", unidad: "torres inspeccionadas" },
    servicio: "Inspección de líneas eléctricas",
    servicioSlug: "inspeccion-lineas-electricas",
    nota: "Evaluación de infraestructura eléctrica sobre 34 km² de cobertura.",
    destacado: true,
  },
  {
    slug: "minera-valle-central-ll-ee",
    cliente: "Minera Valle Central",
    planta: "Líneas eléctricas 154 kV",
    ubicacion: "Requínoa, Región de O'Higgins",
    mw: null,
    hectareas: null,
    cifraAlterna: { valor: "3,4", unidad: "km de línea" },
    servicio: "Inspección de líneas eléctricas",
    servicioSlug: "inspeccion-lineas-electricas",
    nota: "Operación que procesa 135.000 toneladas diarias de relaves frescos.",
  },
  {
    slug: "megatraction-modelado-3d",
    cliente: "Megatraction",
    planta: "Rotopala Radomiro Tomic",
    ubicacion: "Calama, Región de Antofagasta",
    mw: null,
    hectareas: null,
    cifraAlterna: { valor: "3.000", unidad: "m sobre el nivel del mar" },
    servicio: "Modelamiento 3D",
    servicioSlug: "topografia-aerofotogrametria",
    nota: "Modelamiento de la rotopala de mayor tamaño de Sudamérica, en rajo abierto.",
  },
];

export const casosDestacados = casos.filter((c) => c.destacado);

/**
 * Totales de la cartera publicada. Se calculan sobre `casos`, no se escriben a
 * mano: si mañana se agrega un proyecto, la cifra del home se mueve sola y no
 * queda desincronizada con la grilla.
 */
export const totales = {
  proyectos: casos.length,
  mw: Math.round(casos.reduce((acc, c) => acc + (c.mw ?? 0), 0)),
  hectareas: casos.reduce((acc, c) => acc + (c.hectareas ?? 0), 0),
  clientes: new Set(casos.map((c) => c.cliente)).size,
};
