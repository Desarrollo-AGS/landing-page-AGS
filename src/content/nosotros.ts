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
    "AGS Soluciones Industriales Aéreas es una empresa antofagastina especializada en servicios aéreos e inteligencia de datos con drones para industrias como la minera, energética y de construcción. Con más de 9 años de trayectoria en el norte de Chile, transformamos la inspección técnica y la captura de campo en soluciones 'end-to-end', maximizando la seguridad y la eficiencia operacional de nuestros clientes.",
};

/** Primera oración del párrafo anterior. Se reutiliza en el bloque del home. */
export const quienesSomosExtracto =
  "AGS Soluciones Industriales Aéreas es una empresa antofagastina especializada en servicios aéreos e inteligencia de datos con drones para industrias como la minera, energética y de construcción.";

export const mision = {
  verificado: true,
  texto:
    "Entregar soluciones aéreas e industriales integrales a través de tecnología de drones, desarrollo de software y utilizando inteligencia artificial, optimizando la continuidad operacional, reduciendo los riesgos de las personas y transformando datos de terreno en decisiones estratégicas de alto valor.",
};

export const vision = {
  verificado: false,
  texto:
    "Ser consolidados como la empresa líder y el socio tecnológico 'end-to-end' referente en Chile para la inspección, mantenimiento y analítica de datos en industrias, destacando por la innovación continua, la automatización de procesos y el impacto positivo en la seguridad operacional.",
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
