import type { Diccionario } from "./tipos";

/** Texto en español: es el que está publicado hoy, trasladado tal cual. */
export const es: Diccionario = {
  ui: {
    saltarContenido: "Saltar al contenido",
    irAlInicio: "AGS Soluciones, ir al inicio",
    inicio: "Inicio",
    abrirMenu: "Abrir menú",
    cerrarMenu: "Cerrar menú",
    menuPrincipal: "Principal",
    menuPrincipalMovil: "Principal, móvil",
    contactanos: "Contáctanos",
    avisoProvisional: "Texto provisional, pendiente de validación por AGS.",
    rutaNavegacion: "Ruta de navegación",
    conjuncion: " y ",
    paises: { Chile: "Chile", Perú: "Perú", Argentina: "Argentina" },
    instagram: "Instagram de AGS Soluciones, se abre en una pestaña nueva",
    linkedin: "LinkedIn de AGS Soluciones, se abre en una pestaña nueva",
    nuevaPestana: "se abre en una pestaña nueva",
    nav: {
      nosotros: "Nosotros",
      servicios: "Servicios",
      software: "Software",
      casos: "Proyectos",
      noticias: "Noticias",
      descNosotros: "Quiénes somos, cómo operamos y bajo qué marco.",
      descServicios: "Siete operaciones aéreas para energía, minería y construcción.",
      descSoftware: "Las plataformas sobre las que entregamos el dato del servicio.",
      verTodosServicios: "Ver todos los servicios",
      verPlataforma: "Ver la plataforma completa",
      quienesSomos: "Quiénes somos",
      misionVision: "Misión y visión",
      nuestraHistoria: "Nuestra historia",
      brochure: "Brochure",
      certificaciones: "Permisos y certificaciones",
      casosDeExito: "Proyectos",
    },
    footer: {
      intro:
        "Operaciones aéreas industriales para energía, minería y construcción. Tecnología e innovación al servicio de la seguridad y la eficiencia.",
      servicios: "Servicios",
      empresa: "Empresa",
      software: "Software",
      apoyadoPor: "Apoyado por",
      derechos: "Todos los derechos reservados",
    },
  },

  inicio: {
    portada: {
      antetitulo: "Operaciones aéreas industriales desde 2016",
      titulo: ["Convertimos la altura", "en un terreno seguro"],
      bajada:
        "Inspección termográfica, topografía y limpieza con drones para minería, energía y construcción. Sin andamios, sin detener la planta.",
      ctaPrimario: "Cotizar un servicio",
      ctaSecundario: "Ver servicios",
      altPoster: "Vista aérea de cerros del desierto que emergen sobre un mar de nubes",
      ariaVideo:
        "Video corporativo de AGS: vuelos sobre el desierto, faenas industriales, el equipo operando drones en terreno y sus plataformas de software",
      pausar: "Pausar el video de fondo",
      reproducir: "Reproducir el video de fondo",
    },
    clientes: { capitulo: "Confían en nosotros" },
    servicios: {
      capitulo: "Los servicios",
      titulo: ["Siete operaciones, un mismo", "criterio: nadie sube"],
      parrafo:
        "Cada servicio reemplaza una tarea que hoy se hace con andamio, canasto o corte de producción. La captura toma horas y la instalación sigue funcionando.",
      pieFoto: "Ortomosaico georreferenciado: el entregable del levantamiento.",
      altFoto:
        "Ortomosaico de un levantamiento aerofotogramétrico, con grilla de coordenadas UTM, curvas de nivel, puntos de control en terreno y el polígono del área levantada",
    },
    faena: {
      capitulo: "Operación registrada en faena",
      registroReal: "Registro real",
      titulo: ["Fachada de faena minera,", "limpiada en vuelo"],
      parrafo:
        "Registro real de una operación sobre estructura industrial activa. Nadie subió, y la planta no se detuvo.",
      altFoto: "Fachada de una instalación minera durante la limpieza con dron",
      ariaVideo:
        "Registro de una operación de limpieza de fachada con dron, en faena minera activa",
      razones: [
        {
          titulo: "Sin trabajo en altura",
          detalle:
            "Nadie sube. Se elimina la exposición del personal al riesgo de caída y la logística de permisos que la acompaña.",
        },
        {
          titulo: "Sin detener la planta",
          detalle:
            "Se opera sobre estructuras activas, sin montar andamios ni coordinar cortes prolongados de producción.",
        },
        {
          titulo: "Sin límite de acceso",
          detalle:
            "Se alcanzan superficies que el andamio y la grúa no cubren, incluidas cubiertas y estructuras de gran altura.",
        },
      ],
    },
    nosotros: {
      capitulo: "Quiénes somos",
      titulo: ["{anios} años operando drones", "en faena industrial"],
      altFoto: "Equipo de AGS Soluciones reunido frente al letrero corporativo en sus oficinas",
      extension: "Hoy extendemos el servicio a {paises}, desde nuestra base en Antofagasta.",
      cta: "Conocer AGS",
    },
    casos: {
      capitulo: "La prueba",
      titulo: "Proyectos ya ejecutados",
      parrafo:
        "La franja de logos genera confianza a primera vista. Esto es lo que hay detrás: plantas, ubicaciones y superficies medidas.",
      proyectos: "Proyectos",
      mwInspeccionados: "MW inspeccionados",
      hectareas: "Hectáreas",
      cta: "Ver los {n} proyectos",
    },
    software: {
      capitulo: "Del vuelo al dato",
      titulo: ["El vuelo termina", "donde empieza el dato"],
      parrafo:
        "Nuestras plataformas son la parte del servicio que queda después del vuelo: donde el hallazgo se ubica sobre el activo real y el equipo de mantenimiento trabaja sobre él.",
      seEngancha: "Se engancha a",
      sinServicios: "Servicios asociados pendientes de definición.",
      verPlataforma: "Ver la plataforma",
      anterior: "Ver la plataforma anterior",
      siguiente: "Ver la plataforma siguiente",
    },
  },

  contacto: {
    titulo: "Cuéntanos qué hay que inspeccionar",
    parrafo:
      "Revisamos el caso y enviamos propuesta técnica y comercial. Si la operación lo requiere, coordinamos una visita a faena.",
    llamarDirecto: "Llamar directo",
    whatsappNota: "Se abre con el mensaje ya escrito",
    emailNota: "Respuesta en horario hábil",
    region: "II Región",
  },

  formulario: {
    nombre: "Nombre",
    empresa: "Empresa",
    email: "Correo corporativo",
    telefono: "Teléfono",
    opcional: "Opcional",
    obligatorio: "(obligatorio)",
    operacion: "Operación requerida",
    selecciona: "Selecciona una opción",
    otraOperacion: "Otra operación",
    detalle: "Detalle de la faena",
    detallePlaceholder: "Ubicación, tipo de instalación, superficie estimada y plazo.",
    trampa: "No completar este campo",
    enviar: "Enviar solicitud",
    enviando: "Enviando",
    enviarOtra: "Enviar otra solicitud",
    exitoTitulo: "Solicitud recibida",
    exitoParrafo:
      "Revisamos el caso y te enviamos propuesta técnica y comercial. Si la operación lo requiere, coordinamos una visita a faena.",
    enviarPorCorreo: "Enviar por correo a {email}",
    nota: "Los datos se usan solo para responder esta solicitud. También puedes escribir directo a {email}.",
    resumenErrores: "El formulario tiene {n} campo(s) con errores.",
    errores: {
      sinConfigurar:
        "El envío automático todavía no está habilitado en este entorno. Tu mensaje no se perdió: usa el botón de abajo para enviarlo por correo con el texto ya escrito.",
      envio:
        "No pudimos entregar la solicitud. Vuelve a intentarlo en un momento, o escríbenos directamente por correo.",
      red: "No hay conexión con el servidor. Revisa tu red y vuelve a intentarlo.",
    },
    validacion: {
      nombre: "Indícanos tu nombre.",
      nombreLargo: "El nombre es demasiado largo.",
      empresa: "Indícanos tu empresa.",
      empresaLarga: "El nombre de la empresa es demasiado largo.",
      email: "Necesitamos un correo para responderte.",
      emailFormato: "Revisa el formato del correo.",
      telefonoLargo: "El teléfono es demasiado largo.",
      telefonoFormato: "Revisa el formato del teléfono.",
      operacion: "Selecciona la operación requerida.",
      mensajeCorto: "Cuéntanos al menos lo básico de la faena: dónde y qué hay que revisar.",
      mensajeLargo: "El detalle es demasiado largo. Resúmelo y lo conversamos por correo.",
      rechazada: "Solicitud rechazada.",
    },
    correo: {
      asunto: "Solicitud de cotización",
      web: "web",
      nombre: "Nombre",
      empresa: "Empresa",
      telefono: "Teléfono",
      noIndicado: "no indicado",
      operacion: "Operación requerida",
      porDefinir: "por definir",
    },
  },

  noticias: {
    titulo: "Novedades",
    verTodas: "Ver todas las noticias",
    leer: "Leer la noticia",
    tags: { noticia: "Noticia", comunidad: "Comunidad" },
    fuenteEtiqueta: "Fuente",
    verOriginal: "Ver la publicación original en {medio}",
    publicadoPor: "Publicado por {autor}",
    sinTraducir: "Esta nota está disponible solo en español.",
  },

  seo: {
    paginas: {
      "/": {
        titulo: "Servicios de drones en Antofagasta para minería, energía y construcción",
        descripcion:
          "AGS Soluciones opera drones industriales en Chile, Perú y Argentina: inspección termográfica de plantas fotovoltaicas, líneas eléctricas, topografía y aerofotogrametría, limpieza de fachadas e inspección de instalaciones.",
      },
      "/servicios": {
        titulo: "Servicios con drones para minería, energía y construcción",
        descripcion:
          "Siete operaciones aéreas industriales: inspección termográfica de plantas fotovoltaicas, líneas eléctricas, topografía y aerofotogrametría, limpieza de fachadas, inspección industrial, control de riego en pilas de lixiviación y producción audiovisual.",
      },
      "/casos": {
        titulo: "Proyectos ejecutados y casos de éxito",
        descripcion:
          "{proyectos} proyectos ejecutados para {clientes} clientes en minería y energía: plantas fotovoltaicas, líneas eléctricas y levantamientos topográficos en Chile.",
      },
      "/software": {
        titulo: "Software: SmartField y SmartLayout",
        descripcion:
          "Las plataformas sobre las que AGS entrega el dato de cada campaña: SmartField para inspección georreferenciada, SmartLayout para levantamiento y planificación, y SmartLix para el monitoreo térmico del riego en pilas de lixiviación.",
      },
      "/nosotros": {
        titulo: "Nosotros: quiénes somos, misión, visión e historia",
        descripcion:
          "AGS Soluciones opera drones industriales desde {anio} en Antofagasta, con servicios en Chile, Perú y Argentina para minería, energía y construcción.",
      },
      "/nosotros/brochure": {
        titulo: "Brochure AGS 2026",
        descripcion:
          "Hojea el brochure comercial de AGS Soluciones: capacidades operacionales, servicios con drones, plataformas digitales y por qué elegirnos.",
      },
      "/nosotros/certificaciones": {
        titulo: "Permisos, normas y certificaciones",
        descripcion:
          "Marco regulatorio bajo el que AGS Soluciones opera drones en Chile, conforme a la DAN 151 de la DGAC en su edición vigente.",
      },
      "/noticias": {
        titulo: "Noticias y novedades",
        descripcion:
          "Novedades de AGS Soluciones: campañas de inspección, nuevos servicios, participación en ferias y actividad de la empresa en Antofagasta.",
      },
      "/contacto": {
        titulo: "Contacto y cotización",
        descripcion:
          "Cotiza un servicio con drones en Antofagasta. Teléfono {telefono}, correo {email}.",
      },
    },
    servicioTitulo: "{servicio} con drones",
    softwareTitulo: "{producto}, la plataforma del servicio",
  },

  servicios: {
    "inspecciones-fotovoltaicas": {
      titulo: "Inspecciones Fotovoltaicas",
      tituloCorto: "Inspecciones fotovoltaicas",
      resumen: "Rápido. Preciso. Trabajable.",
      descripcion:
        "Somos líderes en inspecciones termográficas de plantas fotovoltaicas a nivel nacional. Procesamos imágenes térmicas identificando, clasificando y priorizando el 100% de las anomalías, asignadas a un gemelo digital. Ofrecemos entrega rápida de informes confiables, clasificación granular de anomalías, una plataforma digital geoespacial interactiva con ubicaciones exactas, y digitalización de inspecciones anteriores para contar con un histórico completo.",
      entregables: [
        "Clasificación y priorización del 100% de las anomalías detectadas",
        "Gemelo digital geoespacial con la ubicación exacta de cada hallazgo",
        "Histórico comparable entre campañas de inspección",
      ],
      imagenAlt:
        "Dron industrial de AGS en vuelo sobre una instalación en la Región de Antofagasta",
    },
    "inspeccion-lineas-electricas": {
      titulo: "Inspección de Líneas Eléctricas",
      tituloCorto: "Inspección de líneas eléctricas",
      resumen: "Anticipa los riesgos y garantiza la continuidad de la operación.",
      descripcion:
        "Garantizamos el rendimiento óptimo de las instalaciones eléctricas sin interrupciones. Ofrecemos inspección termográfica que detecta puntos calientes, inspección visual que identifica daños y corrosión, inspección láser LiDAR que mapea riesgos de vegetación e interferencia, inspección de hebras de conductor que detecta desgaste y daños, e informes detallados con recomendaciones específicas.",
      entregables: [
        "Termografía de puntos calientes por torre y por tramo",
        "Nube de puntos LiDAR con riesgos de vegetación e interferencia",
        "Informe con recomendaciones priorizadas por criticidad",
      ],
      imagenAlt:
        "Dron industrial de AGS en vuelo sobre una instalación en la Región de Antofagasta",
    },
    "topografia-aerofotogrametria": {
      titulo: "Topografía con Drones. Aerofotogrametría",
      tituloCorto: "Topografía y aerofotogrametría",
      resumen: "Rápido. Preciso. Seguro.",
      descripcion:
        "Generamos modelos 3D y mapas topográficos precisos mediante cámaras de alta resolución. Ofrecemos precisión centimétrica que supera los métodos tradicionales, recopilación de datos en horas versus días o semanas, acceso a terrenos remotos o inaccesibles, y visualización 3D con análisis avanzados e interactivos para la planificación de proyectos.",
      entregables: [
        "Modelo 3D y ortomosaico georreferenciado del área levantada",
        "Curvas de nivel y cubicación de stock con precisión centimétrica",
        "Entrega en horas, no en días o semanas",
      ],
      imagenAlt:
        "Dron industrial de AGS en vuelo sobre una instalación en la Región de Antofagasta",
    },
    "limpieza-fachadas-maquinarias": {
      titulo: "Limpieza de Fachadas y Maquinarias con Drones",
      tituloCorto: "Limpieza de fachadas y maquinarias",
      resumen: "Rápido. Preciso. Seguro.",
      descripcion:
        "Realizamos limpieza segura de fachadas eliminando la necesidad de andamios o personal colgado, utilizando tecnología avanzada para eliminar suciedad, polvo y contaminantes. Los beneficios incluyen mayor seguridad al minimizar riesgos, eficiencia operacional al reducir la inactividad, y soluciones para áreas inaccesibles con métodos tradicionales.",
      entregables: [
        "Operación sin andamios, sin personal suspendido y sin detener la planta",
        "Registro fotográfico antes y después de la intervención",
        "Alcance sobre superficies que la grúa y el andamio no cubren",
      ],
      imagenAlt:
        "Dron de AGS aplicando agua a presión sobre la fachada metálica de una faena minera",
    },
    "inspeccion-instalaciones-industriales": {
      titulo: "Inspección de Instalaciones Industriales",
      tituloCorto: "Inspección de instalaciones industriales",
      resumen: "Rápido. Preciso. Seguro.",
      descripcion:
        "Realizamos inspecciones sin exponer a personal a situaciones peligrosas, con capacidad de vuelo en espacios confinados y estructuras elevadas. Capturamos imágenes y videos de alta resolución que detectan daños, desgarre y corrosión. Los beneficios incluyen precisión sin igual, eficiencia y rapidez que reducen el tiempo de inactividad, y acceso a áreas inaccesibles o peligrosas para métodos tradicionales.",
      entregables: [
        "Vuelo en espacios confinados y estructuras elevadas",
        "Registro de alta resolución de daños, desgarre y corrosión",
        "Reducción del tiempo de inactividad de la instalación",
      ],
      imagenAlt:
        "Dron de AGS operando junto a una planta industrial activa, con la línea de proceso en funcionamiento",
    },
    "control-riego-pilas-lixiviacion": {
      titulo: "Control de Distribución de Riego en Pilas de Lixiviación",
      tituloCorto: "Control de riego en pilas de lixiviación",
      resumen: "Datos precisos, rápidos y con seguridad a un menor costo.",
      descripcion:
        "Utilizamos drones con cámaras y sensores de alta resolución para capturar datos detallados de pilas de lixiviación. Generamos mapas que muestran la distribución de riego, informes personalizados con análisis de eficiencia, e integración con los sistemas de control existentes. Los beneficios incluyen la reducción del desperdicio de recursos, una mayor uniformidad del riego para maximizar la recuperación de metales, y ahorro de costos de agua y químicos.",
      entregables: [
        "Mapa de distribución de riego sobre la pila completa",
        "Análisis de eficiencia e integración con los sistemas de control existentes",
        "Ahorro de agua y químicos por corrección de zonas mal regadas",
      ],
      imagenAlt:
        "Dron industrial de AGS en vuelo sobre una instalación en la Región de Antofagasta",
    },
    "produccion-audiovisual": {
      titulo: "Producción Audiovisual",
      tituloCorto: "Producción audiovisual",
      resumen:
        "Contenido audiovisual corporativo que captura la esencia del mensaje del cliente.",
      descripcion:
        "Especialización en creación de contenido audiovisual de impacto. Ofrecemos videos corporativos que reflejan la identidad empresarial para presentaciones, marketing y comunicación interna. Destacamos por experiencia profesional, creatividad innovadora y compromiso con la calidad. El servicio incluye captura de imágenes de precisión superior a los métodos tradicionales, recopilación rápida de datos en horas versus días o semanas, y acceso a áreas remotas o inaccesibles.",
      entregables: [
        "Video corporativo terminado para presentaciones y comunicación interna",
        "Tomas aéreas en zonas remotas o de acceso restringido",
        "Material en alta resolución listo para marketing",
      ],
      imagenAlt:
        "Dron industrial de AGS en vuelo sobre una instalación en la Región de Antofagasta",
    },
  },

  industrias: {
    Energía: "Energía",
    Minería: "Minería",
    Industria: "Industria",
    Construcción: "Construcción",
    Multimedia: "Multimedia",
  },

  casos: {
    servicios: {
      "acciona-pfv-el-romero": "Termografía en planta fotovoltaica",
      "acciona-pfv-malgarida": "Termografía en planta fotovoltaica",
      "colbun-pfv-diego-de-almagro": "Inspección termográfica en planta fotovoltaica",
      "enel-pfv-finis-terrae": "Termografía en planta fotovoltaica",
      "minera-guanaco-topografia": "Topografía y aerofotogrametría",
      "antofagasta-minerals-topografia": "Levantamiento aerofotogramétrico",
      "minera-guanaco-ll-ee": "Inspección de líneas eléctricas",
      "enel-pfv-pampa-norte": "Inspección termográfica en planta fotovoltaica",
      "enel-pfv-lalackama": "Termografía en planta fotovoltaica",
      "acciona-pfv-usya": "Termografía en planta fotovoltaica",
      "acciona-pfv-almeyda": "Termografía en planta fotovoltaica",
      "colbun-pfv-ovejeria": "Inspección termográfica en planta fotovoltaica",
      "colbun-pfv-machicura": "Termografía en planta fotovoltaica",
      "enel-pfv-la-silla": "Termografía en planta fotovoltaica",
      "sqm-topografia-x6-sectores": "Levantamiento aerofotogramétrico",
      "minera-guanaco-modelamiento-3d": "Modelamiento 3D",
      "norte-aridos-cubicacion-de-stock": "Topografía y cubicación de stock",
      "minera-valle-central-ll-ee": "Inspección de líneas eléctricas",
      "megatraction-modelado-3d": "Modelamiento 3D",
    },
    fichas: {
      "acciona-pfv-el-romero": {
        planta: "PFV El Romero",
        ubicacion: "Desierto de Atacama",
        nota: "La planta fotovoltaica más grande de América Latina, que abastece a 240.000 hogares.",
      },
      "acciona-pfv-malgarida": {
        planta: "PFV Malgarida",
        ubicacion: "Diego de Almagro, Región de Atacama",
        nota: "Abastece a 280.000 hogares y reduce 512.000 toneladas de CO2 anualmente.",
      },
      "colbun-pfv-diego-de-almagro": {
        planta: "PFV Diego de Almagro",
        ubicacion: "Diego de Almagro, Región de Atacama",
        nota: "Segundo año consecutivo de colaboración en este parque solar.",
      },
      "enel-pfv-finis-terrae": {
        planta: "PFV Finis Terrae",
        ubicacion: "María Elena, Región de Antofagasta",
        nota: "Genera más de 400 GWh al año.",
      },
      "minera-guanaco-topografia": {
        planta: "Levantamiento aerofotogramétrico",
        ubicacion: "Taltal, Región de Antofagasta",
        nota: "Operador minero de oro y plata, a 220 km al sureste de Antofagasta.",
      },
      "antofagasta-minerals-topografia": {
        planta: "Proyecto Polo Sur",
        ubicacion: "Antofagasta",
        nota: "Proyecto de exploración con mapeo de 520 hectáreas.",
      },
      "minera-guanaco-ll-ee": {
        planta: "Líneas eléctricas 33 kV",
        ubicacion: "Taltal, Región de Antofagasta",
        nota: "Evaluación de infraestructura eléctrica sobre 34 km² de cobertura.",
        cifraAlterna: { valor: "301", unidad: "torres inspeccionadas" },
      },
      "enel-pfv-pampa-norte": {
        planta: "PFV Pampa Norte",
        ubicacion: "Taltal, Región de Antofagasta",
        nota: "258 mil paneles capaces de abastecer aproximadamente 100.000 viviendas.",
      },
      "enel-pfv-lalackama": {
        planta: "PFV Lalackama",
        ubicacion: "Taltal, Región de Antofagasta",
        nota: "Genera 160 GWh al año, energía para aproximadamente 90.000 viviendas.",
      },
      "acciona-pfv-usya": {
        planta: "PFV Usya",
        ubicacion: "Calama, Región de Antofagasta",
        nota: "La tercera planta fotovoltaica más grande de Acciona, con 187.200 módulos.",
      },
      "acciona-pfv-almeyda": {
        planta: "PFV Almeyda",
        ubicacion: "Diego de Almagro, Región de Atacama",
        nota: "187.620 módulos instalados, cuarto año consecutivo de colaboración.",
      },
      "colbun-pfv-ovejeria": {
        planta: "PFV Ovejería",
        ubicacion: "Tiltil, Región Metropolitana",
        nota: "Ubicada a 15 kilómetros al este de Tiltil.",
      },
      "colbun-pfv-machicura": {
        planta: "PFV Machicura",
        ubicacion: "Colbún, Región del Maule",
        nota: "Planta ubicada a 6 kilómetros de la localidad de Colbún.",
      },
      "enel-pfv-la-silla": {
        planta: "PFV La Silla",
        ubicacion: "La Higuera, Región de Coquimbo",
        nota: "Esta instalación cuenta con 3 tipos de módulos fotovoltaicos.",
      },
      "sqm-topografia-x6-sectores": {
        planta: "Topografía de 6 sectores",
        ubicacion: "María Elena, Región de Antofagasta",
        nota: "Líder global en producción de nitrato de potasio, a 205 km de Antofagasta.",
      },
      "minera-guanaco-modelamiento-3d": {
        planta: "Perímetro de protección industrial",
        ubicacion: "Taltal, Región de Antofagasta",
        nota: "Evaluación de vulnerabilidad de accesos y discontinuidades en el cierre perimetral.",
      },
      "norte-aridos-cubicacion-de-stock": {
        planta: "Cubicación de stock",
        ubicacion: "Antofagasta",
        nota: "Operador de materiales pétreos a 40 km al sureste de Antofagasta.",
      },
      "minera-valle-central-ll-ee": {
        planta: "Líneas eléctricas 154 kV",
        ubicacion: "Requínoa, Región de O'Higgins",
        nota: "Operación que procesa 135.000 toneladas diarias de relaves frescos.",
        cifraAlterna: { valor: "3,4", unidad: "km de línea" },
      },
      "megatraction-modelado-3d": {
        planta: "Rotopala Radomiro Tomic",
        ubicacion: "Calama, Región de Antofagasta",
        nota: "Modelamiento de la rotopala de mayor tamaño de Sudamérica, en rajo abierto.",
        cifraAlterna: { valor: "3.000", unidad: "m sobre el nivel del mar" },
      },
    },
    mw: "MW",
    hectareas: "hectáreas",
  },

  software: {
    smartfield: {
      resuelve:
        "Centraliza el dato de terreno capturado en cada campaña y lo deja ubicable sobre el activo real.",
      descripcion:
        "SmartField es la plataforma sobre la que AGS entrega el resultado de las campañas de inspección. Las anomalías detectadas en terreno quedan clasificadas, priorizadas y asignadas a su ubicación exacta dentro de la instalación, de modo que el equipo de mantenimiento del cliente trabaje sobre el hallazgo y no sobre un informe suelto.",
      capturaAlt:
        "Interfaz de SmartField: menú de Mapa, Hallazgos, Dashboard y Administración junto a una vista aérea del área de trabajo",
    },
    smartlayout: {
      resuelve:
        "Convierte el levantamiento aéreo en un layout medible para planificar sobre el terreno real.",
      descripcion:
        "SmartLayout toma el modelo tridimensional y el ortomosaico generados en el levantamiento y los deja disponibles como base de planificación. Es la contraparte digital del servicio de topografía y aerofotogrametría: el mismo vuelo que produce la nube de puntos alimenta la vista sobre la que el cliente proyecta y mide.",
      capturaAlt:
        "Editor de SmartLayout: panel de capas de segregación, tránsito, emergencias, maquinaria y riesgos sobre un layout operacional dibujado encima de una ortofoto de faena",
    },
    smartlix: {
      resuelve:
        "Convierte cada vuelo sobre la pila de lixiviación en un estado de riego medible por módulo.",
      descripcion:
        "SmartLix toma el par de ortofotos de cada vuelo —RGB y térmica de la misma fecha— y las alinea sobre la grilla real de módulos de la pila. Cada celda queda clasificada por bandas de temperatura configurables, de modo que la operación lee el estado del riego sobre la pila completa y compara un vuelo con otro bajo la misma escala térmica.",
      capturaAlt:
        "Interfaz de SmartLix: monitoreo térmico de una pila de lixiviación, con la grilla de módulos coloreada por temperatura y la escala en grados",
    },
  },

  nosotros: {
    extracto:
      "AGS Soluciones Industriales Aéreas es una empresa antofagastina especializada en servicios aéreos e inteligencia de datos con drones para industrias como la minera, energética y de construcción.",
    quienesSomos:
      "AGS Soluciones Industriales Aéreas es una empresa antofagastina especializada en servicios aéreos e inteligencia de datos con drones para industrias como la minera, energética y de construcción. Con más de 9 años de trayectoria en el norte de Chile, transformamos la inspección técnica y la captura de campo en soluciones 'end-to-end', maximizando la seguridad y la eficiencia operacional de nuestros clientes.",
    mision:
      "Entregar soluciones aéreas e industriales integrales a través de tecnología de drones, desarrollo de software y utilizando inteligencia artificial, optimizando la continuidad operacional, reduciendo los riesgos de las personas y transformando datos de terreno en decisiones estratégicas de alto valor.",
    vision:
      "Ser consolidados como la empresa líder y el socio tecnológico 'end-to-end' referente en Chile para la inspección, mantenimiento y analítica de datos en industrias, destacando por la innovación continua, la automatización de procesos y el impacto positivo en la seguridad operacional.",
    metodologia:
      "Todos nuestros procesos de análisis y procesamiento de información se realizan utilizando avanzados softwares de inteligencia artificial. Estos resultados están respaldados y avalados por profesionales especializados en cada servicio, garantizando la precisión y la seguridad de los resultados entregados a nuestros clientes.",
    ventajas: [
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
    ],
    historia: {
      "2016": {
        titulo: "Se funda AGS Soluciones",
        detalle:
          "La empresa nace en Antofagasta para cubrir la demanda industrial de tecnología de drones en minería y energía.",
      },
      "2020": {
        titulo: "Primeras campañas termográficas a gran escala",
        detalle:
          "Inspección de plantas fotovoltaicas sobre cientos de hectáreas para operadores de generación en el norte de Chile.",
      },
      "2023": {
        titulo: "Expansión a Perú y Argentina",
        detalle:
          "El abanico de servicios se extiende fuera de Chile, manteniendo la base de operaciones en Antofagasta.",
      },
      "2025": {
        titulo: "Plataformas propias de entrega de datos",
        detalle:
          "SmartField y SmartLayout pasan a soportar la entrega del dato de las campañas de inspección y levantamiento.",
      },
    },
    altEquipo:
      "Equipo de AGS Soluciones recibiendo un reconocimiento en el encuentro de proveedores de Minera Escondida, BHP",
  },

  certificaciones: {
    edicion: "Edición 4",
    vigenteDesde: "marzo de 2026",
    entidad: "Dirección General de Aeronáutica Civil (DGAC)",
    descripcion:
      "Norma chilena que regula la operación de aeronaves pilotadas a distancia. Su Edición 4 sustituye el esquema anterior por un modelo basado en gestión de riesgo, con vigencias de autorización más cortas y requisitos por categoría de operación.",
  },

  paginas: {
    migas: {
      "/servicios": "Servicios",
      "/casos": "Proyectos",
      "/software": "Software",
      "/nosotros": "Nosotros",
      "/nosotros/brochure": "Brochure",
      "/nosotros/certificaciones": "Certificaciones",
      "/noticias": "Noticias",
      "/contacto": "Contacto",
    },

    servicios: {
      titulo: "Siete operaciones aéreas industriales",
      bajada:
        "Cada una reemplaza una tarea que hoy se hace con andamio, canasto o corte de producción.",
      pieFoto: "Operación en faena activa, Región de Antofagasta.",
      verDetalle: "Ver detalle",
    },
    servicioDetalle: {
      tituloSeo: "{servicio} con drones",
      queSeEntrega: "Qué se entrega",
      industrias: "Industrias",
      cobertura: "Cobertura",
      fotoReferencia:
        "Fotografía de referencia. Imagen específica de este servicio pendiente de entrega por AGS.",
      proyectosConEste: "Proyectos ejecutados con este servicio",
      otrosServicios: "Otros servicios",
    },

    casos: {
      titulo: "Proyectos ya ejecutados",
      bajada:
        "Plantas, ubicaciones y superficies medidas. Las cifras son las publicadas por cada proyecto.",
      proyectos: "Proyectos",
      clientes: "Clientes",
      mwInspeccionados: "MW inspeccionados",
      hectareasLevantadas: "Hectáreas levantadas",
      grupos: {
        "inspecciones-fotovoltaicas": "Termografía en plantas fotovoltaicas",
        "topografia-aerofotogrametria": "Topografía, aerofotogrametría y modelamiento 3D",
        "inspeccion-lineas-electricas": "Inspección de líneas eléctricas",
      },
      nProyectos: "{n} proyectos",
    },

    software: {
      titulo: "La plataforma es parte del servicio",
      bajada:
        "El vuelo captura. La plataforma es donde ese dato queda ubicado sobre el activo real y disponible para el equipo que tiene que actuar.",
      pasos: [
        {
          titulo: "Capturar",
          detalle:
            "El dron levanta imagen térmica, visual o nube de puntos sobre la instalación, en horas.",
        },
        {
          titulo: "Procesar",
          detalle:
            "El material se procesa con software de análisis y lo revisa un especialista del servicio.",
        },
        {
          titulo: "Entregar",
          detalle:
            "El resultado queda en la plataforma, ubicado sobre el activo y listo para trabajar.",
        },
      ],
      seEngancha: "Se engancha a {servicios}.",
      verFicha: "Ver ficha",
      irAlSitio: "Ir al sitio de {producto}",
    },
    softwareDetalle: { aQueServicio: "A qué servicio se engancha" },

    noticias: {
      titulo: "Noticias",
      bajada:
        "Campañas, servicios nuevos, actividad de la empresa y nuestro vínculo con Antofagasta.",
      vacioTitulo: "Todavía no hay noticias publicadas",
      vacioTexto:
        "Cuando publiquemos la primera, aparecerá acá y también en la portada. Mientras tanto, los trabajos ya realizados están en la sección de proyectos.",
    },
    noticiaDetalle: { volver: "Volver a noticias" },

    contacto: {
      titulo: "Cuéntanos qué hay que inspeccionar",
      bajada:
        "Revisamos el caso y enviamos propuesta técnica y comercial. Si la operación lo requiere, coordinamos una visita a faena.",
    },

    nosotros: {
      titulo: "{anios} años convirtiendo la altura en un terreno seguro",
      bajada: "Desde Antofagasta, operando en {paises}.",
      secciones: {
        quienesSomos: "Quiénes somos",
        mision: "Misión y visión",
        historia: "Nuestra historia",
        brochure: "Brochure",
        certificaciones: "Certificaciones",
      },
      navSecciones: "Secciones de esta página",
      quienesSomos: "Quiénes somos",
      mision: "Misión",
      vision: "Visión",
      metodologiaTitulo: "Cómo procesamos la información",
      historiaTitulo: "Nuestra historia",
      brochureEtiqueta: "Brochure",
      brochurePresentacion: "Presentación comercial",
      brochureTitulo: "Brochure AGS 2026",
      brochureParrafo:
        "Capacidades operacionales, servicios, plataformas y por qué elegir AGS, en un librito que se hojea en la web.",
      brochureCta: "Hojear el brochure",
      certTitulo: "Permisos, normas y certificaciones",
      certParrafo:
        "El marco regulatorio bajo el que opera AGS y los documentos que lo respaldan.",
      certCta: "Ver el detalle",
    },

    brochure: {
      bajada:
        "La presentación comercial de AGS: capacidades operacionales, servicios, plataformas y por qué elegirnos.",
      instruccion:
        "Arrastra la esquina de la hoja o usa las flechas del teclado para pasar de página.",
      pagina: "Página",
      anterior: "Página anterior",
      siguiente: "Página siguiente",
      ampliar: "Ampliar",
      pantallaCompleta: "Pantalla completa",
      salirPantallaCompleta: "Salir de pantalla completa",
      cerrar: "Cerrar",
      irAPagina: "Ir a la página {n}: {titulo}",
      irAContratapa: "Ir a la página {n}: contratapa",
      ampliada: "{titulo}, página {pagina} ampliada",
      contratapa: "Contratapa",
      paginas: {
        "1": {
          titulo: "Portada",
          alt: "Portada del brochure: AGS Soluciones Industriales Aéreas. Eficiencia operacional, cero riesgo e información de terreno en tiempo real.",
        },
        "2": {
          titulo: "Sobre nosotros",
          alt: "Sobre nosotros: empresa chilena especializada en servicios aéreos e inteligencia de datos con drones para minería, energía y construcción.",
        },
        "3": {
          titulo: "Capacidades operacionales",
          alt: "Nuestras capacidades operacionales: servicios en faena, inteligencia de datos con entrega en plataformas digitales y seguridad HSEC.",
        },
        "4": {
          titulo: "Servicios",
          alt: "Servicios: topografía aérea y aerofotogrametría, inspección termográfica y visual fotovoltaica, inspección de líneas eléctricas, inspección de instalaciones industriales y limpieza de fachadas y maquinarias con drones.",
        },
        "5": {
          titulo: "Softwares",
          alt: "Softwares y diferenciales: las plataformas Smart Field, Smart Layout y Smart Inspections.",
        },
        "6": {
          titulo: "Por qué AGS",
          alt: "Por qué elegir AGS: presencia local, cumplimiento, seguridad operacional e innovación constante.",
        },
        "7": {
          titulo: "Contacto",
          alt: "Cierre del brochure: invitación a agendar una prueba y datos de contacto.",
        },
      },
    },

    certificaciones: {
      titulo: "Permisos, normas y certificaciones",
      bajada: "Bajo qué marco opera AGS y qué documentación respalda cada vuelo.",
      normaTitulo: "La norma vigente",
      normaParrafo:
        "Toda operación de drones en Chile se rige por la normativa de la DGAC. Cualquier proveedor que opere en faena debe acreditarla.",
      entidad: "Entidad",
      vigenteDesde: "Vigente desde",
      docTitulo: "Documentación de AGS",
      tabla: ["Documento", "Entidad emisora", "Número", "Vigente hasta"],
      indefinida: "Indefinida",
      pendienteTitulo: "Listado en preparación",
      pendienteParrafo:
        "Estamos consolidando los permisos, autorizaciones y certificaciones vigentes con su entidad emisora y su fecha de vencimiento, para publicarlos acá de forma verificable.",
      pendienteCanal:
        "Si necesitas la documentación para una licitación o una acreditación de contratista, la enviamos directamente.",
      pendienteCta: "Solicitar documentación a {email}",
    },

    noEncontrado: {
      titulo: "Esta página no existe",
      parrafo:
        "Puede que el enlace haya cambiado con el nuevo sitio. Estas son las secciones que probablemente buscabas.",
      ctaServicios: "Ver servicios",
      ctaContacto: "Contáctanos",
      todosLosServicios: "Todos los servicios",
    },
  },
};
