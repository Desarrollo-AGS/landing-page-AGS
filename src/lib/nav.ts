import { servicios } from "@/content/servicios";
import { productos } from "@/content/software";

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
