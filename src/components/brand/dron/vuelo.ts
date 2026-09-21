/**
 * Física de vuelo del dron, compartida por las dos coreografías.
 *
 * Cada coreografía decide A DÓNDE va el dron (el acompañante, al titular que
 * inspecciona; la narrativa del brochure, a la pose del capítulo). Cómo llega
 * es igual para las dos, y vive acá:
 *
 *   · Un muelle críticamente amortiguado persigue el destino. `1 - e^(-k·dt)`
 *     da un acercamiento suave e independiente de los fps, a diferencia de un
 *     lerp con factor fijo, que va más rápido en pantallas de 120Hz.
 *   · El alabeo y el cabeceo salen de la velocidad del propio dron y de la del
 *     scroll, no de una animación aparte: si acelera hacia la derecha se
 *     inclina a la derecha, y al bajar rápido adelanta y baja el morro.
 *   · El rumbo se suaviza: al cambiar de objetivo el dron gira, no salta.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Postura } from "./escena";

gsap.registerPlugin(ScrollTrigger);

const { clamp } = gsap.utils;

/**
 * Cuánto se asoma el morro hacia la cámara, respecto de lo que apunta hacia
 * los lados. Con 0,72 el dron queda en tres cuartos: nunca de perfil puro ni
 * de frente.
 *
 * El morro del modelo es su eje local +X. Con guiñada θ apunta en pantalla
 * hacia (cos θ, −sin θ) en (derecha, hacia la cámara), así que el rumbo sale
 * de `atan2(−ASOMO, lado)`, con lado +1 a la derecha y −1 a la izquierda.
 * Queda siempre dentro de (−π, 0) y el giro nunca cruza por la espalda.
 */
const ASOMO = 0.72;
const RUMBO_CRUCERO = Math.atan2(-ASOMO, 1);

/* ------------------------------------------------------------------ */
/* Velocidad del scroll                                                */
/* ------------------------------------------------------------------ */

export interface MedidorScroll {
  /** Velocidad del scroll suavizada, en px/s. Se llama una vez por cuadro. */
  leer(dt: number): number;
  destruir(): void;
}

/**
 * Un único disparador que cubre el documento entero, solo para leer la
 * velocidad del scroll. `getVelocity` es un método de instancia y no
 * estático, así que hace falta una instancia aunque no se use para nada más.
 */
export function crearMedidorScroll(): MedidorScroll {
  let medida = 0;
  let instante = 0;
  let suavizada = 0;

  const disparador = ScrollTrigger.create({
    trigger: document.documentElement,
    start: 0,
    end: "max",
    onUpdate: (self) => {
      medida = self.getVelocity();
      instante = performance.now();
    },
  });

  return {
    leer(dt) {
      // `getVelocity` solo se actualiza mientras el scroll se mueve: si dejó de
      // llegar hace más de 90ms, la velocidad real es cero y hay que dejarla
      // decaer, o el dron se quedaría adelantado para siempre.
      const fresca = performance.now() - instante < 90;
      const cruda = fresca ? clamp(-3000, 3000, medida) : 0;
      suavizada += (cruda - suavizada) * Math.min(1, dt * 4.5);
      return suavizada;
    },
    destruir() {
      disparador.kill();
    },
  };
}

/* ------------------------------------------------------------------ */
/* Piloto                                                              */
/* ------------------------------------------------------------------ */

export interface Nave {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export interface OrdenVuelo {
  /** Velocidad del scroll, de `MedidorScroll.leer`. */
  velScroll: number;
  /**
   * Hacia dónde mira el morro. `null` = sigue el rumbo de vuelo. Un número
   * entre −1 (izquierda) y 1 (derecha) = apunta a un objetivo.
   */
  mirarHacia: number | null;
  /** Radianes extra de morro abajo, mientras el sensor apunta a algo. */
  mirada: number;
  /** 0 = sensor apagado, 1 = inspeccionando. */
  sensor: number;
}

export interface Piloto {
  readonly nave: Nave;
  /** Acerca la nave al destino y devuelve la actitud que resulta del vuelo. */
  volar(dt: number, destino: { x: number; y: number }, orden: OrdenVuelo): Postura;
}

export function crearPiloto(inicio: { x: number; y: number }, rigidez = 5.2): Piloto {
  const nave: Nave = { x: inicio.x, y: inicio.y, vx: 0, vy: 0 };
  let rumbo = RUMBO_CRUCERO;

  return {
    nave,

    volar(dt, destino, { velScroll, mirarHacia, mirada, sensor }) {
      const k = 1 - Math.exp(-dt * rigidez);
      const dx = (destino.x - nave.x) * k;
      const dy = (destino.y - nave.y) * k;

      nave.x += dx;
      nave.y += dy;

      // Velocidad suavizada: es lo que alimenta la actitud de vuelo.
      nave.vx += (dx / Math.max(dt, 0.001) - nave.vx) * Math.min(1, dt * 8);
      nave.vy += (dy / Math.max(dt, 0.001) - nave.vy) * Math.min(1, dt * 8);

      // El giro local en Z es el eje lateral del dron: además de inclinarlo al
      // desplazarse, es lo que baja el morro hacia lo que inspecciona.
      const alabeo = clamp(-0.55, 0.42, -nave.vx * 0.0012 - mirada);
      const cabeceo = clamp(-0.3, 0.3, nave.vy * 0.0006 + velScroll * 0.00004);

      const rumboDeseado =
        mirarHacia === null
          ? RUMBO_CRUCERO + clamp(-0.5, 0.5, nave.vx * 0.0009)
          : Math.atan2(-ASOMO, clamp(-1, 1, mirarHacia));
      rumbo += (rumboDeseado - rumbo) * (1 - Math.exp(-dt * 3.2));

      return {
        alabeo,
        cabeceo,
        guinada: rumbo,
        regimen: clamp(0.35, 1, Math.hypot(nave.vx, nave.vy) / 700 + 0.4),
        sensor,
      };
    },
  };
}
