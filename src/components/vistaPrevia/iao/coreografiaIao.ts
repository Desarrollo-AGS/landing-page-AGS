/**
 * Coreografía narrativa del dron · /nosotros/brochure.
 *
 * En la portada el dron acompaña la lectura; acá es protagonista. Cada
 * capítulo marcado con `data-dron-escena` declara una pose, y el scroll
 * controla por dónde va el dron dentro de esa pose.
 *
 * QUÉ SE REUTILIZA
 * ----------------
 * La escena (modelo, luces, materiales, rotores) es `./escena`, sin cambios.
 * El vuelo es el piloto de `./vuelo` y el haz del sensor es `./haz`: los mismos
 * que usa el acompañante. Lo único propio de este archivo es de dónde sale el
 * destino, que acá es un guion por capítulo en vez de un titular.
 *
 * POR QUÉ UN GUION Y NO UN TWEEN
 * ------------------------------
 * Un `scrub` de GSAP sobre la posición del canvas movería el dron rígido,
 * pegado a la rueda del mouse. Acá el scroll mueve el DESTINO y el piloto lo
 * persigue con su muelle, así que el dron alabea al acelerar, se adelanta al
 * frenar y llega, que es lo que lo hace leer como aeronave.
 *
 * El progreso de cada capítulo fijado sale de su propio ScrollTrigger
 * (`iao-<escena>`, creado en `components/brochure/animaciones.ts`), así que el
 * dron y la línea de tiempo del capítulo nunca se desfasan.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Escena } from "@/components/brand/dron/escena";
import { crearHaz } from "@/components/brand/dron/haz";
import { crearMedidorScroll, crearPiloto } from "@/components/brand/dron/vuelo";

gsap.registerPlugin(ScrollTrigger);

const { clamp, interpolate } = gsap.utils;

export interface Coreografia {
  destruir(): void;
}

/* ------------------------------------------------------------------ */
/* Guion                                                               */
/* ------------------------------------------------------------------ */

/** Geometría de la ventana y del contenedor de 1320px del sitio. */
interface Vista {
  w: number;
  h: number;
  /** Borde izquierdo y ancho útil del `Contenedor`, para alinear con columnas. */
  izq: number;
  ancho: number;
}

type Medida = number | ((v: Vista) => number);

interface Pose {
  /** Progreso del capítulo en el que se alcanza esta pose, 0-1. */
  p: number;
  /** Centro del dron en px. Un número entre -1 y 2 es fracción del ancho/alto. */
  x: Medida;
  y: Medida;
  /** Escala respecto del lado máximo del canvas. */
  s: number;
  /** Opacidad. El dron sale de escena volando, y la opacidad solo lo termina. */
  o?: number;
  /** Encendido del sensor, 0-1. Apunta al `[data-dron-haz]` del capítulo. */
  sensor?: number;
}

/** Centro de la columna `i` de `n` dentro del contenedor. */
const columna =
  (i: number, n: number) =>
  (v: Vista): number =>
    v.izq + (v.ancho * (i + 0.5)) / n;

const FUERA_DERECHA = 1.25;

/**
 * Escritorio. Los progresos están alineados con las líneas de tiempo de
 * `animaciones.ts`; si se cambia una duración allá, se revisa acá.
 */
