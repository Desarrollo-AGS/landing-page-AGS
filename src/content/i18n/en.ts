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
    separador: ", ",
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
      antetitulo: "Industrial air operations since 2015",
      titulo: ["We turn height", "into safe ground"],
      bajada:
        "Thermal inspection, surveying and cleaning with drones for mining, energy and construction.",
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
      titulo: ["Seven operations,", "no falls from height"],
      parrafo:
        "Each service replaces a task that today needs scaffolding, a man basket or a production shutdown. Capture takes hours, and the installation keeps running.",
      pieFoto: "Georeferenced orthomosaic: the survey deliverable.",
      altFoto:
        "Orthomosaic from an aerial photogrammetric survey, with a UTM coordinate grid, contour lines, ground control points and the boundary of the surveyed area",
    },
    faena: {
      capitulo: "Real operation at a mine site",
      registroReal: "Real footage",
      titulo: ["Industrial façade cleaning", "with drones, without", "stopping production"],
      parrafo:
        "At this mine site we cleaned a hard-to-reach industrial façade without erecting scaffolding or lifting workers. The work was carried out with the plant running, prioritising safety and operational continuity.",
      altFoto: "Façade of a mining facility during drone cleaning",
      ariaVideo: "Footage of a drone façade-cleaning operation at an active mine site",
      razones: [
        {
          titulo: "Less exposure to work at height",
          detalle:
            "Our drones clean façades and elevated structures, reducing the need for scaffolding, man baskets or platforms to reach them.",
        },
        {
          titulo: "The operation keeps running",
          detalle:
            "On this project we cleaned without stopping production. A solution that lets live installations be worked on, reducing interference with operational processes.",
        },
      ],
    },
    nosotros: {
      capitulo: "About us",
      titulo: ["{anios} years flying drones", "on industrial sites"],
      altFoto: "The AGS Soluciones team gathered in front of the company sign at their offices",
      cta: "About AGS",
    },
    casos: {
      capitulo: "The proof",
      titulo: "Projects already delivered",
      parrafo:
        "A row of logos earns trust at a glance. This is what sits behind it: plants, locations and surveyed areas.",
      trayectoria: {
        experiencia: { etiqueta: "Experience in drone operations", unidad: "Years" },
        lavado: { etiqueta: "Of surfaces washed by drone", unidad: "m²" },
        topografia: { etiqueta: "Hectares of topographic survey" },
        termografia: { etiqueta: "Of thermographic inspections at PV plants", unidad: "GW" },
      },
      cta: "View all projects",
    },
    software: {
      capitulo: "From flight to data",
      titulo: ["The flight ends", "where the data begins"],
      parrafo:
        "Our platforms are the part of the service that remains after the flight: where each finding is placed on the real asset and the maintenance team works on it.",
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
        titulo: "Industrial drones in Antofagasta",
        descripcion:
          "Thermal inspection of photovoltaic plants, power lines, surveying and façade cleaning with drones. We operate in Chile, Peru and Argentina.",
      },
      "/servicios": {
        titulo: "Drone services: mining and energy",
        descripcion:
          "Seven aerial operations: photovoltaic thermography, power lines, surveying, façade cleaning, industrial inspection and leach pad irrigation.",
      },
      "/casos": {
        titulo: "Projects delivered and case studies",
        descripcion:
          "Success stories in mining and energy: thermal inspection of photovoltaic plants, power line surveys and topographic surveys delivered across Chile.",
      },
      "/nosotros": {
        titulo: "About AGS: who we are and our history",
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
          "Quote a drone service in Antofagasta: we reply with a technical and commercial proposal. Phone {telefono}, email {email}.",
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
      imagenAlt:
        "AGS drone in flight over the rows of a photovoltaic plant, with the sun rising behind the panels",
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
      imagenAlt:
        "AGS drone inspecting the insulators of a high-voltage tower, with the line running down the valley",
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
      imagenAlt:
        "AGS drone flying over an open-pit quarry, with its benches and haul ramps in view",
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
      imagenAlt:
        "An AGS drone washing the façade of an industrial building with a pressurised water jet, its supply hose hanging beneath the airframe",
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
        "AGS drone with propeller guards inspecting corrosion on a metal tank at close range inside an industrial plant",
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
      imagenAlt:
        "AGS drone over a leach pad, with the irrigation lines and the pad benches at sunset",
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
      imagenAlt:
        "AGS operator flying a drone, controller in hand, facing a mine site at sunset",
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
        "A geospatial platform for the intelligent management of inspections and findings in mining operations.",
      descripcion:
        "It brings together high-resolution orthophotos, territorial visualisation and the follow-up of observations in a single environment. Every finding is backed by its image, location, date, criticality and owner, and moves through geozones until it is closed.",
      claves: [
        "Map of findings over georeferenced orthophotos",
        "Assignment by geozone and follow-up through to closure",
        "Indicator panel and reports for owner and contractor",
      ],
      capturaAlt:
        "The SmartField interface: a Map, Findings, Dashboard and Administration menu next to an aerial view of the work area",
      dispositivos: {
        escritorioAlt:
          "SmartField on desktop: the site map over an orthophoto, with the side menu for Map, Findings, Dashboard and Administration and the facility selector",
        movilAlt:
          "SmartField on the phone: the same site map full screen, with the view selector and the bar for map, findings, indicators and profile",
      },
    },
    smartlayout: {
      resuelve:
        "Design, control and publish your site's operational layouts from a single place.",
      descripcion:
        "Layouts are drawn in layers directly over georeferenced orthophotos of the operation. Every change goes through review and approval before it is published, and is recorded with its author, reviewer and reason. The version in force is distributed by QR code and consulted from the phone on site, even locating the user by GPS to show them the layout for where they are standing.",
      claves: [
        "A single official source, in force on site",
        "Full history and comparison between versions",
        "Mining, industrial plants, energy and ports",
      ],
      capturaAlt:
        "The SmartLayout editor: a layer panel for segregation, traffic, emergencies, machinery and hazards over an operational layout drawn on top of a site orthophoto",
      dispositivos: {
        escritorioAlt:
          "SmartLayout on desktop: the editor with its layer panel and the operational layout drawn over the orthophoto, with its legend and document footer",
        movilAlt:
          "SmartLayout on the phone: the layout in force for the primary crushing area and the collapsible layer panel",
        qrAlt: "QR code that opens the layout version in force on a mobile device",
        qrPie: "Scan · see the version in force",
      },
    },
    smartlix: {
      resuelve: "Monitor, analyse and optimise leach pad irrigation from a single platform.",
      descripcion:
        "SmartLix brings together the view of irrigation zones and modules, thermal analysis, orthophotos and 3D models to support faster, more precise operational decisions on site.",
      claves: [
        "Thermal maps and zone-by-zone control",
        "2D viewer, 3D viewer and module tracking",
        "Support chatbot and operational traceability",
      ],
      capturaAlt:
        "The SmartLix interface: thermal monitoring of a leach pad, with the module grid coloured by temperature and the scale in degrees",
      dispositivos: {
        escritorioAlt:
          "SmartLix on desktop: thermal monitoring of the north zone of a leach pad, with the module grid coloured by temperature, the thermal palette and the selector between RGB, thermal and combined views",
      },
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
      "All our analysis and data processing runs on latest-generation drone technology and specialist software. Those results are backed and endorsed by professionals who specialise in each service, guaranteeing the accuracy and the safety of what we deliver to our clients.",
    ventajas: [
      {
        titulo: "Track record and experience",
        detalle:
          "More than 9 years bringing technology solutions to the mining, energy and industrial sectors.",
      },
      {
        titulo: "Applied innovation",
        detalle:
          "We combine aerial technology, artificial intelligence and our own software to solve real challenges.",
      },
      {
        titulo: "Commitment to excellence",
        detalle:
          "We approach every project with technical rigour, attention to detail and a focus on dependable results.",
      },
    ],
    historia: {
      "2015": {
        titulo: "AGS Soluciones is founded",
        detalle:
          "AGS Soluciones Industriales Aéreas is founded in Antofagasta, at the centre of mining in northern Chile, to bring drone technology onto industrial ground.",
      },
      "2019": {
        titulo: "A new stage: complete solutions",
        detalle:
          "The company moves into a new stage and focuses on delivering complete solutions for the energy and mining sectors through unmanned aerial technology.",
      },
      "2025": {
        titulo: "Innovation Company award",
        detalle:
          "AGS wins the Innovation Company category of Proveedores & Futuro, the programme run by Escondida | BHP.",
      },
      "2026": {
        titulo: "Selected for Open Aster",
        detalle:
          "AGS is among the 25 companies chosen for the eighth cohort of Open Aster, by Escondida | BHP, from more than 600 applications across six countries, to take its solutions into the field.",
      },
    },
    altEquipo:
      "Three members of the AGS Soluciones team holding the Open Aster award from Escondida, BHP, at the awards ceremony",
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
      "/nosotros": "About",
      "/nosotros/brochure": "Brochure",
      "/nosotros/certificaciones": "Certifications",
      "/noticias": "News",
      "/contacto": "Contact",
    },

    servicios: {
      titulo: "Aerial technology for a smarter industry",
      bajada:
        "We turn operational challenges into precise, efficient solutions using drones, advanced sensors and specialist technology for mining, energy and industry.",
      todos: "All",
      filtrarPor: "Filter services by industry",
      contador: "{n} services for your operation",
      contadorUno: "{n} service for your operation",
      porSector: "Specialist solutions by sector",
      conocerServicio: "See the service",
      sinResultados: "No services for that industry.",
    },
    servicioDetalle: {
      tituloSeo: "{servicio} with drones",
      queSeEntrega: "What you get",
      industrias: "Industries",
      proyectosConEste: "Projects delivered with this service",
      otrosServicios: "Other services",
    },

    casos: {
      titulo: "Success Stories",
      bajada:
        "Plants, locations and areas measured. The figures are the ones published for each project.",
      confian: "Trusted by",
      grupos: {
        "inspecciones-fotovoltaicas": "Thermography at photovoltaic plants",
        "topografia-aerofotogrametria": "Surveying, photogrammetry and 3D modelling",
        "inspeccion-lineas-electricas": "Power line inspection",
      },
    },

    software: {
      irAlSitio: "Go to the {producto} site",
    },

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
      misionAhora: "What we do",
      visionHacia: "Where we are going",
      misionResultados: [
        "Operational continuity optimised",
        "Risk to people reduced",
        "Field data turned into decisions",
      ],
      visionRasgos: ["Continuous innovation", "Process automation", "Operational safety"],
      metodologiaTitulo: "How we process the data",
      metodologiaPasos: ["Drone capture", "Specialist"],
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
      aocAntetitulo: "Operating permit",
      aocTitulo: "We operate with an AOC recognised by the DGAC",
      aocParrafo:
        "AGS Soluciones holds an Air Operator Certificate (AOC) and appears in the public register of RPA companies kept by Chile's Dirección General de Aeronáutica Civil. It is the permit that allows a company to carry out commercial aerial operations with remotely piloted aircraft in Chile.",
      aocVerificar: "Check it on the DGAC register",
      aocInsigniaAlt:
        "DGAC Chile badge certifying AGS Soluciones as an AOC-certified air operator",
      aocLogoAlt: "Logo of Chile's Dirección General de Aeronáutica Civil",
      aocFotoAlt:
        "An AGS Soluciones industrial drone on site, with its registration number and the company mark on the airframe",
      normaTitulo: "The standard in force",
      normaParrafo:
        "Every drone operation in Chile is governed by DGAC regulation. Any supplier flying on site has to prove compliance with it.",
      entidad: "Authority",
      vigenteDesde: "In force since",
      docTitulo: "AGS documentation",
      tabla: ["Document", "Issuing authority", "Number", "Valid until"],
      indefinida: "No expiry",
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
