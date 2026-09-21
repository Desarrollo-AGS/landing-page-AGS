/**
 * AGS — INDUSTRIAL AIR OPERATIONS · contenido de /nosotros/brochure.
 *
 * Es la versión web del brochure comercial ("Brochure AGS 26'"), contada como
 * una narrativa en ocho capítulos en vez de como un PDF.
 *
 * DE DÓNDE SALE CADA TEXTO
 * ------------------------
 * Nada de lo que hay acá es nuevo. Cada bloque cita su fuente:
 *
 *   · servicios.ts / nosotros.ts / software.ts   texto publicado hoy en el sitio
 *   · casos.ts                                   proyectos y cifras publicadas
 *   · Brochure AGS 26'                           plataformas y plazo de entrega
 *
 * Las cifras NO se escriben a mano: se derivan de `casos`. Si se agrega un
 * proyecto, el capítulo de resultados se mueve solo.
 *
 * LO QUE QUEDÓ FUERA A PROPÓSITO
 * ------------------------------
 * El brochure trae tres datos que contradicen o adelantan lo que el sitio
 * publica hoy, y por eso no se usan hasta que AGS los valide:
 *
 *   · "Fundada en 2015": el sitio dice 2016 (`anioFundacion`).
 *   · "Certificación AOC de la DGAC": /nosotros/certificaciones declara el
 *     listado en preparación. Publicarlo acá dejaría al sitio diciendo dos
 *     cosas distintas sobre lo mismo.
 *   · Smart Inspections: el sitio solo publica SmartField y SmartLayout.
 *   · El teléfono +56 9 8199 2658 está obsoleto (ver site.ts).
 */

import { type Caso, casos, casosDestacados, totales } from "./casos";
import { getProducto } from "./software";
import { site } from "./site";

/* ------------------------------------------------------------------ */
/* Capítulos                                                           */
/* ------------------------------------------------------------------ */

export interface Capitulo {
  id: string;
  numero: string;
  nombre: string;
}

export const capitulos: Capitulo[] = [
  { id: "capitulo-00", numero: "00", nombre: "Portada" },
  { id: "capitulo-01", numero: "01", nombre: "El desafío" },
  { id: "capitulo-02", numero: "02", nombre: "La operación" },
  { id: "capitulo-03", numero: "03", nombre: "Lo que hacemos" },
  { id: "capitulo-04", numero: "04", nombre: "Del vuelo al dato" },
  { id: "capitulo-05", numero: "05", nombre: "Casos reales" },
  { id: "capitulo-06", numero: "06", nombre: "Resultados" },
  { id: "capitulo-07", numero: "07", nombre: "Cierre" },
];

/* ------------------------------------------------------------------ */
/* 01 · El desafío                                                     */
/* Fuente: servicios.ts (andamio, acceso, días o semanas) y           */
/* nosotros.ts (`ventajas`).                                           */
/* ------------------------------------------------------------------ */

export const desafios = [
  {
    concepto: "Altura",
    detalle: "Estructuras donde hoy se trabaja con andamio, canasto o personal suspendido.",
  },
  {
    concepto: "Acceso",
    detalle: "Terrenos remotos, espacios confinados y superficies que la grúa no alcanza.",
  },
  {
    concepto: "Riesgo",
    detalle: "Cada subida expone al personal a caídas y a zonas de peligro.",
  },
  {
    concepto: "Tiempo",
    detalle: "Levantamientos que por métodos tradicionales toman días o semanas.",
  },
  {
    concepto: "Continuidad operacional",
    detalle: "La inspección no puede exigir cortes prolongados de producción.",
  },
];

/* ------------------------------------------------------------------ */
/* 02 · La operación                                                   */
/* Fuente: /software (cadena captura-proceso-entrega), `metodologia`   */
/* en nosotros.ts y el plazo del brochure.                             */
/* ------------------------------------------------------------------ */

export const pasos = [
  {
    verbo: "Capturar",
    detalle: "Imagen térmica, visual o nube de puntos sobre la instalación, en horas.",
  },
  {
    verbo: "Procesar",
    detalle: "El material se procesa con software de inteligencia artificial.",
  },
  {
    verbo: "Analizar",
    detalle: "Especialistas de cada servicio revisan y validan cada resultado.",
  },
  {
    verbo: "Decidir",
    detalle: "Hallazgos ubicados sobre el activo, disponibles en menos de 24 horas hábiles.",
  },
];

/* ------------------------------------------------------------------ */
/* 03 · Lo que hacemos                                                 */
/* ------------------------------------------------------------------ */

/** Plantas fotovoltaicas: los únicos casos con potencia declarada. */
const casosEnergia = casos.filter((c) => c.mw !== null);
/** Levantamientos con superficie declarada. */
const casosTopografia = casos.filter(
  (c) => c.servicioSlug === "topografia-aerofotogrametria" && c.hectareas !== null,
);

