/**
 * TRAYECTORIA — las cifras acumuladas de AGS.
 *
 * POR QUÉ NO SE CALCULAN
 * ----------------------
 * El bloque de proyectos del inicio mostraba `totales` (ver `casos.ts`), que se
 * suma desde la cartera publicada. Esas cifras son el alcance de los proyectos
 * que están en el sitio, no el de la empresa: lo que no está publicado no suma.
 *
 * Estas son las cifras de trayectoria, y las entrega AGS. No se derivan de nada
 * del repositorio, así que viven acá escritas y nada las recalcula. Cambian con
 * los años, no con cada caso que se publique.
 *
 * Las etiquetas y las unidades están en el diccionario (`inicio.casos.trayectoria`),
 * porque son texto y van traducidas. Acá solo el número, que es igual en los dos
 * idiomas; cada idioma lo escribe con su separador de miles (40.000 / 40,000).
 */

export type ClaveTrayectoria = "experiencia" | "lavado" | "topografia" | "termografia";

export interface CifraTrayectoria {
  clave: ClaveTrayectoria;
  valor: number;
}

export const trayectoria: CifraTrayectoria[] = [
  { clave: "experiencia", valor: 10 },
  { clave: "lavado", valor: 40000 },
  { clave: "topografia", valor: 21000 },
  { clave: "termografia", valor: 8 },
];
