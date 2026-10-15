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

export const anioFundacion = 2015;

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
  verificado: true,
  texto:
    "Ser consolidados como la empresa líder y el socio tecnológico 'end-to-end' referente en Chile para la inspección, mantenimiento y analítica de datos en industrias, destacando por la innovación continua, la automatización de procesos y el impacto positivo en la seguridad operacional.",
};

export const metodologia = {
  verificado: true,
  texto:
    "Todos nuestros procesos de análisis y procesamiento de información se realizan con tecnología de drones de última generación y software especializado. Estos resultados están respaldados y avalados por profesionales especializados en cada servicio, garantizando la precisión y la seguridad de los resultados entregados a nuestros clientes.",
};

export const ventajas = [
  {
    titulo: "Trayectoria y experiencia",
    detalle:
      "Más de 9 años aportando soluciones tecnológicas a los sectores minero, energético e industrial.",
  },
  {
    titulo: "Innovación aplicada",
    detalle:
      "Combinamos tecnología aérea, inteligencia artificial y software propio para resolver desafíos reales.",
  },
  {
    titulo: "Compromiso con la excelencia",
    detalle:
      "Abordamos cada proyecto con rigurosidad técnica, atención al detalle y un enfoque orientado a resultados confiables.",
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
    anio: "2015",
    titulo: "Se funda AGS Soluciones",
    detalle:
      "AGS Soluciones Industriales Aéreas nace en Antofagasta, en el centro de la minería del norte de Chile, para llevar la tecnología de drones al terreno industrial.",
    verificado: true,
  },
  {
    anio: "2019",
    titulo: "Una nueva etapa: soluciones integrales",
    detalle:
      "La empresa da paso a una nueva etapa y se enfoca en ofrecer soluciones integrales para los sectores de energía y minería mediante el uso de tecnologías aéreas no tripuladas.",
    verificado: true,
  },
  {
    anio: "2025",
    titulo: "Premio Empresa Innovación",
    detalle:
      "AGS es premiada en la categoría Empresa Innovación del programa Proveedores & Futuro, impulsado por Escondida | BHP.",
    verificado: true,
  },
  {
    anio: "2026",
    titulo: "Seleccionados en Open Aster",
    detalle:
      "AGS queda entre las 25 empresas elegidas en la octava generación de Open Aster, de Escondida | BHP, de más de 600 postulaciones y seis países, para llevar sus soluciones a terreno.",
    verificado: true,
  },
];
