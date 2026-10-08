/**
 * Forma del diccionario. Los dos idiomas la cumplen, así que si se agrega una
 * frase en español, TypeScript obliga a ponerla también en inglés: es lo que
 * impide que una versión se quede atrás sin que nadie lo note.
 *
 * Acá va SOLO texto. Lo estructural —slugs, rutas, imágenes, cifras— se queda
 * en `content/*.ts`, que es común a los dos idiomas: un número no se traduce y
 * un slug traducido rompería las URLs ya indexadas.
 */

export interface ParTexto {
  titulo: string;
  detalle: string;
}

export interface Diccionario {
  ui: {
    saltarContenido: string;
    irAlInicio: string;
    /** Primera miga de pan. Es la etiqueta visible, no el aria-label del logo. */
    inicio: string;
    abrirMenu: string;
    cerrarMenu: string;
    menuPrincipal: string;
    menuPrincipalMovil: string;
    contactanos: string;
    /** Marca de contenido todavía no validado por AGS. */
    avisoProvisional: string;
    rutaNavegacion: string;
    /** La "y" de una enumeración. En inglés es "and", con otros espacios. */
    conjuncion: string;
    /** Los países de operación. "Perú" lleva tilde solo en español. */
    paises: Record<string, string>;
    instagram: string;
    linkedin: string;
    nuevaPestana: string;
    nav: {
      nosotros: string;
      servicios: string;
      software: string;
      casos: string;
      noticias: string;
      descNosotros: string;
      descServicios: string;
      descSoftware: string;
      verTodosServicios: string;
      verPlataforma: string;
      quienesSomos: string;
      misionVision: string;
      nuestraHistoria: string;
      brochure: string;
      certificaciones: string;
      casosDeExito: string;
    };
    footer: {
      intro: string;
      servicios: string;
      empresa: string;
      software: string;
      apoyadoPor: string;
      derechos: string;
    };
  };

  inicio: {
    portada: {
      antetitulo: string;
      titulo: [string, string];
      bajada: string;
      ctaPrimario: string;
      ctaSecundario: string;
      altPoster: string;
      ariaVideo: string;
      pausar: string;
      reproducir: string;
    };
    clientes: { capitulo: string };
    servicios: {
      capitulo: string;
      titulo: [string, string];
      parrafo: string;
      pieFoto: string;
      altFoto: string;
    };
    faena: {
      capitulo: string;
      registroReal: string;
      titulo: [string, string];
      parrafo: string;
      altFoto: string;
      ariaVideo: string;
      razones: [ParTexto, ParTexto, ParTexto];
    };
    nosotros: {
      capitulo: string;
      /** `{anios}` se reemplaza por los años derivados del año de fundación. */
      titulo: [string, string];
      altFoto: string;
      /** `{paises}` se reemplaza por los países de operación. */
      extension: string;
      cta: string;
    };
    casos: {
      capitulo: string;
      titulo: string;
      parrafo: string;
      proyectos: string;
      mwInspeccionados: string;
      hectareas: string;
      /** `{n}` se reemplaza por el total de proyectos publicados. */
      cta: string;
    };
    software: {
      capitulo: string;
      titulo: [string, string];
      parrafo: string;
      seEngancha: string;
      sinServicios: string;
      verPlataforma: string;
      anterior: string;
      siguiente: string;
    };
  };

  /** Bloque de contacto, presente al pie de casi todas las páginas. */
  contacto: {
    titulo: string;
    parrafo: string;
    llamarDirecto: string;
    whatsappNota: string;
    emailNota: string;
    /** La región administrativa: "II Región" no se lee en inglés. */
    region: string;
  };

