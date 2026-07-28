export interface FaqItem {
  id: string;
  pregunta: string;
  respuesta: string;
  /** true = contenido aún no confirmado por el cliente; no publicar la respuesta con datos inventados (ver ticket 5.1). */
  pendingContent?: boolean;
}

export const faq: FaqItem[] = [
  {
    id: "precio",
    pregunta: "¿Cuánto cuesta un servicio de drones?",
    respuesta:
      "El valor depende del tipo de servicio, la superficie o instalación a cubrir y la ubicación del proyecto. Cada cotización se elabora a medida según el alcance real del trabajo — completa el formulario de cotización o escríbenos a servicios@agssoluciones.cl para recibir una propuesta.",
  },
  {
    id: "precision",
    pregunta: "¿Qué tan precisos son los datos que entrega un dron?",
    respuesta:
      "Nuestros levantamientos topográficos y aerofotogramétricos alcanzan precisión centimétrica, superando a los métodos tradicionales. En inspecciones fotovoltaicas, procesamos las imágenes térmicas para identificar, clasificar y priorizar el 100% de las anomalías detectadas.",
  },
  {
    id: "plazos",
    pregunta: "¿Cuánto se demora un proyecto con drones?",
    respuesta:
      "La captura de datos en terreno toma horas en lugar de los días o semanas que requieren los métodos tradicionales. El plazo total de entrega varía según el tamaño del proyecto y el nivel de procesamiento del informe, y se define en la etapa de cotización.",
  },
  {
    id: "faenas-activas",
    pregunta: "¿Pueden trabajar en faenas mineras o industriales activas?",
    respuesta:
      "Sí. Nuestros servicios están diseñados para operar en faenas activas, incluyendo espacios confinados y estructuras elevadas, minimizando la exposición de personal a zonas de riesgo durante la inspección o el levantamiento de datos.",
  },
  {
    id: "certificaciones-dgac",
    pregunta: "¿Cuentan con certificaciones DGAC y seguros para operar?",
    respuesta:
      "Contenido pendiente de confirmación por parte del cliente (certificaciones DGAC y cobertura de seguros). No publicar en producción hasta recibir la información real — ver blocker en Sprint 5 del spec.",
    pendingContent: true,
  },
];

export function getFaqPublicable(includePending = process.env.NODE_ENV !== "production"): FaqItem[] {
  return includePending ? faq : faq.filter((item) => !item.pendingContent);
}
