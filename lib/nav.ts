/**
 * Los enlaces "Servicios", "Casos de Éxito" y "Contacto" del Header/Footer apuntan
 * a secciones de la Home (ver spec 0.1: la Home concentra los preview de cada sección).
 * En Home navegan por ancla; en subpáginas navegan primero a Home y luego a la ancla.
 */
export function sectionHref(pathname: string, anchor: string): string {
  return pathname === "/" ? `#${anchor}` : `/#${anchor}`;
}