/**
 * Qué acompaña a cada capacidad.
 *
 * Solo hay fotografía real de algunas operaciones. Donde no la hay, NO se pone
 * una foto de otra faena con un título que no le corresponde: se muestra la
 * cifra real de esa línea de trabajo. El pie de cada imagen describe lo que se
 * ve, no el servicio.
 */
export type MediaCapacidad =
  | { tipo: "imagen"; src: string; alt: string; pie: string }
  | { tipo: "video"; poster: string; webm: string; mp4: string; alt: string; pie: string }
  | { tipo: "cifra"; valor: number; unidad: string; pie: string };

export interface Capacidad {
  numero: string;
  nombre: string;
  detalle: string;
  /** Slugs de servicios.ts o de software.ts, para enlazar a la ficha. */
  enlaces: { label: string; href: string }[];
  media: MediaCapacidad;
}

export const capacidades: Capacidad[] = [
  {
    numero: "01",
    nombre: "Energía",
    detalle:
      "Inspección termográfica y visual de plantas fotovoltaicas. El 100% de las anomalías, clasificadas y priorizadas.",
    enlaces: [{ label: "Inspecciones fotovoltaicas", href: "/servicios/inspecciones-fotovoltaicas" }],
    media: {
      tipo: "cifra",
      valor: Math.round(casosEnergia.reduce((a, c) => a + (c.mw ?? 0), 0)),
      unidad: "MW",
      pie: `Inspeccionados en ${casosEnergia.length} plantas fotovoltaicas.`,
    },
  },
  {
    numero: "02",
    nombre: "Minería",
    detalle:
      "Control de riego en pilas de lixiviación y limpieza de estructuras en faena activa, sin detener la planta.",
    enlaces: [
      { label: "Control de riego", href: "/servicios/control-riego-pilas-lixiviacion" },
      { label: "Limpieza de fachadas", href: "/servicios/limpieza-fachadas-maquinarias" },
    ],
    media: {
      tipo: "video",
      poster: "/images/faena-limpieza-fachada.webp",
      webm: "/videos/faena-limpieza-fachada.webm",
      mp4: "/videos/faena-limpieza-fachada.mp4",
      alt: "Dron de AGS limpiando la fachada de una instalación minera en operación",
      pie: "Limpieza de fachada en faena minera activa.",
    },
  },
  {
    numero: "03",
    nombre: "Infraestructura",
    detalle:
      "Líneas eléctricas e instalaciones industriales: termografía, inspección visual y LiDAR, con la instalación funcionando.",
    enlaces: [
      { label: "Líneas eléctricas", href: "/servicios/inspeccion-lineas-electricas" },
      {
        label: "Instalaciones industriales",
        href: "/servicios/inspeccion-instalaciones-industriales",
      },
    ],
    media: {
      tipo: "imagen",
      src: "/images/dron-fachada.webp",
      alt: "Dron de AGS operando junto a una planta industrial activa, con la línea de proceso en funcionamiento",
      pie: "Operación junto a una planta industrial en funcionamiento.",
    },
  },
  {
    numero: "04",
    nombre: "Topografía",
    detalle:
      "Modelos 3D y mapas topográficos con precisión centimétrica. La captura toma horas, no días ni semanas.",
    enlaces: [
      { label: "Topografía y aerofotogrametría", href: "/servicios/topografia-aerofotogrametria" },
    ],
    media: {
      tipo: "cifra",
      valor: casosTopografia.reduce((a, c) => a + (c.hectareas ?? 0), 0),
      unidad: "ha",
      pie: `Levantadas en ${casosTopografia.length} proyectos de topografía y modelamiento 3D.`,
    },
  },
  {
    numero: "05",
    nombre: "Data",
    detalle:
      "Procesamiento con software de inteligencia artificial, respaldado por profesionales especializados en cada servicio.",
    enlaces: [],
    media: {
      tipo: "imagen",
      src: "/images/dron-en-vuelo.webp",
      alt: "Dron de AGS en vuelo aplicando agua a presión sobre el revestimiento de una nave industrial",
      pie: "Equipo de la flota de AGS en operación.",
    },
  },
  {
    numero: "06",
    nombre: "Plataformas",
    detalle:
      "SmartField y SmartLayout: el dato queda ubicado sobre el activo real, disponible para el equipo que tiene que actuar.",
    enlaces: [
      { label: "SmartField", href: "/software/smartfield" },
      { label: "SmartLayout", href: "/software/smartlayout" },
    ],
    media: {
      tipo: "imagen",
      src: "/images/caso-pfv-la-silla.webp",
      alt: "Vista aérea de una planta fotovoltaica levantada con dron en el desierto de Atacama",
      pie: "Levantamiento aéreo de una planta fotovoltaica.",
    },
  },
];