  formulario: {
    nombre: string;
    empresa: string;
    email: string;
    telefono: string;
    opcional: string;
    obligatorio: string;
    operacion: string;
    selecciona: string;
    otraOperacion: string;
    detalle: string;
    detallePlaceholder: string;
    trampa: string;
    enviar: string;
    enviando: string;
    enviarOtra: string;
    exitoTitulo: string;
    exitoParrafo: string;
    /** `{email}` se reemplaza por la casilla de contacto. */
    enviarPorCorreo: string;
    /** `{email}` se reemplaza por un enlace a la casilla de contacto. */
    nota: string;
    /** `{n}` se reemplaza por la cantidad de campos con error. */
    resumenErrores: string;
    errores: { sinConfigurar: string; envio: string; red: string };
    /**
     * Mensajes del esquema de validación. Son los mismos en cliente y
     * servidor: una sola redacción por idioma.
     */
    validacion: {
      nombre: string;
      nombreLargo: string;
      empresa: string;
      empresaLarga: string;
      email: string;
      emailFormato: string;
      telefonoLargo: string;
      telefonoFormato: string;
      operacion: string;
      mensajeCorto: string;
      mensajeLargo: string;
      rechazada: string;
    };
    /** Cuerpo del `mailto:` de respaldo cuando el envío falla. */
    correo: {
      asunto: string;
      web: string;
      nombre: string;
      empresa: string;
      telefono: string;
      noIndicado: string;
      operacion: string;
      porDefinir: string;
    };
  };

  noticias: {
    titulo: string;
    verTodas: string;
    leer: string;
    /**
     * Etiqueta visible de cada tag, por slug. Noticias y comunidad son la
     * misma sección y se distinguen acá.
     */
    tags: Record<string, string>;
    fuenteEtiqueta: string;
    /** `{medio}` se reemplaza por dónde se publicó el original. */
    verOriginal: string;
    /** `{autor}` se reemplaza por quién lo publicó. */
    publicadoPor: string;
    /** Aviso cuando una nota todavía no tiene traducción propia. */
    sinTraducir: string;
  };

  /**
   * Title y description de cada página, por ruta SIN prefijo de idioma (la
   * misma clave sirve para `/casos` y `/en/casos`). Es lo que hace que la
   * versión inglesa valga como URL propia: dos páginas con el mismo title y la
   * misma description compiten entre ellas en vez de sumar.
   */
  seo: {
    paginas: Record<string, { titulo: string; descripcion: string }>;
    /** `{servicio}` se reemplaza por el nombre del servicio. */
    servicioTitulo: string;
    /** `{producto}` se reemplaza por el nombre de la plataforma. */
    softwareTitulo: string;
  };

  /** Texto de los servicios, por slug. El slug no cambia entre idiomas. */
  servicios: Record<
    string,
    {
      titulo: string;
      /** Para navbar, footer y el selector del formulario, donde el largo no cabe. */
      tituloCorto: string;
      resumen: string;
      descripcion: string;
      /** Tres, en orden: el primero es el que muestra el inicio. */
      entregables: [string, string, string];
      imagenAlt: string;
    }
  >;
  /** Etiquetas de industria que aparecen como chips. */
  industrias: Record<string, string>;
  /** Texto de cada caso publicado y unidades de sus cifras. */
  casos: {
    servicios: Record<string, string>;
    fichas: Record<
      string,
      {
        planta: string;
        ubicacion: string;
        nota: string;
        /**
         * Solo los casos que no se miden en MW ni en hectáreas. El valor viaja
         * como texto porque su puntuación cambia de idioma: "3,4 km" en español
         * es "3.4 km" en inglés, y "3.000 m" es "3,000 m".
         */
        cifraAlterna?: { valor: string; unidad: string };
      }
    >;
    mw: string;
    hectareas: string;
  };

  /** Qué resuelve cada plataforma. El nombre del producto no se traduce. */
  software: Record<string, { resuelve: string; descripcion: string; capturaAlt: string }>;

  nosotros: {
    /** Primera oración de `quienesSomos`. La reusa el inicio. */
    extracto: string;
    quienesSomos: string;
    mision: string;
    vision: string;
    metodologia: string;
    ventajas: [ParTexto, ParTexto, ParTexto];
    /** Hitos de la línea de tiempo, por año. El año no se traduce. */
    historia: Record<string, ParTexto>;
    altEquipo: string;
  };

