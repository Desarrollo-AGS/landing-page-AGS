export interface Anuncio {
  id: string;
  active: boolean;
  /** Fecha ISO (inclusive) hasta la que se muestra el banner — pasada esa fecha no se renderiza, aunque `active` siga en true. */
  expiresAt: string;
  mensaje: string;
  imagen: string;
  imagenAlt: string;
  ctaLabel: string;
  ctaHref: string;
}

/**
 * Banner temporal de evento (ticket 4.4). Fechas reales de EXPONOR 2026 confirmadas
 * por búsqueda pública (8 al 11 de junio de 2026, Antofagasta — fuente: exponor.cl),
 * no inventadas.
 *
 * A la fecha de este commit la feria ya pasó, así que este registro queda como
 * ejemplo real del patrón que pide el ticket: `active: true` pero `expiresAt`
 * vencido — `getAnuncioVigente()` ya no lo muestra sin tocar el componente ni
 * este archivo.
 */
export const anuncios: Anuncio[] = [
  {
    id: "exponor-2026",
    active: true,
    expiresAt: "2026-06-11",
    mensaje: "Visítanos en EXPONOR 2026 — 8 al 11 de junio en Antofagasta",
    imagen: "/images/banner-exponor-2026.webp",
    imagenAlt: "Banner EXPONOR 2026",
    ctaLabel: "Cotiza tu proyecto",
    ctaHref: "/#cotizar",
  },
];

export function getAnuncioVigente(now = new Date()): Anuncio | undefined {
  return anuncios.find(
    (anuncio) => anuncio.active && now <= new Date(`${anuncio.expiresAt}T23:59:59`),
  );
}
