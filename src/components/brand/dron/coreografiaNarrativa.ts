/**
 * Coreografía narrativa del dron.
 *
 * El dron recorre la página con un guion: cada sección marcada con
 * `data-dron-escena` tiene una lista de poses, y el progreso del scroll dentro
 * de esa sección dice en cuál está. El guion se inyecta (hoy, `guionInicio.ts`
 * en la portada), así que el mismo motor sirve para cualquier página.
 *
 * EL SCROLL MUEVE EL DESTINO, NO EL DRON
 * --------------------------------------
 * Esta es la decisión que da el carácter. Un `scrub` sobre la posición del
 * canvas —o escribir la posición directa desde el progreso— deja el dron
 * pegado a la rueda del mouse: se ve rígido, teletransportado, y cualquier
 * tirón del scroll se le nota. Acá el scroll mueve un DESTINO y el dron lo
 * persigue con el muelle de `./vuelo`:
 *
 *   · Llega y se asienta, con su propia inercia.
 *   · El alabeo y el cabeceo salen de la velocidad del propio dron: si
 *     acelera a la derecha, se inclina a la derecha.
 *   · Nunca está clavado: flota con una deriva suave que se aquieta mientras
 *     captura y se apaga cuando ya aterrizó.
 *
 * Es la misma física del dron acompañante de la portada, con otro guion.
 *
 * DOS CAPAS
 * ---------
 *   1. Poses del guion. El recorrido base y el respaldo.
 *   2. Acciones por sección (opcionales). Un módulo que cada cuadro puede
 *      corregir la pose contra el DOM real —el botón del navbar, la foto de
 *      servicios, las tarjetas de software— y dibujar sus propios efectos.
 *      Ver `accionesInicio.ts`.
 *
 * Si una sección está fijada con un ScrollTrigger de id `dron-<escena>`, el
 * progreso sale de ese disparador: el dron y la línea de tiempo de la sección
 * no pueden desfasarse.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Escena } from "./escena";
import { crearHaz } from "./haz";
import { crearMedidorScroll, crearPiloto } from "./vuelo";

gsap.registerPlugin(ScrollTrigger);

const { clamp, interpolate } = gsap.utils;

export interface Coreografia {
  destruir(): void;
}

/* ------------------------------------------------------------------ */
/* Tipos del guion                                                     */
/* ------------------------------------------------------------------ */

/** Geometría de la ventana y del contenedor de 1320px del sitio. */
export interface Vista {
  w: number;
  h: number;
  /** Borde izquierdo y ancho útil del `Contenedor`, para alinear con columnas. */
  izq: number;
  ancho: number;
}

/** Un número es fracción del ancho (x) o del alto (y) de la ventana. */
export type Medida = number | ((v: Vista) => number);

export interface Pose {
  /** Progreso de la sección en el que se alcanza esta pose, 0-1. */
  p: number;
  /** Centro del dron. */
  x: Medida;
  y: Medida;
  /** Escala respecto del lado máximo del canvas. */
  s: number;
  /** Opacidad. El dron sale de escena volando, y la opacidad solo lo termina. */
  o?: number;
  /** Encendido del sensor, 0-1. */
  sensor?: number;
}

/** Pose del guion ya resuelta a píxeles de ventana. */
export interface PoseResuelta {
  x: number;
  y: number;
  s: number;
  o: number;
  sensor: number;
}

export interface ObjetivoEnPantalla {
  el: HTMLElement;
  rect: DOMRect;
}

/** Lo que una acción puede leer en cada cuadro. */
export interface ContextoAccion {
  el: HTMLElement;
  vista: Vista;
  /** Lado del canvas en px CSS. La escala se aplica sobre él. */
  lado: number;
  dt: number;
  /** Segundos desde que el dron se montó. */
  reloj: number;
  /** Progreso de la sección, 0-1. */
  progreso: number;
  pose: PoseResuelta;
  /** Dónde está el dron ahora mismo, que no es lo mismo que su destino. */
  nave: { x: number; y: number };
  /** Rectángulo de la sección en la ventana. */
  rectEscena(): DOMRect;
  /** Los `data-dron-haz` de la sección, en la ventana y en orden de documento. */
  objetivos(): ObjetivoEnPantalla[];
  /** El `data-dron-haz` más cerca del centro de la ventana, si hay uno visible. */
  objetivoCentrado(): ObjetivoEnPantalla | null;
}

