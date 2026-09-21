/**
 * Acciones del dron en la vista previa del inicio.
 *
 * El guion (`guionVistaPrevia.ts`) dice por dónde va el dron en cada capítulo.
 * Acá vive el único momento que necesita medir el DOM real y dibujar sus
 * propios efectos: el levantamiento sobre la fotografía de servicios.
 *
 * La sección de software no tiene acción ni escena: el recorrido del dron
 * termina al final de la pista de casos.
 *
 * PIDEN DESTINOS, NO POSICIONES
 * -----------------------------
 * Lo que devuelve `cuadro` es a dónde QUIERE ir el dron. Quien lo lleva es el
 * muelle de `brand/dron/vuelo.ts`, así que acá no hay que suavizar nada:
 * alcanza con que el destino se mueva de forma continua con el progreso.
 */

import { gsap } from "gsap";
import type { Accion, FabricaAccion } from "@/components/brand/dron/coreografiaNarrativa";

const { clamp } = gsap.utils;
const NS = "http://www.w3.org/2000/svg";
const NARANJA = "#ff5500";

const suave = (t: number) => t * t * (3 - 2 * t);
const entre = (a: number, b: number, t: number) => a + (b - a) * t;

function nodo<K extends keyof SVGElementTagNameMap>(
  etiqueta: K,
  atributos: Record<string, string | number>,
  padre: Element,
): SVGElementTagNameMap[K] {
  const el = document.createElementNS(NS, etiqueta);
  for (const [k, v] of Object.entries(atributos)) el.setAttribute(k, String(v));
  padre.append(el);
  return el;
}

/* ------------------------------------------------------------------ */
/* 02 · Servicios: una pasada por servicio                             */
/* ------------------------------------------------------------------ */

/**
 * Siete pasadas sobre la fotografía, una por cada servicio del relevo.
 *
 * Es la idea que ordena todo el capítulo: mientras la columna derecha releva
 * "siete operaciones", el dron levanta la fachada en siete pasadas. El índice
 * de pasada se calcula igual que el del relevo en `animaciones.ts`
 * (`floor(progreso * 7)`), así que la captura y el servicio cambian juntos.
 *
 * Sin HUD a propósito: el capítulo ya tiene su contador 01/07 y repetirlo sobre
 * la foto sería ruido.
 *
 * Todo lo que tiene estado (las capturas) se crea y se destruye siguiendo el
 * scroll, así que subir deshace el levantamiento en el mismo orden.
 */
const PASADAS = 7;

/** Serpentina sobre la foto, en fracciones de su rectángulo. */
const RUTA = [
  { x: 0.14, y: 0.3 },
  { x: 0.38, y: 0.3 },
  { x: 0.62, y: 0.3 },
  { x: 0.86, y: 0.3 },
  { x: 0.78, y: 0.72 },
  { x: 0.5, y: 0.72 },
  { x: 0.22, y: 0.72 },
];

/** Dónde termina la entrada y empieza el levantamiento. */
const ENTRADA = 0.06;

