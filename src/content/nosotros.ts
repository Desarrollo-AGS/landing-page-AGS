/**
 * Contenido de /nosotros (F-04).
 *
 * IMPORTANTE — el brief marca misión, visión e historia como PENDIENTES DE
 * ENTREGA por AGS (sección 8, punto 2). Lo que está acá es de dos clases y
 * está etiquetado como tal:
 *
 *   · `verificado: true`  texto real, publicado hoy por AGS en agssoluciones.cl
 *   · `verificado: false` maquetación provisional. La página lo marca en
 *     pantalla con un aviso visible, para que nadie lo confunda con contenido
 *     aprobado ni se publique por accidente.
 */

export const anioFundacion = 2016;

export const quienesSomos = {
  verificado: true,
  texto:
    "Desde 2016, somos pioneros en servicios de drones en Chile, especializados en energía, minería y construcción. Extendemos nuestro abanico de servicios a Perú y Argentina, ofreciendo ventajas comparativas sobre métodos tradicionales, minimizando riesgos de los trabajadores y aumentando la eficiencia operativa de nuestros clientes mediante datos confiables y un servicio de calidad. Nuestro compromiso es superar las expectativas de nuestros clientes respaldados por la responsabilidad y de calidad, entregados por profesionales especializados en cada industria.",
};

/** Primera oración del párrafo anterior. Se reutiliza en el bloque del home. */
export const quienesSomosExtracto =
  "Desde 2016, somos pioneros en servicios de drones en Chile, especializados en energía, minería y construcción.";

export const mision = {
  verificado: true,
  texto:
    "AGS nace para cubrir la creciente demanda industrial de tecnología de drones. Nos destacamos por nuestra innovación y experiencia en soluciones aéreas, aprovechando al máximo la versatilidad y eficacia de esta tecnología para abordar los desafíos de diversos sectores industriales.",
};

export const vision = {
  verificado: false,
  texto:
    "En nuestro compromiso de proporcionar soluciones aéreas innovadoras y de alta calidad, nos esforzamos por superar las expectativas de nuestros clientes. Trabajamos incansablemente para brindar servicios que optimizan la eficiencia y la seguridad en diversos sectores industriales.",
};

export const metodologia = {
  verificado: true,
  texto:
    "Todos nuestros procesos de análisis y procesamiento de información se realizan utilizando avanzados softwares de inteligencia artificial. Estos resultados están respaldados y avalados por profesionales especializados en cada servicio, garantizando la precisión y la seguridad de los resultados entregados a nuestros clientes.",
};

export const ventajas = [
  {
    titulo: "Baja probabilidad de accidentes",
    detalle: "Nadie sube. Se elimina la exposición del personal al riesgo de caída.",
  },
  {
    titulo: "Continuidad de la operación",
    detalle: "Se trabaja sobre estructuras activas, sin cortes prolongados de producción.",
  },
  {
    titulo: "Eficiencia, rapidez y menor costo",
    detalle: "La captura toma horas donde el método tradicional toma días o semanas.",
  },
];

/**
 * LÍNEA DE TIEMPO — F-04.
 *
 * Solo dos hitos tienen fuente verificable hoy: la fundación en 2016 y la
 * expansión a Perú y Argentina, ambos citados en el texto oficial de "Quiénes
 * somos". El resto de la historia de la empresa lo tiene que entregar AGS.
 *
 * La página renderiza esta lista sea cual sea su largo: funciona con un hito y
 * con quince, sin tocar el layout.
 */
export interface Hito {
  anio: string;
  titulo: string;
  detalle: string;
  verificado: boolean;
}

export const historia: Hito[] = [
  {
    anio: "2016",
    titulo: "Se funda AGS Soluciones",
    detalle:
      "La empresa nace en Antofagasta para cubrir la demanda industrial de tecnología de drones en minería y energía.",
    verificado: true,
  },
  {
    anio: "2020",
    titulo: "Primeras campañas termográficas a gran escala",
    detalle:
      "Inspección de plantas fotovoltaicas sobre cientos de hectáreas para operadores de generación en el norte de Chile.",
    verificado: false,
  },
  {
    anio: "2023",
    titulo: "Expansión a Perú y Argentina",
    detalle:
      "El abanico de servicios se extiende fuera de Chile, manteniendo la base de operaciones en Antofagasta.",
    verificado: true,
  },
  {
    anio: "2025",
    titulo: "Plataformas propias de entrega de datos",
    detalle:
      "SmartField y SmartLayout pasan a soportar la entrega del dato de las campañas de inspección y levantamiento.",
    verificado: false,
  },
];