const GUION_ESCRITORIO: Record<string, Pose[]> = {
  // Portada: el progreso arranca en 0,5 (se mide contra el centro de la
  // ventana). Flota a la derecha del titular y, al salir, toma altura.
  portada: [
    { p: 0.5, x: 0.7, y: 0.5, s: 1 },
    { p: 1, x: 0.86, y: 0.22, s: 0.62 },
  ],
  // El desafío se cuenta sin dron. Aparece recién cuando se revela la
  // fotografía: el dron llega como la solución.
  desafio: [
    { p: 0, x: FUERA_DERECHA, y: 0.2, s: 0.6, o: 0 },
    { p: 0.52, x: FUERA_DERECHA, y: 0.3, s: 0.7, o: 0 },
    { p: 0.56, x: FUERA_DERECHA, y: 0.3, s: 0.7, o: 1 },
    { p: 0.8, x: 0.72, y: 0.4, s: 0.82, o: 1 },
    { p: 1, x: 0.7, y: 0.36, s: 0.78, o: 1 },
  ],
  // La operación: recorre las cuatro etapas sobre el riel. En Capturar
  // despliega el sensor sobre la etapa; en las otras avanza y se detiene.
  operacion: [
    { p: 0, x: columna(0, 4), y: 0.4, s: 0.58, sensor: 0 },
    { p: 0.05, x: columna(0, 4), y: 0.4, s: 0.58, sensor: 1 },
    { p: 0.2, x: columna(0, 4), y: 0.4, s: 0.58, sensor: 1 },
    { p: 0.26, x: columna(0.3, 4), y: 0.4, s: 0.58, sensor: 0 },
    { p: 0.38, x: columna(1, 4), y: 0.38, s: 0.56 },
    { p: 0.48, x: columna(1, 4), y: 0.38, s: 0.56 },
    { p: 0.62, x: columna(2, 4), y: 0.36, s: 0.54 },
    { p: 0.72, x: columna(2, 4), y: 0.36, s: 0.54 },
    { p: 0.88, x: columna(3, 4), y: 0.34, s: 0.52 },
    { p: 1, x: columna(3, 4), y: 0.3, s: 0.5 },
  ],
  // Lo que hacemos: el dron cede la pantalla a las operaciones.
  capacidades: [
    { p: 0, x: FUERA_DERECHA, y: 0.1, s: 0.4, o: 0 },
    { p: 1, x: FUERA_DERECHA, y: 0.1, s: 0.4, o: 0 },
  ],
  // Del vuelo al dato: vuelve, captura sobre la etapa "Captura" y, a medida que
  // el dato sube a la plataforma, se aleja y deja la escena a las capas.
  // La altura (0,6) deja el dron entre la bajada y el riel: más arriba tapa el
  // párrafo, más abajo el haz no tiene recorrido.
  vuelo: [
    { p: 0, x: columna(0.2, 6), y: 0.6, s: 0.42, o: 1, sensor: 0 },
    { p: 0.06, x: columna(1, 6), y: 0.6, s: 0.42, o: 1, sensor: 0 },
    { p: 0.12, x: columna(1, 6), y: 0.6, s: 0.42, o: 1, sensor: 1 },
    { p: 0.32, x: columna(1, 6), y: 0.6, s: 0.42, o: 1, sensor: 1 },
    { p: 0.38, x: columna(1.8, 6), y: 0.5, s: 0.42, o: 1, sensor: 0 },
    { p: 0.66, x: columna(3.2, 6), y: 0.2, s: 0.34, o: 1 },
    { p: 0.84, x: 0.62, y: -0.1, s: 0.22, o: 0 },
    { p: 1, x: 0.62, y: -0.1, s: 0.22, o: 0 },
  ],
  casos: [
    { p: 0, x: FUERA_DERECHA, y: 0.1, s: 0.3, o: 0 },
    { p: 1, x: FUERA_DERECHA, y: 0.1, s: 0.3, o: 0 },
  ],
  resultados: [
    { p: 0, x: 0.8, y: 1.25, s: 0.6, o: 0 },
    { p: 1, x: 0.8, y: 1.25, s: 0.6, o: 0 },
  ],
  // Cierre: sube desde abajo, se queda sobre la frase y se aleja. La frase
  // queda sola.
  cierre: [
    { p: 0, x: 0.78, y: 0.9, s: 0.8, o: 1 },
    { p: 0.25, x: 0.76, y: 0.42, s: 0.8, o: 1 },
    { p: 0.55, x: 0.8, y: 0.3, s: 0.6, o: 1 },
    { p: 0.85, x: 1.08, y: -0.05, s: 0.24, o: 1 },
    { p: 0.95, x: 1.15, y: -0.12, s: 0.2, o: 0 },
    { p: 1, x: 1.15, y: -0.12, s: 0.2, o: 0 },
  ],
};

/**
 * Móvil. La narrativa no es la de escritorio reducida: el dron solo aparece
 * donde tiene aire para volar sin tapar texto (portada, operación fijada y
 * cierre). En el resto el texto manda.
 */