const servicios: FabricaAccion = (capa): Accion => {
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("class", "absolute inset-0 h-full w-full");
  svg.setAttribute("aria-hidden", "true");
  svg.style.opacity = "0";
  capa.append(svg);

  const defs = nodo("defs", {}, svg);
  const recorte = nodo("clipPath", { id: "dron-vp-levantamiento" }, defs);
  const rectRecorte = nodo("rect", { x: 0, y: 0, width: 0, height: 0 }, recorte);
  const recortado = nodo("g", { "clip-path": "url(#dron-vp-levantamiento)" }, svg);
  const lienzo = nodo("g", {}, recortado);

  let foto: HTMLElement | null = null;
  let rect = new DOMRect();
  const grupos: SVGGElement[] = [];

  /** Puntos deterministas: al subir y volver a bajar, la nube se rehace igual. */
  function puntosDe(indice: number, w: number, h: number) {
    let s = indice * 9301 + 49297;
    const azar = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    const p = RUTA[indice];
    return Array.from({ length: 5 }, () => ({
      x: p.x * w + (azar() - 0.5) * (w / 4),
      y: p.y * h + (azar() - 0.5) * (h / 3),
    }));
  }

  function capturar(indice: number) {
    const w = rect.width / 3.2;
    const h = rect.height / 2.6;
    const p = RUTA[indice];
    const cx = p.x * rect.width;
    const cy = p.y * rect.height;

    const grupo = nodo("g", {}, lienzo);
    const huella = nodo(
      "rect",
      {
        x: cx - w / 2,
        y: cy - h / 2,
        width: w,
        height: h,
        fill: "rgba(255,85,0,0.06)",
        stroke: NARANJA,
        "stroke-width": 1,
      },
      grupo,
    );
    gsap.fromTo(huella, { opacity: 1 }, { opacity: 0.28, duration: 1.2, ease: "power2.out" });

    const destello = nodo(
      "rect",
      { x: cx - w / 2, y: cy - h / 2, width: w, height: h, fill: "#ffffff" },
      grupo,
    );
    gsap.fromTo(destello, { opacity: 0.4 }, { opacity: 0, duration: 0.3, onComplete: () => destello.remove() });

    for (const [k, punto] of puntosDe(indice, rect.width, rect.height).entries()) {
      const circulo = nodo("circle", { cx: punto.x, cy: punto.y, r: 1.6, fill: "#ffffff" }, grupo);
      gsap.fromTo(
        circulo,
        { opacity: 0, attr: { r: 4 } },
        { opacity: 0.9, attr: { r: 1.6 }, duration: 0.45, delay: 0.06 + k * 0.05, ease: "back.out(2)" },
      );
    }
    grupos.push(grupo);
  }

  function limpiar() {
    while (grupos.length) grupos.pop()?.remove();
  }

  return {
    entrar(c) {
      foto = c.el.querySelector<HTMLElement>("[data-servicios-foto]");
      gsap.to(svg, { opacity: 1, duration: 0.45, overwrite: true });
    },

    cuadro(c) {
      // Sin la foto (bajo 1024px está oculta) manda el guion.
      if (!foto || foto.offsetParent === null) return;
      rect = foto.getBoundingClientRect();
      const primero = RUTA[0];

      // Entrada: llega desde la franja de clientes y se instala sobre la
      // primera pasada. El punto de partida es el que deja el guion allá.
      if (c.progreso < ENTRADA) {
        const u = suave(c.progreso / ENTRADA);
        limpiar();
        return {
          x: entre(c.vista.w * 0.24, rect.left + primero.x * rect.width, u),
          y: entre(c.vista.h * 0.5, rect.top + primero.y * rect.height - 80, u),
          s: entre(0.4, 0.36, u),
          sensor: u * 0.6,
          objetivo: null,
          marcar: null,
        };
      }

      // Una pasada por servicio, al mismo ritmo que el relevo de la columna.
      const avance = clamp(0, 0.9999, (c.progreso - ENTRADA) / (0.94 - ENTRADA)) * PASADAS;
      const i = Math.floor(avance);
      const f = avance - i;
      const a = RUTA[i];
      const b = RUTA[Math.min(i + 1, PASADAS - 1)];
      // Se detiene sobre cada punto y recién después avanza al siguiente.
      const t = suave(clamp(0, 1, (f - 0.35) / 0.65));
      const nadir = {
        x: rect.left + entre(a.x, b.x, t) * rect.width,
        y: rect.top + entre(a.y, b.y, t) * rect.height,
      };

      // Las capturas siguen al scroll en los dos sentidos.
      const hechas = f > 0.12 ? i + 1 : i;
      while (grupos.length > hechas) grupos.pop()?.remove();
      while (grupos.length < hechas) capturar(grupos.length);

      // La retícula se recorta a la foto: en los puntos del borde se salía y
      // caía sobre el pie de imagen.
      const w = rect.width / 3.2;
      const h = rect.height / 2.6;
      const izq = Math.max(rect.left, nadir.x - w / 2);
      const arriba = Math.max(rect.top, nadir.y - h / 2);
      const der = Math.min(rect.right, nadir.x + w / 2);
      const abajo = Math.min(rect.bottom, nadir.y + h / 2);

      return {
        x: nadir.x,
        // Vuela sobre su huella, pero nunca tan arriba como para meterse en el
        // párrafo que está encima de la foto.
        y: Math.max(rect.top - 30, nadir.y - 80),
        s: 0.36,
        // El sensor late en cada captura: se apaga al desplazarse y se enciende
        // al detenerse sobre el punto.
        sensor: 0.45 + 0.55 * (1 - t),
        objetivo: new DOMRect(izq, arriba, der - izq, abajo - arriba),
        marcar: null,
      };
    },

    dibujar() {
      rectRecorte.setAttribute("x", String(rect.left));
      rectRecorte.setAttribute("y", String(rect.top));
      rectRecorte.setAttribute("width", String(rect.width));
      rectRecorte.setAttribute("height", String(rect.height));
      lienzo.setAttribute("transform", `translate(${rect.left} ${rect.top})`);
    },

    salir() {
      gsap.to(svg, { opacity: 0, duration: 0.35, overwrite: true });
    },

    destruir() {
      limpiar();
      svg.remove();
    },
  };
};

/* ------------------------------------------------------------------ */
/* 06 · Software: barrido de entrega y aterrizaje                      */
/* ------------------------------------------------------------------ */

export const accionesVistaPrevia: Record<string, FabricaAccion> = { servicios };
