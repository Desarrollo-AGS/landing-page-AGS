import { servicios } from "@/content/servicios";
import { productos } from "@/content/software";
import type { Diccionario } from "@/content/i18n";

/**
 * Mapa de navegación (F-02 y F-06). Es la única definición: navbar de
 * escritorio, menú móvil y footer leen de acá, así que no pueden quedar
 * desalineados entre sí.
 */

export interface Enlace {
  label: string;
  href: string;
  externo?: boolean;
}

export interface ItemNav extends Enlace {
  /** Un submenú convierte el ítem en disparador de dropdown. */
  submenu?: {
    destacados?: Enlace[];
    resto?: Enlace[];
    /** Enlace al índice completo, al pie del panel. */
    indice?: Enlace;
    descripcion?: string;
  };
}

/**
 * Mapa de navegación, en el idioma que se le pase.
 *
 * Es una FUNCIÓN y no una constante porque los rótulos cambian con el idioma,
 * pero los slugs no: las URLs son las mismas en los dos y por eso siguen
 * saliendo de `servicios.ts` y `software.ts`.
 */
export function navPrincipalDe(t: Diccionario): ItemNav[] {
  return [
    {
      label: t.ui.nav.nosotros,
      href: "/nosotros",
      submenu: {
        descripcion: t.ui.nav.descNosotros,
        resto: [
          { label: t.ui.nav.quienesSomos, href: "/nosotros" },
          { label: t.ui.nav.misionVision, href: "/nosotros#mision" },
          { label: t.ui.nav.nuestraHistoria, href: "/nosotros#historia" },
          { label: t.ui.nav.brochure, href: "/nosotros/brochure" },
          { label: t.ui.nav.certificaciones, href: "/nosotros/certificaciones" },
        ],
      },
    },
    {
      label: t.ui.nav.servicios,
      href: "/servicios",
      submenu: {
        descripcion: t.ui.nav.descServicios,
        destacados: servicios
          .filter((s) => s.destacado)
          .map((s) => ({
            label: t.servicios[s.slug].tituloCorto,
            href: `/servicios/${s.slug}`,
          })),
        resto: servicios
          .filter((s) => !s.destacado)
          .map((s) => ({
            label: t.servicios[s.slug].tituloCorto,
            href: `/servicios/${s.slug}`,
          })),
        indice: { label: t.ui.nav.verTodosServicios, href: "/servicios" },
      },
    },
    {
      label: t.ui.nav.software,
      href: "/software",
      submenu: {
        descripcion: t.ui.nav.descSoftware,
        resto: productos.map((p) => ({ label: p.nombre, href: `/software/${p.slug}` })),
        indice: { label: t.ui.nav.verPlataforma, href: "/software" },
      },
    },
    { label: t.ui.nav.casos, href: "/casos" },
    { label: t.ui.nav.comunidad, href: "/comunidad" },
    { label: t.ui.nav.noticias, href: "/noticias" },
  ];
}

/** Columnas del footer, en el idioma que se le pase. */
export function navFooterServiciosDe(t: Diccionario): Enlace[] {
  return servicios.map((s) => ({
    label: t.servicios[s.slug].tituloCorto,
    href: `/servicios/${s.slug}`,
  }));
}

export function navFooterEmpresaDe(t: Diccionario): Enlace[] {
  return [
    { label: t.ui.nav.quienesSomos, href: "/nosotros" },
    { label: t.ui.nav.brochure, href: "/nosotros/brochure" },
    { label: t.ui.nav.certificaciones, href: "/nosotros/certificaciones" },
    { label: t.ui.nav.casosDeExito, href: "/casos" },
    { label: t.ui.nav.comunidad, href: "/comunidad" },
    { label: t.ui.nav.noticias, href: "/noticias" },
  ];
}

export const navPrincipal: ItemNav[] = [
  {
    label: "Nosotros",
    href: "/nosotros",
    submenu: {
      descripcion: "Quiénes somos, cómo operamos y bajo qué marco.",
      resto: [
        { label: "Quiénes somos", href: "/nosotros" },
        { label: "Misión y visión", href: "/nosotros#mision" },
        { label: "Nuestra historia", href: "/nosotros#historia" },
        { label: "Brochure", href: "/nosotros/brochure" },
        { label: "Permisos y certificaciones", href: "/nosotros/certificaciones" },
      ],
    },
  },
  {
    label: "Servicios",
    href: "/servicios",
    submenu: {
      descripcion: "Siete operaciones aéreas para energía, minería y construcción.",
      destacados: servicios
        .filter((s) => s.destacado)
        .map((s) => ({ label: s.tituloCorto, href: `/servicios/${s.slug}` })),
      resto: servicios
        .filter((s) => !s.destacado)
        .map((s) => ({ label: s.tituloCorto, href: `/servicios/${s.slug}` })),
      indice: { label: "Ver todos los servicios", href: "/servicios" },
    },
  },
  {
    label: "Software",
    href: "/software",
    submenu: {
      descripcion: "Las plataformas sobre las que entregamos el dato del servicio.",
      resto: productos.map((p) => ({ label: p.nombre, href: `/software/${p.slug}` })),
      indice: { label: "Ver la plataforma completa", href: "/software" },
    },
  },
  { label: "Casos", href: "/casos" },
  { label: "Comunidad", href: "/comunidad" },
  { label: "Noticias", href: "/noticias" },
];

export const navFooterServicios: Enlace[] = servicios.map((s) => ({
  label: s.tituloCorto,
  href: `/servicios/${s.slug}`,
}));

export const navFooterEmpresa: Enlace[] = [
  { label: "Nosotros", href: "/nosotros" },
  { label: "Brochure", href: "/nosotros/brochure" },
  { label: "Permisos y certificaciones", href: "/nosotros/certificaciones" },
  { label: "Casos de éxito", href: "/casos" },
  { label: "Comunidad", href: "/comunidad" },
  { label: "Noticias", href: "/noticias" },
];

/** Los productos enlazan a su propio sitio, tal como pide el brief (F-12). */
export const navFooterSoftware: Enlace[] = productos.map((p) => ({
  label: p.nombre,
  href: p.sitio,
  externo: true,
}));

/** Marca activo el ítem cuya sección se está viendo, incluidas subrutas. */
export function esRutaActiva(pathname: string, href: string): boolean {
  const base = href.split("#")[0];
  if (base === "/") return pathname === "/";
  return pathname === base || pathname.startsWith(`${base}/`);
}