const GUION_MOVIL: Record<string, Pose[]> = {
  portada: [
    { p: 0.5, x: 0.56, y: 0.3, s: 1 },
    { p: 1, x: 0.8, y: 0.08, s: 0.6 },
  ],
  desafio: [
    { p: 0, x: FUERA_DERECHA, y: 0.1, s: 0.6, o: 0 },
    { p: 1, x: FUERA_DERECHA, y: 0.1, s: 0.6, o: 0 },
  ],
  // Entre el titular (arriba) y la etapa (abajo). A 0,38 rozaba el titular.
  operacion: [
    { p: 0, x: 0.3, y: 0.47, s: 0.78, sensor: 0 },
    { p: 0.05, x: 0.3, y: 0.47, s: 0.78, sensor: 1 },
    { p: 0.2, x: 0.3, y: 0.47, s: 0.78, sensor: 1 },
    { p: 0.3, x: 0.45, y: 0.46, s: 0.76, sensor: 0 },
    { p: 0.6, x: 0.6, y: 0.45, s: 0.74 },
    { p: 1, x: 0.7, y: 0.44, s: 0.7 },
  ],
  capacidades: [
    { p: 0, x: FUERA_DERECHA, y: 0.1, s: 0.5, o: 0 },
    { p: 1, x: FUERA_DERECHA, y: 0.1, s: 0.5, o: 0 },
  ],
  vuelo: [
    { p: 0, x: FUERA_DERECHA, y: 0.1, s: 0.5, o: 0 },
    { p: 1, x: FUERA_DERECHA, y: 0.1, s: 0.5, o: 0 },
  ],
  casos: [
    { p: 0, x: FUERA_DERECHA, y: 0.1, s: 0.5, o: 0 },
    { p: 1, x: FUERA_DERECHA, y: 0.1, s: 0.5, o: 0 },
  ],
  resultados: [
    { p: 0, x: 0.5, y: 1.3, s: 0.7, o: 0 },
    { p: 1, x: 0.5, y: 1.3, s: 0.7, o: 0 },
  ],
  cierre: [
    { p: 0, x: 0.5, y: 1.1, s: 0.8, o: 1 },
    { p: 0.35, x: 0.58, y: 0.26, s: 0.8, o: 1 },
    { p: 0.7, x: 0.9, y: -0.02, s: 0.3, o: 1 },
    { p: 0.8, x: 1.1, y: -0.1, s: 0.2, o: 0 },
    { p: 1, x: 1.1, y: -0.1, s: 0.2, o: 0 },
  ],
};

function resolver(m: Medida, total: number, v: Vista): number {
  return typeof m === "function" ? m(v) : m * total;
}

/** Pose interpolada con suavizado entre los dos fotogramas que rodean a `p`. */
function poseEn(guion: Pose[], p: number, v: Vista) {
  let i = 0;
  while (i < guion.length - 2 && p > guion[i + 1].p) i++;
  const a = guion[i];
  const b = guion[Math.min(i + 1, guion.length - 1)];
  const tramo = b.p === a.p ? 1 : clamp(0, 1, (p - a.p) / (b.p - a.p));
  // Smoothstep: cada tramo arranca y termina con velocidad cero, así el dron
  // se detiene en cada etapa en vez de cruzarla de largo.
  const t = tramo * tramo * (3 - 2 * tramo);
  return {
    x: interpolate(resolver(a.x, v.w, v), resolver(b.x, v.w, v), t),
    y: interpolate(resolver(a.y, v.h, v), resolver(b.y, v.h, v), t),
    s: interpolate(a.s, b.s, t),
    o: interpolate(a.o ?? 1, b.o ?? 1, t),
    sensor: interpolate(a.sensor ?? 0, b.sensor ?? 0, t),
  };
}

/* ------------------------------------------------------------------ */
/* Coreografía                                                         */
/* ------------------------------------------------------------------ */

interface EscenaDom {
  nombre: string;
  el: HTMLElement;
  /** Elemento sobre el que apunta el sensor en este capítulo, si hay. */
  haz: HTMLElement | null;
  /** Posición y alto en el documento, incluido el espaciador si está fijada. */
  top: number;
  alto: number;
}