/** Correcciones que una acción devuelve. Lo que no se indica, lo decide el guion. */
export interface Orden {
  x?: number;
  y?: number;
  s?: number;
  o?: number;
  sensor?: number;
  /** Rectángulo al que apunta el haz. `null` = sin haz. */
  objetivo?: DOMRect | null;
  /** La línea de barrido recorre el ancho en vez del alto. */
  hazHorizontal?: boolean;
  /** Elemento que lleva `data-dron-escaneando`. `null` = ninguno. */
  marcar?: HTMLElement | null;
  /** Hacia dónde mira el morro, de -1 a 1. `null` = rumbo de vuelo. */
  mirarHacia?: number | null;
  /** Techo del régimen de los rotores, 0-1. Sirve para aterrizar y apagar. */
  regimen?: number;
}

export interface ContextoDibujo extends ContextoAccion {
  /** Punto del sensor del modelo, en la ventana. */
  sensorEnPantalla: { x: number; y: number };
  intensidadSensor: number;
}

export interface Accion {
  entrar?(c: ContextoAccion): void;
  cuadro?(c: ContextoAccion): Orden | void;
  /** Después de renderizar el dron: para efectos que salen del sensor. */
  dibujar?(c: ContextoDibujo): void;
  salir?(): void;
  destruir?(): void;
}

/** Recibe la capa del dron (fija, a pantalla completa) para montar sus efectos. */
export type FabricaAccion = (capa: HTMLElement) => Accion;

export interface Guion {
  /** Poses por nombre de escena, desde 1024px. */
  escritorio: Record<string, Pose[]>;
  /** Poses bajo 1024px. Si falta una escena, el dron se retira. */
  movil?: Record<string, Pose[]>;
  /** Acciones por escena. Solo en escritorio. */
  acciones?: Record<string, FabricaAccion>;
}

function resolver(m: Medida, total: number, v: Vista): number {
  return typeof m === "function" ? m(v) : m * total;
}

