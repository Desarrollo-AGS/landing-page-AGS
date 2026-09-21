/**
 * Haz del sensor: el cono de luz, la retícula de esquinas y la línea de
 * barrido que el dron proyecta sobre lo que inspecciona.
 *
 * Es SVG sobre la capa del dron, no WebGL: tiene que caer exactamente sobre un
 * elemento del DOM (un titular, una foto, un botón), y eso se mide en píxeles
 * CSS. Lo comparten las dos coreografías.
 *
 * El barrido tiene dos sentidos: vertical por defecto (una línea horizontal
 * que recorre el alto, como una pasada de inspección) y horizontal cuando el
 * objetivo es más ancho que alto, por ejemplo un botón.
 */

const NS = "http://www.w3.org/2000/svg";

export interface Efectos {
  haz: number;
  reticula: number;
  barrido: number;
}

export interface Haz {
  /**
   * @param origen  punto del sensor, en coordenadas de ventana
   * @param r       rectángulo inspeccionado, en coordenadas de ventana
   * @param pasada  posición de la línea de barrido dentro del rectángulo, 0-1
   * @param horizontal  la línea recorre el ancho en vez del alto
   */
  dibujar(
    origen: { x: number; y: number },
    r: DOMRect,
    efectos: Efectos,
    pasada: number,
    horizontal?: boolean,
  ): void;
  ocultar(): void;
  destruir(): void;
}

export function crearHaz(capa: HTMLElement): Haz {
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("class", "absolute inset-0 h-full w-full");
  svg.setAttribute("aria-hidden", "true");

  const defs = document.createElementNS(NS, "defs");
  defs.innerHTML = `
    <linearGradient id="dron-haz" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ff5500" stop-opacity="0.30" />
      <stop offset="60%" stop-color="#ff5500" stop-opacity="0.09" />
      <stop offset="100%" stop-color="#ff5500" stop-opacity="0.015" />
    </linearGradient>`;

  const cono = document.createElementNS(NS, "path");
  cono.setAttribute("fill", "url(#dron-haz)");
  cono.setAttribute("opacity", "0");

  const reticula = document.createElementNS(NS, "path");
  reticula.setAttribute("fill", "none");
  reticula.setAttribute("stroke", "#ff5500");
  reticula.setAttribute("stroke-width", "1.5");
  reticula.setAttribute("stroke-linecap", "square");
  reticula.setAttribute("opacity", "0");

  const barrido = document.createElementNS(NS, "line");
  barrido.setAttribute("stroke", "#ff5500");
  barrido.setAttribute("stroke-width", "1.5");
  barrido.setAttribute("opacity", "0");

  svg.append(defs, cono, reticula, barrido);
  capa.append(svg);

  let visible = false;

  return {
    dibujar(origen, r, efectos, pasada, horizontal = false) {
      visible = true;
      const izq = r.left - 10;
      const der = r.right + 10;
      const arriba = r.top - 8;
      const abajo = r.bottom + 8;

      // Cono: del punto del sensor a los dos extremos de la banda inspeccionada.
      cono.setAttribute("d", `M ${origen.x} ${origen.y} L ${izq} ${abajo} L ${der} ${abajo} Z`);
      cono.setAttribute("opacity", String(efectos.haz * 0.75));

      // Retícula de esquinas. Marca el área bajo inspección sin encerrar el
      // contenido en una caja, que se leería como un componente de interfaz.
      const c = Math.min(22, r.height * 0.55, r.width * 0.12);
      reticula.setAttribute(
        "d",
        `M ${izq} ${arriba + c} L ${izq} ${arriba} L ${izq + c} ${arriba}
         M ${der - c} ${arriba} L ${der} ${arriba} L ${der} ${arriba + c}
         M ${der} ${abajo - c} L ${der} ${abajo} L ${der - c} ${abajo}
         M ${izq + c} ${abajo} L ${izq} ${abajo} L ${izq} ${abajo - c}`,
      );
      reticula.setAttribute("opacity", String(efectos.reticula * 0.85));

      if (horizontal) {
        const x = izq + (der - izq) * pasada;
        barrido.setAttribute("x1", String(x));
        barrido.setAttribute("x2", String(x));
        barrido.setAttribute("y1", String(arriba));
        barrido.setAttribute("y2", String(abajo));
      } else {
        const y = arriba + (abajo - arriba) * pasada;
        barrido.setAttribute("x1", String(izq));
        barrido.setAttribute("x2", String(der));
        barrido.setAttribute("y1", String(y));
        barrido.setAttribute("y2", String(y));
      }
      barrido.setAttribute("opacity", String(efectos.barrido * 0.9));
    },

    ocultar() {
      if (!visible) return;
      visible = false;
      cono.setAttribute("opacity", "0");
      reticula.setAttribute("opacity", "0");
      barrido.setAttribute("opacity", "0");
    },

    destruir() {
      svg.remove();
    },
  };
}
