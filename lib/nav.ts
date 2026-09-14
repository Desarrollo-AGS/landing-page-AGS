/**
 * Los enlaces "Servicios", "Casos de Éxito" y "Contacto" del Header/Footer apuntan
 * a secciones de la Home (ver spec 0.1: la Home concentra los preview de cada sección).
 * En Home navegan por ancla; en subpáginas navegan primero a Home y luego a la ancla.
 *
 * Excepción: "cotizar" sí tiene página propia (`/cotizar`, ticket 5.3), así que en
 * subpáginas navega directo ahí en vez de `/#cotizar` — tal como preveía el ticket
 * 1.1 ("navega a /#cotizar o a /cotizar si existe como página propia").
 */
export function sectionHref(pathname: string, anchor: string): string {
  if (pathname === "/") return `#${anchor}`;
  if (anchor === "cotizar") return "/cotizar";
  return `/#${anchor}`;
}
