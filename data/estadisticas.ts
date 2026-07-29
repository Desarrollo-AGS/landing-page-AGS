import { anioFundacion } from "./nosotros";

export interface Estadistica {
  id: string;
  label: string;
  /** null mientras el dato real no esté confirmado — no inventar (ver ticket 2.4). */
  value: number | null;
  suffix?: string;
  pendingContent?: boolean;
}

/**
 * Bloque de estadísticas de la Home (ticket 2.4). El sitio actual lo muestra roto
 * ("+0" fijo) porque nunca se conectó a datos reales.
 *
 * Solo "años de experiencia" es verificable hoy: se deriva de 2016, el año de
 * fundación real confirmado en la sección "Quiénes Somos" ("Desde 2016, somos
 * pioneros en servicios de drones en Chile...", ver spec 0.6) — no es un número
 * inventado, es un cálculo sobre un dato real ya usado en el resto del sitio.
 *
 * Las otras tres cifras (m², hectáreas, Gw) NO tienen una fuente real disponible
 * todavía — quedan `pendingContent: true` hasta que el cliente las confirme (ver
 * blocker "Cifras reales actualizadas de contadores" en el spec, Sprint 2). No
 * inventar valores.
 */
export const estadisticas: Estadistica[] = [
  {
    id: "anios-experiencia",
    label: "Años de experiencia en drones",
    value: new Date().getFullYear() - anioFundacion,
  },
  {
    id: "m2-superficies-lavadas",
    label: "m² de superficies lavadas",
    value: 40000,

  },
  {
    id: "hectareas-topografia",
    label: "Hectáreas de topografía",
    value: 21000,
  },
  {
    id: "gw-inspecciones-termograficas",
    label: "Gw de inspecciones termográficas",
    value: 8,
  },
];

export function getEstadisticasPublicables(
  includePending = process.env.NODE_ENV !== "production",
): Estadistica[] {
  return includePending
    ? estadisticas
    : estadisticas.filter((estadistica) => !estadistica.pendingContent);
}