  /** El marco regulatorio bajo el que se vuela en Chile. */
  certificaciones: {
    edicion: string;
    vigenteDesde: string;
    entidad: string;
    descripcion: string;
  };

  /**
   * Texto propio de cada página interna: cabecera, subtítulos y llamadas a la
   * acción. Lo que viene de `content/*` (servicios, casos, plataformas) está
   * en sus propios bloques.
   */
  paginas: {
    /** Última miga de pan de cada ruta. La primera, "Inicio", está en `ui`. */
    migas: Record<string, string>;

    servicios: { titulo: string; bajada: string; pieFoto: string; verDetalle: string };
    servicioDetalle: {
      /** `{servicio}` se reemplaza por el nombre del servicio. */
      tituloSeo: string;
      queSeEntrega: string;
      industrias: string;
      cobertura: string;
      fotoReferencia: string;
      proyectosConEste: string;
      otrosServicios: string;
    };

    casos: {
      titulo: string;
      bajada: string;
      proyectos: string;
      clientes: string;
      mwInspeccionados: string;
      hectareasLevantadas: string;
      /** Título de cada grupo de proyectos, por slug de servicio. */
      grupos: Record<string, string>;
      /** `{n}` se reemplaza por la cantidad de proyectos del grupo. */
      nProyectos: string;
    };

    software: {
      titulo: string;
      bajada: string;
      pasos: [ParTexto, ParTexto, ParTexto];
      /** `{servicios}` se reemplaza por los servicios a los que se engancha. */
      seEngancha: string;
      verFicha: string;
      /** `{producto}` se reemplaza por el nombre de la plataforma. */
      irAlSitio: string;
    };
    softwareDetalle: { aQueServicio: string };

    noticias: { titulo: string; bajada: string; vacioTitulo: string; vacioTexto: string };
    noticiaDetalle: { volver: string };

    contacto: { titulo: string; bajada: string };

    nosotros: {
      /** `{anios}` se reemplaza por los años desde la fundación. */
      titulo: string;
      /** `{paises}` se reemplaza por los países de operación. */
      bajada: string;
      secciones: {
        quienesSomos: string;
        mision: string;
        historia: string;
        brochure: string;
        certificaciones: string;
      };
      navSecciones: string;
      quienesSomos: string;
      mision: string;
      vision: string;
      metodologiaTitulo: string;
      historiaTitulo: string;
      brochureEtiqueta: string;
      brochurePresentacion: string;
      brochureTitulo: string;
      brochureParrafo: string;
      brochureCta: string;
      certTitulo: string;
      certParrafo: string;
      certCta: string;
    };

    brochure: {
      bajada: string;
      instruccion: string;
      /**
       * Controles del visor. Las PÁGINAS del brochure son imágenes
       * renderizadas del PDF y están en español: lo traducible acá es el
       * índice, los botones y los textos alternativos.
       */
      pagina: string;
      anterior: string;
      siguiente: string;
      ampliar: string;
      pantallaCompleta: string;
      salirPantallaCompleta: string;
      cerrar: string;
      /** `{n}` es el número de página y `{titulo}` su nombre en el índice. */
      irAPagina: string;
      /** `{n}` es el número de la última página. */
      irAContratapa: string;
      /** `{titulo}` es el nombre del brochure y `{pagina}` la página visible. */
      ampliada: string;
      contratapa: string;
      /** Nombre y descripción de cada página, por número. */
      paginas: Record<string, { titulo: string; alt: string }>;
    };

    certificaciones: {
      titulo: string;
      bajada: string;
      normaTitulo: string;
      normaParrafo: string;
      entidad: string;
      vigenteDesde: string;
      docTitulo: string;
      tabla: [string, string, string, string];
      indefinida: string;
      pendienteTitulo: string;
      pendienteParrafo: string;
      pendienteCanal: string;
      /** `{email}` se reemplaza por la casilla de contacto. */
      pendienteCta: string;
    };

    noEncontrado: {
      titulo: string;
      parrafo: string;
      ctaServicios: string;
      ctaContacto: string;
      todosLosServicios: string;
    };
  };
}