export function crearCoreografiaNarrativa(
  capa: HTMLElement,
  escena: Escena,
  canvas: HTMLCanvasElement,
): Coreografia {
  const rayo = crearHaz(capa);
  const medidor = crearMedidorScroll();

  const escenas: EscenaDom[] = Array.from(
    document.querySelectorAll<HTMLElement>("[data-dron-escena]"),
  ).map((el) => ({ nombre: el.dataset.dronEscena ?? "", el, haz: null, top: 0, alto: 0 }));

  let vista: Vista = { w: 1, h: 1, izq: 0, ancho: 1 };
  /** Lado máximo del canvas en px CSS. La escala de la pose se aplica sobre él. */
  let lado = 0;
  let escritorio = true;

  /**
   * Medición. Solo acá se lee layout: al cargar, al redimensionar y en cada
   * `refresh` de ScrollTrigger, que es cuando los capítulos fijados cambian
   * de alto. El bucle trabaja con estos números.
   */
  function medir() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    escritorio = w >= 1024;
    const util = Math.min(w, 1320);
    const canaleta = w >= 640 ? 32 : 20;
    vista = { w, h, izq: (w - util) / 2 + canaleta, ancho: util - canaleta * 2 };

    // El canvas se renderiza al tamaño máximo y se reduce con `scale`: nunca
    // se amplía un bitmap chico, que es lo que se vería pixelado.
    const nuevoLado = Math.round(
      escritorio ? clamp(440, 700, Math.min(w * 0.44, h * 0.8)) : clamp(260, 420, w * 0.86),
    );
    if (nuevoLado !== lado) {
      lado = nuevoLado;
      canvas.style.width = `${lado}px`;
      canvas.style.height = `${lado}px`;
      escena.resize();
    }

    const scroll = window.scrollY;
    for (const e of escenas) {
      const caja = e.el.parentElement?.classList.contains("pin-spacer") ? e.el.parentElement : e.el;
      const r = caja.getBoundingClientRect();
      e.top = r.top + scroll;
      e.alto = Math.max(1, r.height);
      e.haz =
        Array.from(e.el.querySelectorAll<HTMLElement>("[data-dron-haz]")).find(
          (el) => el.offsetParent !== null,
        ) ?? null;
    }
  }

  medir();
  ScrollTrigger.addEventListener("refresh", medir);
  window.addEventListener("resize", medir);

  /* ---------------------------------------------------------------- */
  /* Estado                                                            */
  /* ---------------------------------------------------------------- */

  // Entra desde abajo a la derecha, fuera de pantalla: llega volando.
  const piloto = crearPiloto({ x: vista.w + lado * 0.6, y: vista.h * 0.85 }, 3.6);
  const nave = piloto.nave;
  const estado = { escala: 0.8, opacidad: 1, sensor: 0 };
  let reloj = 0;

  function escenaActiva(scroll: number): EscenaDom | undefined {
    const linea = scroll + vista.h * 0.5;
    let activa: EscenaDom | undefined = escenas[0];
    for (const e of escenas) if (e.top <= linea) activa = e;
    return activa;
  }

  function progresoDe(e: EscenaDom, scroll: number): number {
    const disparador = ScrollTrigger.getById(`iao-${e.nombre}`);
    if (disparador) return disparador.progress;
    return clamp(0, 1, (scroll + vista.h * 0.5 - e.top) / e.alto);
  }

  /* ---------------------------------------------------------------- */
  /* Bucle                                                             */
  /* ---------------------------------------------------------------- */

  let ultimo = performance.now();
  let visible = document.visibilityState === "visible";

  function ticker() {
    if (!visible) return;
    const ahora = performance.now();
    const dt = Math.min((ahora - ultimo) / 1000, 0.05);
    ultimo = ahora;
    reloj += dt;

    // Lecturas primero, escrituras después.
    const scroll = window.scrollY;
    const velScroll = medidor.leer(dt);
    const activa = escenaActiva(scroll);
    if (!activa) return;

    const guion = (escritorio ? GUION_ESCRITORIO : GUION_MOVIL)[activa.nombre];
    if (!guion) return;
    const pose = poseEn(guion, progresoDe(activa, scroll), vista);

    const suave = 1 - Math.exp(-dt * 3.6);
    estado.escala += (pose.s - estado.escala) * suave;
    estado.opacidad += (pose.o - estado.opacidad) * (1 - Math.exp(-dt * 4.5));
    estado.sensor += (pose.sensor - estado.sensor) * (1 - Math.exp(-dt * 6));

    const objetivo = estado.sensor > 0.02 && activa.haz ? activa.haz.getBoundingClientRect() : null;

    const postura = piloto.volar(
      dt,
      { x: pose.x, y: pose.y + Math.sin(reloj * 0.8) * 6 },
      {
        velScroll,
        mirarHacia: objetivo ? (objetivo.left + objetivo.width / 2 - nave.x) / 160 : null,
        mirada: estado.sensor * 0.18,
        sensor: estado.sensor,
      },
    );

    // Transform + opacidad: el canvas se compone en GPU, sin layout.
    canvas.style.transform = `translate3d(${nave.x - lado / 2}px, ${nave.y - lado / 2}px, 0) scale(${estado.escala})`;
    canvas.style.opacity = String(clamp(0, 1, estado.opacidad));

    // Fuera de escena no se renderiza: la GPU descansa mientras se leen los
    // casos o las capacidades.
    if (estado.opacidad < 0.01) {
      rayo.ocultar();
      return;
    }

    escena.setPostura(postura);
    escena.render(dt);

    if (objetivo) {
      const sensor = escena.puntoSensor();
      rayo.dibujar(
        {
          x: nave.x + (sensor.x - lado / 2) * estado.escala,
          y: nave.y + (sensor.y - lado / 2) * estado.escala,
        },
        objetivo,
        { haz: estado.sensor, reticula: estado.sensor, barrido: estado.sensor },
        0.5 - Math.cos(reloj * 2.2) * 0.5,
      );
    } else {
      rayo.ocultar();
    }
  }

  gsap.ticker.add(ticker);

  function alCambiarVisibilidad() {
    visible = document.visibilityState === "visible";
    if (visible) ultimo = performance.now();
  }
  document.addEventListener("visibilitychange", alCambiarVisibilidad);

  return {
    destruir() {
      gsap.ticker.remove(ticker);
      medidor.destruir();
      ScrollTrigger.removeEventListener("refresh", medir);
      window.removeEventListener("resize", medir);
      document.removeEventListener("visibilitychange", alCambiarVisibilidad);
      rayo.destruir();
    },
  };
}
