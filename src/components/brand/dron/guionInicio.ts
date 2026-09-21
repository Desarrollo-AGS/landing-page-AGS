/**
 * Guion del dron en el inicio.
 *
 * Las poses dicen hacia dónde va el dron en cada punto del progreso de una
 * sección (0-1), a qué escala, con qué opacidad y con el sensor encendido o no.
 * Entre poses se interpola con smoothstep. Son DESTINOS, no posiciones: el dron
 * los persigue con el muelle de `vuelo.ts` y llega con su propia inercia.
 *
 * El recorrido fino —posarse sobre el botón del navbar, la curva del hero, la
 * fotogrametría, el escaneo de las cifras y el aterrizaje entre las tarjetas de
 * software— lo llevan las acciones de `accionesInicio.ts`, que miden el DOM
 * real. Las poses de acá son el punto de partida y el respaldo cuando una
 * acción no puede medir (por ejemplo, si la foto de servicios está oculta).
 *
 * CONTINUIDAD
 * -----------
 * Cada sección empieza donde terminó la anterior: el muelle taparía un salto,
 * pero se notaría como un tirón. Las secciones sin dron (faena y nosotros)
 * arrancan donde lo dejó servicios y lo apagan con el propio progreso, en vez
 * de cortarlo de golpe.
 *
 * Los progresos de las secciones que NO están fijadas se miden contra el
 * centro de la ventana: la sección está en 0 cuando su borde superior cruza el
 * centro, y en 1 cuando lo cruza el inferior. La del hero arranca en 0,5
 * porque ya está a media pantalla al cargar. "faena" está fijada y su progreso
 * sale de la línea de tiempo `dron-faena` de `animacionesInicio.ts`.
 *
 * "contacto" no tiene escena a propósito: el dron ya aterrizó en software y se
 * queda ahí, así que esa sigue siendo la escena activa hasta el footer.
 *
 * Solo escritorio: bajo 1024px el dron no se monta en el inicio (ver README,
 * sección 7: en móvil el modelo empujaba el LCP del hero de 1,2 s a 3,8 s).
 */

import { accionesInicio } from "./accionesInicio";
import type { Guion, Vista } from "./coreografiaNarrativa";

/** Columna por la que baja el costado izquierdo del banner, por fuera del contenedor. */
const costadoIzquierdo = (v: Vista) => Math.min(110, Math.max(48, v.izq - 30));

export const guionInicio: Guion = {
  escritorio: {
    // 1 y 2 · Del botón del navbar al costado izquierdo del banner.
    hero: [
      { p: 0.5, x: 0.88, y: 0.08, s: 0.26 },
      { p: 1, x: costadoIzquierdo, y: 0.42, s: 0.22 },
    ],

    // La bajada por la canaleta se toma toda esta franja, y termina al pie de
    // la ventana: por ahí entra la foto de servicios, y así no se le monta al
    // titular. Repartir el viaje entre el banner y esta franja es lo que evita
    // que el dron cruce la pantalla de un tirón.
    clientes: [
      { p: 0, x: costadoIzquierdo, y: 0.42, s: 0.22 },
      { p: 1, x: costadoIzquierdo, y: 0.9, s: 0.22 },
    ],

    // 3 · Fotogrametría. Respaldo si la foto no está.
    servicios: [
      { p: 0, x: costadoIzquierdo, y: 0.5, s: 0.3, sensor: 0 },
      { p: 1, x: costadoIzquierdo, y: 0.45, s: 0.3, sensor: 0 },
    ],

    // 4 · Faena: sale del último waypoint de la foto, se va hacia la derecha y
    // se apaga con el progreso. El video queda solo.
    faena: [
      { p: 0, x: 0.4, y: 0.5, s: 0.3, o: 1 },
      { p: 0.2, x: 0.75, y: 0.3, s: 0.26, o: 0 },
      { p: 1, x: 1.12, y: 0.24, s: 0.26, o: 0 },
    ],

    nosotros: [
      { p: 0, x: 1.12, y: 0.24, s: 0.26, o: 0 },
      { p: 1, x: 1.12, y: 0.22, s: 0.3, o: 0 },
    ],

    // 5 · Casos. Respaldo: la acción lo trae desde la derecha, lo sostiene
    // sobre las cifras y después lo baja por el costado.
    casos: [
      { p: 0, x: 1.12, y: 0.22, s: 0.3, o: 0 },
      { p: 0.12, x: 0.78, y: 0.24, s: 0.3, o: 1, sensor: 1 },
      { p: 1, x: 0.93, y: 0.82, s: 0.32, o: 1, sensor: 0 },
    ],

    // 6 · Software: aterriza entre las dos tarjetas y se queda.
    software: [
      { p: 0, x: 0.93, y: 0.82, s: 0.34 },
      { p: 1, x: 0.5, y: 0.5, s: 0.28 },
    ],
  },
  acciones: accionesInicio,
};