/** Pose interpolada con suavizado entre los dos fotogramas que rodean a `p`. */
function poseEn(guion: Pose[], p: number, v: Vista): PoseResuelta {
  let i = 0;
  while (i < guion.length - 2 && p > guion[i + 1].p) i++;
  const a = guion[i];
  const b = guion[Math.min(i + 1, guion.length - 1)];
  const tramo = b.p === a.p ? 1 : clamp(0, 1, (p - a.p) / (b.p - a.p));
  // Smoothstep: cada tramo arranca y termina con velocidad cero, así el dron
  // se detiene en cada parada en vez de cruzarla de largo.
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

interface Objetivo {
  el: HTMLElement;
  /** Rectángulo en coordenadas de documento. */
  left: number;
  top: number;
  ancho: number;
  alto: number;
}

interface EscenaDom {
  nombre: string;
  el: HTMLElement;
  objetivos: Objetivo[];
  /** Posición y alto en el documento, incluido el espaciador si está fijada. */
  top: number;
  alto: number;
}

export function crearCoreografiaNarrativa(
  capa: HTMLElement,
  escena: Escena,
  canvas: HTMLCanvasElement,
  guion: Guion,
): Coreografia {
  const rayo = crearHaz(capa);
  const medidor = crearMedidorScroll();

  const escenas: EscenaDom[] = Array.from(
    document.querySelectorAll<HTMLElement>("[data-dron-escena]"),
  ).map((el) => ({ nombre: el.dataset.dronEscena ?? "", el, objetivos: [], top: 0, alto: 0 }));

  let vista: Vista = { w: 1, h: 1, izq: 0, ancho: 1 };
  /** Lado máximo del canvas en px CSS. La escala de la pose se aplica sobre él. */
  let lado = 0;
  let escritorio = true;

  /**
   * Medición. Solo acá se lee layout de forma general: al cargar, al
   * redimensionar y en cada `refresh` de ScrollTrigger. Las acciones leen solo
   * lo de su sección, y solo mientras está activa.
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
      e.objetivos = Array.from(e.el.querySelectorAll<HTMLElement>("[data-dron-haz]"))
        .filter((el) => el.offsetParent !== null)
        .map((el) => {
          const o = el.getBoundingClientRect();
          return { el, left: o.left + window.scrollX, top: o.top + scroll, ancho: o.width, alto: o.height };
        });
    }
  }

  medir();
  ScrollTrigger.addEventListener("refresh", medir);
  window.addEventListener("resize", medir);
  window.addEventListener("load", medir);

  /* ---------------------------------------------------------------- */
  /* Estado                                                            */
  /* ---------------------------------------------------------------- */

  // Entra desde arriba, sobre el botón del navbar: el primer paso del guion.
  const piloto = crearPiloto({ x: vista.w * 0.88, y: -vista.h * 0.15 }, 3.6);
  const nave = piloto.nave;
  const estado = { escala: 0.26, opacidad: 1, sensor: 0 };
  let reloj = 0;

  /** Elemento que lleva hoy `data-dron-escaneando`. */
  let marcado: HTMLElement | null = null;
  function marcarEscaneo(el: HTMLElement | null) {
    if (marcado === el) return;
    if (marcado) delete marcado.dataset.dronEscaneando;
    marcado = el;
    if (el) el.dataset.dronEscaneando = "true";
  }

  const acciones = new Map<string, Accion>();
  function accionDe(nombre: string): Accion | undefined {
    const fabrica = guion.acciones?.[nombre];
    if (!fabrica) return undefined;
    let accion = acciones.get(nombre);
    if (!accion) {
      accion = fabrica(capa);
      acciones.set(nombre, accion);
    }
    return accion;
  }
  let accionVigente: Accion | undefined;

  function escenaActiva(scroll: number): EscenaDom | undefined {
    const linea = scroll + vista.h * 0.5;
    let activa: EscenaDom | undefined = escenas[0];
    for (const e of escenas) if (e.top <= linea) activa = e;
    return activa;
  }

  function objetivosEnPantalla(e: EscenaDom, scroll: number, fijada: boolean): ObjetivoEnPantalla[] {
    // En una sección fijada los elementos no se mueven con el scroll, así que
    // ahí se mide en vivo en vez de usar la medida de documento.
    return e.objetivos.map((o) => ({
      el: o.el,
      rect: fijada
        ? o.el.getBoundingClientRect()
        : new DOMRect(o.left - window.scrollX, o.top - scroll, o.ancho, o.alto),
    }));
  }

  function masCentrado(lista: ObjetivoEnPantalla[]): ObjetivoEnPantalla | null {
    const centro = vista.h * 0.5;
    let mejor: ObjetivoEnPantalla | null = null;
    let distancia = Infinity;
    for (const o of lista) {
      const cy = o.rect.top + o.rect.height / 2;
      if (cy < vista.h * 0.12 || cy > vista.h * 0.88) continue;
      const d = Math.abs(cy - centro);
      if (d < distancia) {
        distancia = d;
        mejor = o;
      }
    }
    return mejor;
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

    const scroll = window.scrollY;
    const velScroll = medidor.leer(dt);
    const activa = escenaActiva(scroll);
    if (!activa) return;

    const disparador = ScrollTrigger.getById(`dron-${activa.nombre}`);
    const progreso = disparador
      ? disparador.progress
      : clamp(0, 1, (scroll + vista.h * 0.5 - activa.top) / activa.alto);
    const poses = (escritorio ? guion.escritorio : guion.movil)?.[activa.nombre];
    // Sin guion para este ancho, el dron se retira donde está.
    const pose: PoseResuelta = poses
      ? poseEn(poses, progreso, vista)
      : { x: nave.x, y: nave.y, s: estado.escala, o: 0, sensor: 0 };

    const ctx: ContextoAccion = {
      el: activa.el,
      vista,
      lado,
      dt,
      reloj,
      progreso,
      pose,
      nave: { x: nave.x, y: nave.y },
      rectEscena: () => new DOMRect(0, activa.top - scroll, vista.w, activa.alto),
      objetivos: () => objetivosEnPantalla(activa, scroll, Boolean(disparador)),
      objetivoCentrado: () => masCentrado(objetivosEnPantalla(activa, scroll, Boolean(disparador))),
    };

    /* ---- Acción de la sección ---- */
    const accion = escritorio ? accionDe(activa.nombre) : undefined;
    if (accion !== accionVigente) {
      accionVigente?.salir?.();
      accionVigente = accion;
      accion?.entrar?.(ctx);
    }
    const orden: Orden = accion?.cuadro?.(ctx) ?? {};

    const destino = { x: orden.x ?? pose.x, y: orden.y ?? pose.y };
    const sensorDeseado = orden.sensor ?? pose.sensor;

    const suave = 1 - Math.exp(-dt * 3.6);
    estado.escala += ((orden.s ?? pose.s) - estado.escala) * suave;
    estado.opacidad += ((orden.o ?? pose.o) - estado.opacidad) * (1 - Math.exp(-dt * 4.5));
    estado.sensor += (sensorDeseado - estado.sensor) * (1 - Math.exp(-dt * 6));

    /* ---- Sensor ---- */
    let objetivo: DOMRect | null;
    let paraMarcar: HTMLElement | null;
    if (orden.objetivo !== undefined) {
      objetivo = estado.sensor > 0.02 ? orden.objetivo : null;
      paraMarcar = orden.marcar ?? null;
    } else {
      const apuntado = estado.sensor > 0.02 && activa.objetivos.length ? ctx.objetivoCentrado() : null;
      objetivo = apuntado?.rect ?? null;
      paraMarcar = apuntado && sensorDeseado > 0.5 ? apuntado.el : null;
    }
    if (orden.marcar !== undefined) paraMarcar = orden.marcar;
    marcarEscaneo(paraMarcar);

    // Deriva propia: el dron nunca está clavado. Se aquieta mientras captura y
    // se apaga del todo cuando ya aterrizó (regimen 0).
    const deriva = (1 - estado.sensor * 0.6) * clamp(0, 1, (orden.regimen ?? 1) * 1.4);
    destino.x += (Math.sin(reloj * 0.37) * 11 + Math.sin(reloj * 0.91 + 1.3) * 4) * deriva;
    destino.y += (Math.sin(reloj * 0.53 + 2.1) * 8 + Math.sin(reloj * 1.27) * 3) * deriva;

    const postura = piloto.volar(dt, destino, {
      velScroll,
      mirarHacia: objetivo
        ? (objetivo.left + objetivo.width / 2 - nave.x) / 160
        : (orden.mirarHacia ?? null),
      mirada: estado.sensor * 0.18,
      sensor: estado.sensor,
    });
    // El aterrizaje manda sobre el régimen: nunca más vueltas de las que
    // corresponde a la altura de la maniobra.
    if (orden.regimen !== undefined) postura.regimen = Math.min(postura.regimen, orden.regimen);

    // Transform + opacidad: el canvas se compone en GPU, sin layout.
    canvas.style.transform = `translate3d(${nave.x - lado / 2}px, ${nave.y - lado / 2}px, 0) scale(${estado.escala})`;
    canvas.style.opacity = String(clamp(0, 1, estado.opacidad));

    // Fuera de escena no se renderiza: la GPU descansa.
    if (estado.opacidad < 0.01) {
      rayo.ocultar();
      return;
    }

    escena.setPostura(postura);
    escena.render(dt);

    const necesitaSensor = Boolean(objetivo) || Boolean(accion?.dibujar);
    const puntoSensor = necesitaSensor ? escena.puntoSensor() : null;
    const sensorEnPantalla = puntoSensor
      ? {
          x: nave.x + (puntoSensor.x - lado / 2) * estado.escala,
          y: nave.y + (puntoSensor.y - lado / 2) * estado.escala,
        }
      : { x: nave.x, y: nave.y };

    if (objetivo) {
      rayo.dibujar(
        sensorEnPantalla,
        objetivo,
        { haz: estado.sensor, reticula: estado.sensor, barrido: estado.sensor },
        0.5 - Math.cos(reloj * 2.2) * 0.5,
        orden.hazHorizontal,
      );
    } else {
      rayo.ocultar();
    }

    accion?.dibujar?.({ ...ctx, sensorEnPantalla, intensidadSensor: estado.sensor });
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
      marcarEscaneo(null);
      accionVigente?.salir?.();
      acciones.forEach((a) => a.destruir?.());
      ScrollTrigger.removeEventListener("refresh", medir);
      window.removeEventListener("resize", medir);
      window.removeEventListener("load", medir);
      document.removeEventListener("visibilitychange", alCambiarVisibilidad);
      rayo.destruir();
    },
  };
}
