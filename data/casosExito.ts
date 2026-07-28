export interface CasoExito {
  /** Slug idéntico al del sitio actual (agssoluciones.cl/casos-exito/[slug]/) — no cambiar, ver spec 0.1 y ticket 4.3. */
  slug: string;
  cliente: string;
  ubicacion: string;
  cifraDestacada: string;
  servicio: string;
  /** Slug del servicio relacionado en servicios.ts, para enlazar internamente. */
  servicioSlug: string;
  texto: string;
  imagen: string;
  /** true mientras no exista una foto real del proyecto — ver blocker "Fotos reales por caso de éxito" (Sprint 4). */
  imagenPendiente: boolean;
}

/**
 * Contenido extraído de https://agssoluciones.cl/casos-exito/ (fetch en vivo, Sprint 0).
 * Las slugs se mantienen exactas para no perder posicionamiento/backlinks existentes.
 */
export const casosExito: CasoExito[] = [
  {
    slug: "enel-pfv-la-silla",
    cliente: "Enel Green Power",
    ubicacion: "La Higuera, Región de Coquimbo",
    cifraDestacada: "1,7 mW / 4 Ha",
    servicio: "Termografía en planta fotovoltaica",
    servicioSlug: "inspecciones-fotovoltaicas",
    texto: "Esta instalación cuenta con 3 tipos de módulos fotovoltaicos.",
    imagen: "/images/caso-enel-pfv-la-silla.webp",
    imagenPendiente: false,
  },
  {
    slug: "acciona-pfv-almeyda",
    cliente: "Acciona (AeroProtechnik)",
    ubicacion: "Diego de Almagro, Región de Atacama",
    cifraDestacada: "62 mW / 150 Ha",
    servicio: "Termografía en planta fotovoltaica",
    servicioSlug: "inspecciones-fotovoltaicas",
    texto:
      "187.620 módulos instalados, en colaboración con AGS Soluciones durante el cuarto año consecutivo.",
    imagen: "/images/servicio-fallback-generico.webp",
    imagenPendiente: true,
  },
  {
    slug: "acciona-pfv-el-romero",
    cliente: "Acciona (AeroProtechnik)",
    ubicacion: "Desierto de Atacama",
    cifraDestacada: "246 mW / 262 Ha",
    servicio: "Termografía en planta fotovoltaica",
    servicioSlug: "inspecciones-fotovoltaicas",
    texto: "La planta fotovoltaica más grande de América Latina, que abastece a 240.000 hogares.",
    imagen: "/images/servicio-fallback-generico.webp",
    imagenPendiente: true,
  },
  {
    slug: "acciona-pfv-malgarida",
    cliente: "Acciona (AeroProtechnik)",
    ubicacion: "Diego de Almagro, Región de Atacama",
    cifraDestacada: "238 mW / 535 Ha",
    servicio: "Termografía en planta fotovoltaica",
    servicioSlug: "inspecciones-fotovoltaicas",
    texto: "Abastece a 280.000 hogares y reduce 512.000 toneladas de CO2 anualmente.",
    imagen: "/images/servicio-fallback-generico.webp",
    imagenPendiente: true,
  },
  {
    slug: "acciona-pfv-usya",
    cliente: "Acciona (AeroProtechnik)",
    ubicacion: "Calama, Región de Antofagasta",
    cifraDestacada: "64 mW / 105 Ha",
    servicio: "Termografía en planta fotovoltaica",
    servicioSlug: "inspecciones-fotovoltaicas",
    texto: "La tercera planta fotovoltaica más grande de Acciona, con 187.200 módulos instalados.",
    imagen: "/images/servicio-fallback-generico.webp",
    imagenPendiente: true,
  },
  {
    slug: "antofagasta-minerals-topografia",
    cliente: "Antofagasta Minerals",
    ubicacion: "Antofagasta",
    cifraDestacada: "520 Ha",
    servicio: "Levantamiento aerofotogramétrico",
    servicioSlug: "topografia-aerofotogrametria",
    texto: 'Proyecto de exploración "Polo Sur", con mapeo de 520 hectáreas.',
    imagen: "/images/servicio-fallback-generico.webp",
    imagenPendiente: true,
  },
  {
    slug: "colbun-pfv-diego-de-almagro",
    cliente: "Colbún",
    ubicacion: "Diego de Almagro, Región de Atacama",
    cifraDestacada: "230 mW / 330 Ha",
    servicio: "Inspección termográfica en planta fotovoltaica",
    servicioSlug: "inspecciones-fotovoltaicas",
    texto: "Segundo año consecutivo de colaboración en este parque solar.",
    imagen: "/images/servicio-fallback-generico.webp",
    imagenPendiente: true,
  },
  {
    slug: "colbun-pfv-machicura",
    cliente: "Colbún",
    ubicacion: "Colbún, Región del Maule",
    cifraDestacada: "9 mW / 14 Ha",
    servicio: "Termografía en planta fotovoltaica",
    servicioSlug: "inspecciones-fotovoltaicas",
    texto: "Planta ubicada a 6 kilómetros de la localidad de Colbún.",
    imagen: "/images/servicio-fallback-generico.webp",
    imagenPendiente: true,
  },
  {
    slug: "colbun-pfv-ovejeria",
    cliente: "Colbún",
    ubicacion: "Tiltil, Región Metropolitana",
    cifraDestacada: "9,9 mW / 18 Ha",
    servicio: "Inspección termográfica en planta fotovoltaica",
    servicioSlug: "inspecciones-fotovoltaicas",
    texto: "Ubicada a 15 kilómetros al este de Tiltil.",
    imagen: "/images/servicio-fallback-generico.webp",
    imagenPendiente: true,
  },
  {
    slug: "enel-pfv-finis-terrae",
    cliente: "Enel",
    ubicacion: "María Elena, Región de Antofagasta",
    cifraDestacada: "160 mW / 360 Ha",
    servicio: "Termografía en planta fotovoltaica",
    servicioSlug: "inspecciones-fotovoltaicas",
    texto: "Genera más de 400 GWh al año.",
    imagen: "/images/servicio-fallback-generico.webp",
    imagenPendiente: true,
  },
];

export function getCasoExitoBySlug(slug: string): CasoExito | undefined {
  return casosExito.find((caso) => caso.slug === slug);
}
