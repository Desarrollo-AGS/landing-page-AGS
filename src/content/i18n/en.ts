import type { Diccionario } from "./tipos";

/**
 * Texto en inglés. Traducción del español publicado: no agrega afirmaciones
 * que el sitio no haga ya en español.
 *
 * No se traducen los nombres propios —AGS Soluciones Industriales Aéreas,
 * SmartField, SmartLayout, SmartLix, los clientes ni los lugares— y se usa la
 * terminología del rubro (leach pad, orthomosaic, aerial photogrammetry,
 * thermography, scaffolding) en vez de calcos literales del español.
 */
export const en: Diccionario = {
  ui: {
    saltarContenido: "Skip to content",
    irAlInicio: "AGS Soluciones, go to home",
    inicio: "Home",
    abrirMenu: "Open menu",
    cerrarMenu: "Close menu",
    menuPrincipal: "Main",
    menuPrincipalMovil: "Main, mobile",
    contactanos: "Contact us",
    avisoProvisional: "Provisional text, pending validation by AGS.",
    rutaNavegacion: "Breadcrumb",
    conjuncion: " and ",
    paises: { Chile: "Chile", Perú: "Peru", Argentina: "Argentina" },
    instagram: "AGS Soluciones on Instagram, opens in a new tab",
    linkedin: "AGS Soluciones on LinkedIn, opens in a new tab",
    nuevaPestana: "opens in a new tab",
    nav: {
      nosotros: "About",
      servicios: "Services",
      software: "Software",
      casos: "Projects",
      noticias: "News",
      descNosotros: "Who we are, how we operate and under what framework.",
      descServicios: "Seven aerial operations for energy, mining and construction.",
      descSoftware: "The platforms on which we deliver the data from each service.",
      verTodosServicios: "View all services",
      verPlataforma: "View the full platform",
      quienesSomos: "About us",
      misionVision: "Mission and vision",
      nuestraHistoria: "Our story",
      brochure: "Brochure",
      certificaciones: "Permits and certifications",
      casosDeExito: "Projects",
    },
    footer: {
      intro:
        "Industrial air operations for energy, mining and construction. Technology and innovation in service of safety and efficiency.",
      servicios: "Services",
      empresa: "Company",
      software: "Software",
      apoyadoPor: "Supported by",
      derechos: "All rights reserved",
    },
  },

  inicio: {
    portada: {
      antetitulo: "Industrial air operations since 2016",
      titulo: ["We turn height", "into safe ground"],
      bajada:
        "Thermal inspection, surveying and cleaning with drones for mining, energy and construction. No scaffolding, no production shutdown.",
      ctaPrimario: "Request a quote",
      ctaSecundario: "View services",
      altPoster: "Aerial view of desert hills rising above a sea of clouds",
      ariaVideo:
        "AGS corporate video: flights over the desert, industrial sites, the team operating drones in the field and its software platforms",
      pausar: "Pause the background video",
      reproducir: "Play the background video",
    },
    clientes: { capitulo: "Trusted by" },
    servicios: {
      capitulo: "The services",
      titulo: ["Seven operations, one", "rule: nobody climbs"],
      parrafo:
        "Each service replaces a task that today needs scaffolding, a man basket or a production shutdown. Capture takes hours, and the installation keeps running.",
      pieFoto: "Georeferenced orthomosaic: the survey deliverable.",
      altFoto:
        "Orthomosaic from an aerial photogrammetric survey, with a UTM coordinate grid, contour lines, ground control points and the boundary of the surveyed area",
    },
    faena: {
      capitulo: "Operation recorded on site",
      registroReal: "Real footage",
      titulo: ["Mine site façade,", "cleaned in flight"],
      parrafo:
        "Real footage of an operation on a live industrial structure. Nobody climbed, and the plant never stopped.",
      altFoto: "Façade of a mining facility during drone cleaning",
      ariaVideo: "Footage of a drone façade-cleaning operation at an active mine site",
      razones: [
        {
          titulo: "No work at height",
          detalle:
            "Nobody climbs. It removes both the fall risk for personnel and the permit logistics that come with it.",
        },
        {
          titulo: "No production shutdown",
          detalle:
            "Work is done on live structures, with no scaffolding to erect and no extended production stoppages to coordinate.",
        },
        {
          titulo: "No access limits",
          detalle:
            "It reaches surfaces that scaffolding and cranes cannot cover, including roofs and tall structures.",
        },
      ],
    },
    nosotros: {
      capitulo: "About us",
      titulo: ["{anios} years flying drones", "on industrial sites"],
      altFoto: "The AGS Soluciones team gathered in front of the company sign at their offices",
      extension: "Today we extend the service to {paises}, from our base in Antofagasta.",
      cta: "About AGS",
    },
    casos: {
      capitulo: "The proof",
      titulo: "Projects already delivered",
      parrafo:
        "A row of logos earns trust at a glance. This is what sits behind it: plants, locations and surveyed areas.",
      proyectos: "Projects",
      mwInspeccionados: "MW inspected",
      hectareas: "Hectares",
      cta: "View all {n} projects",
    },
    software: {
      capitulo: "From flight to data",
      titulo: ["The flight ends", "where the data begins"],
      parrafo:
        "Our platforms are the part of the service that remains after the flight: where each finding is placed on the real asset and the maintenance team works on it.",
      seEngancha: "Connects to",
      sinServicios: "Associated services still to be defined.",
      verPlataforma: "View platform",
      anterior: "View the previous platform",
      siguiente: "View the next platform",
    },
  },

  contacto: {
    titulo: "Tell us what needs inspecting",
    parrafo:
      "We review the case and send a technical and commercial proposal. If the operation calls for it, we arrange a site visit.",
    llamarDirecto: "Call directly",
    whatsappNota: "Opens with the message already written",
    emailNota: "Answered during business hours",
    region: "Antofagasta Region, Chile",
  },

  formulario: {
    nombre: "Name",
    empresa: "Company",
    email: "Work email",
    telefono: "Phone",
    opcional: "Optional",
    obligatorio: "(required)",
    operacion: "Operation required",
    selecciona: "Select an option",
    otraOperacion: "Another operation",
    detalle: "Details of the site",
    detallePlaceholder: "Location, type of installation, estimated area and timeframe.",
    trampa: "Do not fill in this field",
    enviar: "Send request",
    enviando: "Sending",
    enviarOtra: "Send another request",
    exitoTitulo: "Request received",
    exitoParrafo:
      "We review the case and send you a technical and commercial proposal. If the operation calls for it, we arrange a site visit.",
    enviarPorCorreo: "Send by email to {email}",
    nota: "Your details are used only to answer this request. You can also write directly to {email}.",
    resumenErrores: "The form has {n} field(s) with errors.",
    errores: {
      sinConfigurar:
        "Automatic sending is not enabled in this environment yet. Your message was not lost: use the button below to send it by email with the text already written.",
      envio:
        "We could not deliver the request. Try again in a moment, or write to us directly by email.",
      red: "No connection to the server. Check your network and try again.",
    },
    validacion: {
      nombre: "Please tell us your name.",
      nombreLargo: "That name is too long.",
      empresa: "Please tell us your company.",
      empresaLarga: "That company name is too long.",
      email: "We need an email address to reply to you.",
      emailFormato: "Check the format of the email address.",
      telefonoLargo: "That phone number is too long.",
      telefonoFormato: "Check the format of the phone number.",
      operacion: "Select the operation required.",
      mensajeCorto: "Give us at least the basics: where the site is and what needs checking.",
      mensajeLargo:
        "These details are too long. Summarise them and we will follow up by email.",
      rechazada: "Request rejected.",
    },
    correo: {
      asunto: "Quote request",
      web: "web",
      nombre: "Name",
      empresa: "Company",
      telefono: "Phone",
      noIndicado: "not given",
      operacion: "Operation required",
      porDefinir: "to be defined",
    },
  },

  noticias: {
    titulo: "What's new",
    verTodas: "See all news",
    leer: "Read the article",
    tags: { noticia: "News", comunidad: "Community" },
    fuenteEtiqueta: "Source",
    verOriginal: "See the original post on {medio}",
    publicadoPor: "Published by {autor}",
    sinTraducir: "This article is only available in Spanish.",
  },

  seo: {
    paginas: {
      "/": {
        titulo: "Industrial drone services in Antofagasta for mining, energy and construction",
        descripcion:
          "AGS Soluciones operates industrial drones in Chile, Peru and Argentina: thermal inspection of photovoltaic plants, power lines, surveying and aerial photogrammetry, façade cleaning and inspection of industrial installations.",
      },
      "/servicios": {
        titulo: "Drone services for mining, energy and construction",
        descripcion:
          "Seven industrial aerial operations: thermal inspection of photovoltaic plants, power lines, surveying and aerial photogrammetry, façade cleaning, industrial inspection, irrigation control on leach pads and audiovisual production.",
      },
      "/casos": {
        titulo: "Projects delivered and case studies",
        descripcion:
          "{proyectos} projects delivered for {clientes} clients in mining and energy: photovoltaic plants, power lines and topographic surveys across Chile.",
      },
      "/software": {
        titulo: "Software: SmartField and SmartLayout",
        descripcion:
          "The platforms AGS delivers each campaign's data on: SmartField for georeferenced inspection, SmartLayout for surveying and planning, and SmartLix for thermal monitoring of irrigation on leach pads.",
      },
      "/nosotros": {
        titulo: "About us: who we are, mission, vision and history",
        descripcion:
          "AGS Soluciones has operated industrial drones from Antofagasta since {anio}, serving mining, energy and construction in Chile, Peru and Argentina.",
      },
      "/nosotros/brochure": {
        titulo: "AGS Brochure 2026",
        descripcion:
          "Browse the AGS Soluciones commercial brochure: operational capabilities, drone services, digital platforms and why to choose us.",
      },
      "/nosotros/certificaciones": {
        titulo: "Permits, standards and certifications",
        descripcion:
          "The regulatory framework AGS Soluciones flies under in Chile, in line with the DGAC's DAN 151 in its current edition.",
      },
      "/noticias": {
        titulo: "News and updates",
        descripcion:
          "Updates from AGS Soluciones: inspection campaigns, new services, trade-show appearances and company activity in Antofagasta.",
      },
      "/contacto": {
        titulo: "Contact and quotes",
        descripcion:
          "Request a quote for a drone service in Antofagasta. Phone {telefono}, email {email}.",
      },
    },
    servicioTitulo: "{servicio} with drones",
    softwareTitulo: "{producto}, the platform behind the service",
  },

  servicios: {
    "inspecciones-fotovoltaicas": {
      titulo: "Photovoltaic Inspections",
      tituloCorto: "Photovoltaic inspections",
      resumen: "Fast. Precise. Actionable.",
      descripcion:
        "We are the national leader in thermal inspection of photovoltaic plants. We process thermal imagery by identifying, classifying and prioritising 100% of the anomalies, each one assigned to a digital twin. We deliver reliable reports fast, with granular anomaly classification, an interactive geospatial platform showing exact locations, and digitisation of earlier inspections so you hold a complete history.",
      entregables: [
        "Classification and prioritisation of 100% of the anomalies detected",
        "Geospatial digital twin with the exact location of every finding",
        "Comparable history across inspection campaigns",
      ],
      imagenAlt: "AGS industrial drone in flight over a facility in the Antofagasta Region",
    },
    "inspeccion-lineas-electricas": {
      titulo: "Power Line Inspection",
      tituloCorto: "Power line inspection",
      resumen: "Anticipate the risks and keep the operation running.",
      descripcion:
        "We keep electrical installations performing at their best, without interruptions. We offer thermal inspection that detects hot spots, visual inspection that identifies damage and corrosion, LiDAR laser inspection that maps vegetation and interference risks, conductor strand inspection that detects wear and damage, and detailed reports with specific recommendations.",
      entregables: [
        "Hot-spot thermography by tower and by span",
        "LiDAR point cloud with vegetation and interference risks",
        "Report with recommendations prioritised by criticality",
      ],
      imagenAlt: "AGS industrial drone in flight over a facility in the Antofagasta Region",
    },
    "topografia-aerofotogrametria": {
      titulo: "Drone Surveying. Aerial Photogrammetry",
      tituloCorto: "Surveying and aerial photogrammetry",
      resumen: "Fast. Precise. Safe.",
      descripcion:
        "We produce accurate 3D models and topographic maps using high-resolution cameras. We offer centimetre accuracy beyond what traditional methods reach, data collection in hours rather than days or weeks, access to remote or unreachable terrain, and 3D visualisation with advanced, interactive analysis for project planning.",
      entregables: [
        "3D model and georeferenced orthomosaic of the surveyed area",
        "Contour lines and stockpile volumes to centimetre accuracy",
        "Delivered in hours, not days or weeks",
      ],
      imagenAlt: "AGS industrial drone in flight over a facility in the Antofagasta Region",
    },
    "limpieza-fachadas-maquinarias": {
      titulo: "Façade and Equipment Cleaning with Drones",
      tituloCorto: "Façade and equipment cleaning",
      resumen: "Fast. Precise. Safe.",
      descripcion:
        "We clean façades safely, removing the need for scaffolding or suspended personnel, using advanced technology to lift dirt, dust and contaminants. The benefits include greater safety by minimising risk, operational efficiency by cutting downtime, and solutions for areas traditional methods cannot reach.",
      entregables: [
        "Operation with no scaffolding, no suspended personnel and no production shutdown",
        "Photographic record before and after the intervention",
        "Reach over surfaces that cranes and scaffolding do not cover",
      ],
      imagenAlt: "AGS drone applying pressurised water to the metal façade of a mining site",
    },
    "inspeccion-instalaciones-industriales": {
      titulo: "Industrial Facility Inspection",
      tituloCorto: "Industrial facility inspection",
      resumen: "Fast. Precise. Safe.",
      descripcion:
        "We carry out inspections without exposing personnel to dangerous situations, with the ability to fly in confined spaces and elevated structures. We capture high-resolution images and video that reveal damage, tearing and corrosion. The benefits include unmatched precision, efficiency and speed that cut downtime, and access to areas that are unreachable or dangerous for traditional methods.",
      entregables: [
        "Flight in confined spaces and elevated structures",
        "High-resolution record of damage, tearing and corrosion",
        "Less downtime for the facility",
      ],
      imagenAlt:
        "AGS drone operating next to an active industrial plant, with the process line running",
    },
    "control-riego-pilas-lixiviacion": {
      titulo: "Irrigation Distribution Control on Leach Pads",
      tituloCorto: "Irrigation control on leach pads",
      resumen: "Accurate data, fast and safe, at a lower cost.",
      descripcion:
        "We use drones with high-resolution cameras and sensors to capture detailed data from leach pads. We produce maps showing irrigation distribution, tailored reports with efficiency analysis, and integration with existing control systems. The benefits include less wasted resource, more uniform irrigation to maximise metal recovery, and savings on water and chemicals.",
      entregables: [
        "Irrigation distribution map across the entire pad",
        "Efficiency analysis and integration with existing control systems",
        "Water and chemical savings from correcting poorly irrigated zones",
      ],
      imagenAlt: "AGS industrial drone in flight over a facility in the Antofagasta Region",
    },
    "produccion-audiovisual": {
      titulo: "Audiovisual Production",
      tituloCorto: "Audiovisual production",
      resumen:
        "Corporate audiovisual content that captures the essence of the client's message.",
      descripcion:
        "We specialise in creating audiovisual content with impact. We offer corporate videos that reflect a company's identity, for presentations, marketing and internal communications. We stand out for professional experience, inventive creativity and a commitment to quality. The service includes image capture more precise than traditional methods, fast data collection in hours rather than days or weeks, and access to remote or unreachable areas.",
      entregables: [
        "Finished corporate video for presentations and internal communications",
        "Aerial footage in remote or restricted-access areas",
        "High-resolution material ready for marketing",
      ],
      imagenAlt: "AGS industrial drone in flight over a facility in the Antofagasta Region",
    },
  },

  industrias: {
    Energía: "Energy",
    Minería: "Mining",
    Industria: "Industry",
    Construcción: "Construction",
    Multimedia: "Multimedia",
  },

  casos: {
    servicios: {
      "acciona-pfv-el-romero": "Thermography at a photovoltaic plant",
      "acciona-pfv-malgarida": "Thermography at a photovoltaic plant",
      "colbun-pfv-diego-de-almagro": "Thermal inspection at a photovoltaic plant",
      "enel-pfv-finis-terrae": "Thermography at a photovoltaic plant",
      "minera-guanaco-topografia": "Surveying and aerial photogrammetry",
      "antofagasta-minerals-topografia": "Aerial photogrammetric survey",
      "minera-guanaco-ll-ee": "Power line inspection",
      "enel-pfv-pampa-norte": "Thermal inspection at a photovoltaic plant",
      "enel-pfv-lalackama": "Thermography at a photovoltaic plant",
      "acciona-pfv-usya": "Thermography at a photovoltaic plant",
      "acciona-pfv-almeyda": "Thermography at a photovoltaic plant",
      "colbun-pfv-ovejeria": "Thermal inspection at a photovoltaic plant",
      "colbun-pfv-machicura": "Thermography at a photovoltaic plant",
      "enel-pfv-la-silla": "Thermography at a photovoltaic plant",
      "sqm-topografia-x6-sectores": "Aerial photogrammetric survey",
      "minera-guanaco-modelamiento-3d": "3D modelling",
      "norte-aridos-cubicacion-de-stock": "Surveying and stockpile volume measurement",
      "minera-valle-central-ll-ee": "Power line inspection",
      "megatraction-modelado-3d": "3D modelling",
    },
    fichas: {
      "acciona-pfv-el-romero": {
        planta: "El Romero PV Plant",
        ubicacion: "Atacama Desert",
        nota: "The largest photovoltaic plant in Latin America, supplying 240,000 homes.",
      },
      "acciona-pfv-malgarida": {
        planta: "Malgarida PV Plant",
        ubicacion: "Diego de Almagro, Atacama Region",
        nota: "Supplies 280,000 homes and cuts 512,000 tonnes of CO2 a year.",
      },
      "colbun-pfv-diego-de-almagro": {
        planta: "Diego de Almagro PV Plant",
        ubicacion: "Diego de Almagro, Atacama Region",
        nota: "Second consecutive year working on this solar park.",
      },
      "enel-pfv-finis-terrae": {
        planta: "Finis Terrae PV Plant",
        ubicacion: "María Elena, Antofagasta Region",
        nota: "Generates more than 400 GWh a year.",
      },
      "minera-guanaco-topografia": {
        planta: "Aerial photogrammetric survey",
        ubicacion: "Taltal, Antofagasta Region",
        nota: "Gold and silver mining operator, 220 km southeast of Antofagasta.",
      },
      "antofagasta-minerals-topografia": {
        planta: "Polo Sur Project",
        ubicacion: "Antofagasta",
        nota: "Exploration project with 520 hectares mapped.",
      },
      "minera-guanaco-ll-ee": {
        planta: "33 kV power lines",
        ubicacion: "Taltal, Antofagasta Region",
        nota: "Assessment of electrical infrastructure across 34 km² of coverage.",
        cifraAlterna: { valor: "301", unidad: "towers inspected" },
      },
      "enel-pfv-pampa-norte": {
        planta: "Pampa Norte PV Plant",
        ubicacion: "Taltal, Antofagasta Region",
        nota: "258 thousand panels, enough to supply roughly 100,000 homes.",
      },
      "enel-pfv-lalackama": {
        planta: "Lalackama PV Plant",
        ubicacion: "Taltal, Antofagasta Region",
        nota: "Generates 160 GWh a year, power for roughly 90,000 homes.",
      },
      "acciona-pfv-usya": {
        planta: "Usya PV Plant",
        ubicacion: "Calama, Antofagasta Region",
        nota: "Acciona's third largest photovoltaic plant, with 187,200 modules.",
      },
      "acciona-pfv-almeyda": {
        planta: "Almeyda PV Plant",
        ubicacion: "Diego de Almagro, Atacama Region",
        nota: "187,620 modules installed, fourth consecutive year of collaboration.",
      },
      "colbun-pfv-ovejeria": {
        planta: "Ovejería PV Plant",
        ubicacion: "Tiltil, Metropolitan Region",
        nota: "Located 15 kilometres east of Tiltil.",
      },
      "colbun-pfv-machicura": {
        planta: "Machicura PV Plant",
        ubicacion: "Colbún, Maule Region",
        nota: "Plant located 6 kilometres from the town of Colbún.",
      },
      "enel-pfv-la-silla": {
        planta: "La Silla PV Plant",
        ubicacion: "La Higuera, Coquimbo Region",
        nota: "This installation runs 3 different types of photovoltaic module.",
      },
      "sqm-topografia-x6-sectores": {
        planta: "Survey of 6 sectors",
        ubicacion: "María Elena, Antofagasta Region",
        nota: "Global leader in potassium nitrate production, 205 km from Antofagasta.",
      },
      "minera-guanaco-modelamiento-3d": {
        planta: "Industrial protection perimeter",
        ubicacion: "Taltal, Antofagasta Region",
        nota: "Vulnerability assessment of access points and gaps in the perimeter fence.",
      },
      "norte-aridos-cubicacion-de-stock": {
        planta: "Stockpile volume measurement",
        ubicacion: "Antofagasta",
        nota: "Aggregates operator 40 km southeast of Antofagasta.",
      },
      "minera-valle-central-ll-ee": {
        planta: "154 kV power lines",
        ubicacion: "Requínoa, O'Higgins Region",
        nota: "Operation processing 135,000 tonnes of fresh tailings a day.",
        cifraAlterna: { valor: "3.4", unidad: "km of line" },
      },
      "megatraction-modelado-3d": {
        planta: "Radomiro Tomic bucket-wheel excavator",
        ubicacion: "Calama, Antofagasta Region",
        nota: "3D model of the largest bucket-wheel excavator in South America, in an open pit.",
        cifraAlterna: { valor: "3,000", unidad: "m above sea level" },
      },
    },
    mw: "MW",
    hectareas: "hectares",
  },

  software: {
    smartfield: {
      resuelve:
        "Centralises the field data captured in each campaign and makes it locatable on the real asset.",
      descripcion:
        "SmartField is the platform AGS delivers inspection campaign results on. The anomalies found in the field end up classified, prioritised and pinned to their exact position inside the installation, so the client's maintenance team works on the finding itself rather than on a loose report.",
      capturaAlt:
        "The SmartField interface: Map, Findings, Dashboard and Administration menus beside an aerial view of the work area",
    },
    smartlayout: {
      resuelve:
        "Turns the aerial survey into a measurable layout for planning on the real site.",
      descripcion:
        "SmartLayout takes the three-dimensional model and the orthomosaic produced by the survey and makes them available as a planning base. It is the digital counterpart of the surveying and aerial photogrammetry service: the same flight that produces the point cloud feeds the view the client designs and measures on.",
      capturaAlt:
        "The SmartLayout editor: a layer panel for segregation, traffic, emergencies, machinery and hazards over an operational layout drawn on top of a site orthophoto",
    },
    smartlix: {
      resuelve:
        "Turns every flight over the leach pad into a measurable irrigation status, module by module.",
      descripcion:
        "SmartLix takes the pair of orthophotos from each flight — RGB and thermal, from the same date — and aligns them on the pad's real module grid. Every cell ends up classified into configurable temperature bands, so the operation reads the irrigation status across the whole pad and compares one flight with another on the same thermal scale.",
      capturaAlt:
        "The SmartLix interface: thermal monitoring of a leach pad, with the module grid coloured by temperature and the scale in degrees",
    },
  },

  nosotros: {
    extracto:
      "AGS Soluciones Industriales Aéreas is a company based in Antofagasta, specialising in aerial services and drone data intelligence for industries such as mining, energy and construction.",
    quienesSomos:
      "AGS Soluciones Industriales Aéreas is a company based in Antofagasta, specialising in aerial services and drone data intelligence for industries such as mining, energy and construction. With more than 9 years of experience across northern Chile, we turn technical inspection and field capture into end-to-end solutions, maximising our clients' safety and operational efficiency.",
    mision:
      "To deliver comprehensive aerial and industrial solutions through drone technology, software development and artificial intelligence, improving operational continuity, reducing risk to people and turning field data into high-value strategic decisions.",
    vision:
      "To be established as the leading company and the benchmark end-to-end technology partner in Chile for industrial inspection, maintenance and data analytics, recognised for continuous innovation, process automation and a positive impact on operational safety.",
    metodologia:
      "All our analysis and data processing runs on advanced artificial intelligence software. Those results are backed and endorsed by specialists in each service, which is what guarantees the precision and reliability of what we hand to our clients.",
    ventajas: [
      {
        titulo: "Lower accident risk",
        detalle: "Nobody climbs. Personnel are no longer exposed to the risk of falling.",
      },
      {
        titulo: "Operational continuity",
        detalle: "Work is done on live structures, with no extended production stoppages.",
      },
      {
        titulo: "Efficiency, speed and lower cost",
        detalle: "Capture takes hours where the traditional method takes days or weeks.",
      },
    ],
    historia: {
      "2016": {
        titulo: "AGS Soluciones is founded",
        detalle:
          "The company starts in Antofagasta to meet industrial demand for drone technology in mining and energy.",
      },
      "2020": {
        titulo: "First large-scale thermography campaigns",
        detalle:
          "Inspection of photovoltaic plants across hundreds of hectares for power generators in northern Chile.",
      },
      "2023": {
        titulo: "Expansion into Peru and Argentina",
        detalle:
          "The range of services extends beyond Chile, with the operating base staying in Antofagasta.",
      },
      "2025": {
        titulo: "In-house data delivery platforms",
        detalle:
          "SmartField and SmartLayout take over the delivery of data from inspection and survey campaigns.",
      },
    },
    altEquipo:
      "The AGS Soluciones team receiving an award at the Minera Escondida (BHP) supplier meeting",
  },

  certificaciones: {
    edicion: "Edition 4",
    vigenteDesde: "March 2026",
    entidad: "Dirección General de Aeronáutica Civil (DGAC), Chile's civil aviation authority",
    descripcion:
      "The Chilean regulation governing the operation of remotely piloted aircraft. Edition 4 replaces the earlier scheme with a risk-management model, with shorter authorisation validity periods and requirements set by operation category.",
  },

  paginas: {
    migas: {
      "/servicios": "Services",
      "/casos": "Projects",
      "/software": "Software",
      "/nosotros": "About",
      "/nosotros/brochure": "Brochure",
      "/nosotros/certificaciones": "Certifications",
      "/noticias": "News",
      "/contacto": "Contact",
    },

    servicios: {
      titulo: "Seven industrial aerial operations",
      bajada:
        "Each one replaces a task that today needs scaffolding, a man basket or a production stoppage.",
      pieFoto: "Operation on a live site, Antofagasta Region.",
      verDetalle: "See details",
    },
    servicioDetalle: {
      tituloSeo: "{servicio} with drones",
      queSeEntrega: "What you get",
      industrias: "Industries",
      cobertura: "Coverage",
      fotoReferencia:
        "Reference photograph. A specific image for this service is pending delivery by AGS.",
      proyectosConEste: "Projects delivered with this service",
      otrosServicios: "Other services",
    },

    casos: {
      titulo: "Projects already delivered",
      bajada:
        "Plants, locations and areas measured. The figures are the ones published for each project.",
      proyectos: "Projects",
      clientes: "Clients",
      mwInspeccionados: "MW inspected",
      hectareasLevantadas: "Hectares surveyed",
      grupos: {
        "inspecciones-fotovoltaicas": "Thermography at photovoltaic plants",
        "topografia-aerofotogrametria": "Surveying, photogrammetry and 3D modelling",
        "inspeccion-lineas-electricas": "Power line inspection",
      },
      nProyectos: "{n} projects",
    },

    software: {
      titulo: "The platform is part of the service",
      bajada:
        "The flight captures. The platform is where that data ends up located on the real asset and available to the team that has to act on it.",
      pasos: [
        {
          titulo: "Capture",
          detalle:
            "The drone collects thermal imagery, visual imagery or a point cloud over the installation, in hours.",
        },
        {
          titulo: "Process",
          detalle:
            "The material is processed with analysis software and reviewed by a specialist from the service.",
        },
        {
          titulo: "Deliver",
          detalle:
            "The result lands in the platform, located on the asset and ready to work with.",
        },
      ],
      seEngancha: "Pairs with {servicios}.",
      verFicha: "See the platform",
      irAlSitio: "Go to the {producto} site",
    },
    softwareDetalle: { aQueServicio: "Which service it pairs with" },

    noticias: {
      titulo: "News",
      bajada: "Campaigns, new services, company activity and our ties to Antofagasta.",
      vacioTitulo: "No news published yet",
      vacioTexto:
        "When we publish the first one it will appear here and on the home page too. In the meantime, the work we have already delivered is in the projects section.",
    },
    noticiaDetalle: { volver: "Back to news" },

    contacto: {
      titulo: "Tell us what needs inspecting",
      bajada:
        "We review the case and send a technical and commercial proposal. If the operation calls for it, we arrange a site visit.",
    },

    nosotros: {
      titulo: "{anios} years turning height into safe ground",
      bajada: "From Antofagasta, operating in {paises}.",
      secciones: {
        quienesSomos: "Who we are",
        mision: "Mission and vision",
        historia: "Our history",
        brochure: "Brochure",
        certificaciones: "Certifications",
      },
      navSecciones: "Sections on this page",
      quienesSomos: "Who we are",
      mision: "Mission",
      vision: "Vision",
      metodologiaTitulo: "How we process the data",
      historiaTitulo: "Our history",
      brochureEtiqueta: "Brochure",
      brochurePresentacion: "Commercial presentation",
      brochureTitulo: "AGS Brochure 2026",
      brochureParrafo:
        "Operational capabilities, services, platforms and why to choose AGS, in a booklet you leaf through on the web.",
      brochureCta: "Leaf through the brochure",
      certTitulo: "Permits, standards and certifications",
      certParrafo:
        "The regulatory framework AGS operates under and the documents that back it up.",
      certCta: "See the details",
    },

    brochure: {
      bajada:
        "The AGS commercial presentation: operational capabilities, services, platforms and why to choose us.",
      instruccion: "Drag the corner of the page or use the arrow keys to turn it.",
      pagina: "Page",
      anterior: "Previous page",
      siguiente: "Next page",
      ampliar: "Enlarge",
      pantallaCompleta: "Full screen",
      salirPantallaCompleta: "Exit full screen",
      cerrar: "Close",
      irAPagina: "Go to page {n}: {titulo}",
      irAContratapa: "Go to page {n}: back cover",
      ampliada: "{titulo}, page {pagina} enlarged",
      contratapa: "Back cover",
      paginas: {
        "1": {
          titulo: "Cover",
          alt: "Brochure cover: AGS Soluciones Industriales Aéreas. Operational efficiency, zero risk and field information in real time.",
        },
        "2": {
          titulo: "About us",
          alt: "About us: a Chilean company specialising in aerial services and drone data intelligence for mining, energy and construction.",
        },
        "3": {
          titulo: "Operational capabilities",
          alt: "Our operational capabilities: on-site services, data intelligence delivered on digital platforms, and HSEC safety.",
        },
        "4": {
          titulo: "Services",
          alt: "Services: aerial surveying and photogrammetry, thermal and visual photovoltaic inspection, power line inspection, industrial facility inspection, and façade and equipment cleaning with drones.",
        },
        "5": {
          titulo: "Software",
          alt: "Software and differentiators: the Smart Field, Smart Layout and Smart Inspections platforms.",
        },
        "6": {
          titulo: "Why AGS",
          alt: "Why choose AGS: local presence, compliance, operational safety and constant innovation.",
        },
        "7": {
          titulo: "Contact",
          alt: "Closing page of the brochure: an invitation to book a trial, with contact details.",
        },
      },
    },

    certificaciones: {
      titulo: "Permits, standards and certifications",
      bajada: "The framework AGS operates under, and the paperwork behind every flight.",
      normaTitulo: "The standard in force",
      normaParrafo:
        "Every drone operation in Chile is governed by DGAC regulation. Any supplier flying on site has to prove compliance with it.",
      entidad: "Authority",
      vigenteDesde: "In force since",
      docTitulo: "AGS documentation",
      tabla: ["Document", "Issuing authority", "Number", "Valid until"],
      indefinida: "No expiry",
      pendienteTitulo: "List in preparation",
      pendienteParrafo:
        "We are consolidating the permits, authorisations and certifications currently in force, each with its issuing authority and expiry date, so we can publish them here in verifiable form.",
      pendienteCanal:
        "If you need the documentation for a tender or a contractor accreditation, we send it to you directly.",
      pendienteCta: "Request documentation from {email}",
    },

    noEncontrado: {
      titulo: "This page does not exist",
      parrafo:
        "The link may have changed with the new site. These are the sections you were probably looking for.",
      ctaServicios: "See services",
      ctaContacto: "Contact us",
      todosLosServicios: "All services",
    },
  },
};