/* ------------------------------------------------------------------ */
/* 04 · Del vuelo al dato                                              */
/* Fuente: entregables de servicios.ts, `metodologia` y brochure.      */
/* ------------------------------------------------------------------ */

export const flujo = [
  { etapa: "Dron", detalle: "Vuelo sobre el activo, con la faena en operación." },
  { etapa: "Captura", detalle: "Termografía, imagen visual, LiDAR y fotogrametría." },
  { etapa: "Datos", detalle: "Ortomosaicos, nubes de puntos y modelos 3D georreferenciados." },
  { etapa: "Procesamiento", detalle: "Inteligencia artificial, validada por especialistas." },
  { etapa: "Plataforma", detalle: "SmartField y SmartLayout." },
  { etapa: "Decisión", detalle: "Hallazgos priorizados, en menos de 24 horas hábiles." },
];

/** Capas del dato, de abajo hacia arriba. Son entregables reales de servicios.ts. */
export const capasDato = ["Ortomosaico", "Nube de puntos", "Hallazgos priorizados"];

/**
 * Plataformas. El rol y las funcionalidades son las que declara el brochure
 * 2026, que es más preciso que la descripción provisional de software.ts. El
 * nombre y el sitio salen de software.ts, que sigue siendo la fuente única.
 */
export const plataformas = [
  {
    slug: "smartfield",
    rol: "Plataforma geoespacial",
    resumen: "Gestión integral de inspecciones y hallazgos sobre ortofotos georreferenciadas.",
    funcionalidades: [
      "Trazabilidad completa, evidencia fotográfica, niveles de criticidad, responsables y estado de cada hallazgo.",
      "Visualización de gemelos digitales con ubicación de hallazgos asistida por IA.",
      "Resultados disponibles en menos de 24 horas hábiles.",
    ],
  },
  {
    slug: "smartlayout",
    rol: "Layouts operacionales",
    resumen:
      "Plataforma web para crear, editar, versionar y publicar layouts operacionales sobre ortofotos.",
    funcionalidades: [
      "Capas configurables, señalética normalizada y activación mediante código QR.",
      "Historial de cambios, control de vigencia y publicación instantánea.",
      "Acceso remoto para equipos en faena y oficina central.",
    ],
  },
].map((p) => {
  const producto = getProducto(p.slug);
  if (!producto) throw new Error(`brochure: no existe el producto ${p.slug} en software.ts`);
  return { ...p, nombre: producto.nombre, sitio: producto.sitio };
});

/* ------------------------------------------------------------------ */
/* 05 · Casos reales                                                   */
/* ------------------------------------------------------------------ */

/** Los mismos destacados del home, en el mismo orden. */
export const casosNarrativa = casosDestacados;

/**
 * Industria de cada caso. Las plantas con potencia declarada son de energía.
 * Los destacados sin potencia son de operadores mineros (Minera Guanaco y
 * Antofagasta Minerals, según la nota publicada de cada proyecto). No se
 * deduce del servicio: topografía figura como "Construcción" en servicios.ts.
 */
const INDUSTRIA_POR_CASO: Record<string, string> = {
  "minera-guanaco-topografia": "Minería",
  "antofagasta-minerals-topografia": "Minería",
  "minera-guanaco-ll-ee": "Minería",
};

export function industriaDeCaso(caso: Caso): string {
  if (caso.mw !== null) return "Energía";
  return INDUSTRIA_POR_CASO[caso.slug] ?? caso.servicio;
}

/* ------------------------------------------------------------------ */
/* 06 · Resultados                                                     */
/* ------------------------------------------------------------------ */

const torres = casos.reduce((acc, c) => {
  const cifra = c.cifraAlterna;
  if (!cifra || !/torres/i.test(cifra.unidad)) return acc;
  return acc + Number(cifra.valor.replace(/\./g, "").replace(",", "."));
}, 0);

export interface Metrica {
  valor: number;
  etiqueta: string;
  detalle?: string;
}

export const metricas: Metrica[] = [
  { valor: totales.proyectos, etiqueta: "Proyectos ejecutados" },
  { valor: totales.mw, etiqueta: "MW inspeccionados", detalle: "En plantas fotovoltaicas" },
  { valor: totales.hectareas, etiqueta: "Hectáreas", detalle: "Inspeccionadas y levantadas" },
  { valor: torres, etiqueta: "Torres eléctricas", detalle: "Inspeccionadas" },
  {
    valor: site.operacion.length,
    etiqueta: "Países",
    detalle: site.operacion.join(", "),
  },
];
