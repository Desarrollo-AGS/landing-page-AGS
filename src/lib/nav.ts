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
  // El orden sigue el recorrido de quien evalúa un proveedor, no el
  // organigrama: qué hacemos, con qué plataforma se entrega el dato, quiénes
  // somos, la prueba de que funciona y lo último que pasó.
  return [
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
    { label: t.ui.nav.casos, href: "/casos" },
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
    { label: t.ui.nav.noticias, href: "/noticias" },
  ];
}

/**
 * Los productos enlazan a su propio sitio, tal como pide el brief (F-12). No
 * depende del idioma: el nombre de una plataforma no se traduce.
 */
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
