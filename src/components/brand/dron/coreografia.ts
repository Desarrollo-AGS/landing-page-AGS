/**
 * Coreografía del dron acompañante.
 *
 * El dron recorre la portada junto al lector: navega por el margen mientras se
 * lee y, al llegar a cada titular marcado con `data-dron-objetivo`, se
 * aproxima, despliega el sensor y hace una pasada de inspección sobre el
 * texto.
 *
 * CÓMO ESTÁ ARMADO
 * ----------------
 * GSAP se ocupa de lo que es coreografía —entrada, encendido del sensor, la
 * línea de tiempo del barrido, y ScrollTrigger para saber en qué sección va el
 * lector— y un muelle en el ticker se ocupa del vuelo.
 *
 * El vuelo NO es un tween. Un tween a una posición fija se rompe apenas la
 * página se mueve, porque el titular objetivo se desplaza bajo el dron
 * mientras se scrollea. En vez de eso, cada cuadro se recalcula el destino
 * desde el rectángulo del titular y el dron persigue ese punto con un muelle
 * críticamente amortiguado. Eso es lo que hace que se lea como una aeronave
 * manteniendo posición sobre un objetivo, y no como una imagen deslizándose.
 *
 * El alabeo y el cabeceo salen de la velocidad del propio dron y de la del
 * scroll, no de una animación aparte: si acelera hacia la derecha se inclina a
 * la derecha, y al bajar rápido se adelanta y baja el morro. Es la física la
 * que da el carácter.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Escena } from "./escena";

gsap.registerPlugin(ScrollTrigger);

const NS = "http://www.w3.org/2000/svg";

/** Lado del canvas del dron, en píxeles CSS. */
const LADO = 260;

/**
 * Línea por debajo de la cual tiene que quedar el fuselaje.
 *
 * La barra superior mide 36px y el navbar 68px, y el navbar es pegajoso, así
 * que el dron pasaría por detrás y se vería cortado. No se limita la caja
 * entera del canvas sino el fuselaje, que ocupa el tercio central: por eso el
 * margen es LADO*0,26 y no LADO/2, que empujaría el dron muy abajo.
 */
const TECHO = 104 + LADO * 0.26;

export interface Coreografia {
  destruir(): void;
}

interface Estado {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

/** Rectángulo en coordenadas del DOCUMENTO, no de la ventana. */
interface RectDoc {
  left: number;
  top: number;
  width: number;
  height: number;
}

function medir(el: HTMLElement): RectDoc {
  const r = el.getBoundingClientRect();
  return {
    left: r.left + window.scrollX,
    top: r.top + window.scrollY,
    width: r.width,
    height: r.height,
  };
}

export function crearCoreografia(
  capa: HTMLElement,
  escena: Escena,
  canvas: HTMLElement,
): Coreografia {
  // El canvas se dimensiona acá y no en el componente, para que LADO sea el
  // único sitio donde vive esa medida: la posición del dron se calcula a
  // partir de ella y las dos cosas no pueden discrepar.
  canvas.style.width = `${LADO}px`;
  canvas.style.height = `${LADO}px`;
  escena.resize();

  /* ---------------------------------------------------------------- */
  /* Capa de dibujo: haz del sensor y retícula sobre el titular         */
  /* ---------------------------------------------------------------- */

  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("class", "absolute inset-0 h-full w-full");
  svg.setAttribute("aria-hidden", "true");

  const haz = document.createElementNS(NS, "path");
  haz.setAttribute("fill", "url(#dron-haz)");
  haz.setAttribute("opacity", "0");

  const defs = document.createElementNS(NS, "defs");
  defs.innerHTML = `
    <linearGradient id="dron-haz" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ff5500" stop-opacity="0.30" />
      <stop offset="60%" stop-color="#ff5500" stop-opacity="0.09" />
      <stop offset="100%" stop-color="#ff5500" stop-opacity="0.015" />
    </linearGradient>`;

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

  svg.append(defs, haz, reticula, barrido);
  capa.append(svg);

  /* ---------------------------------------------------------------- */
  /* Estado                                                            */
  /* ---------------------------------------------------------------- */

  const nave: Estado = {
    x: window.innerWidth + LADO,
    y: window.innerHeight * 0.34,
    vx: 0,
    vy: 0,
  };

  /** Valores que anima GSAP. Se leen en el ticker y se aplican al dibujo. */
  const efectos = { haz: 0, reticula: 0, barrido: 0, sensor: 0 };
  /** Posición de la línea de barrido dentro del titular, de 0 a 1. */
  const pasada = { p: 0 };

  let objetivo: HTMLElement | null = null;
  /** Medida del titular activo, en coordenadas de documento. */
  let rectDoc: RectDoc | null = null;
  let tlInspeccion: gsap.core.Timeline | null = null;

  /**
   * Velocidad de scroll suavizada, en px/s.
   *
   * Es lo que hace que el dron se sienta volando junto al lector y no pegado
   * al margen: al bajar rápido se adelanta hacia abajo y baja el morro, al
   * frenar se recupera.
   */
  let velScroll = 0;
  let velMedida = 0;
  let instanteMedida = 0;

  /** Desplazamiento vertical del cuadro en curso. Se lee una sola vez. */
  let scrollActual = 0;

  /** Pasa un rectángulo de coordenadas de documento a coordenadas de ventana. */
  const enPantalla = (r: RectDoc): DOMRect =>
    new DOMRect(r.left - window.scrollX, r.top - scrollActual, r.width, r.height);

  /* ---------------------------------------------------------------- */
  /* Poses                                                             */
  /* ---------------------------------------------------------------- */

  /** Dónde vuela cuando no está inspeccionando nada: margen derecho. */
  function poseCrucero() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    // Se adelanta hasta 110px en el sentido del scroll, y se arrima un poco al
    // borde al acelerar, como una aeronave que toma rumbo.
    const adelanto = gsap.utils.clamp(-110, 110, velScroll * 0.055);
    return {
      x: vw - LADO * 0.78 + gsap.utils.clamp(-26, 26, Math.abs(velScroll) * 0.012),
      y: gsap.utils.clamp(TECHO, vh - LADO * 0.35, vh * 0.36 + adelanto),
    };
  }

  /**
   * Dónde se planta para inspeccionar un titular.
   *
   * Se coloca arriba y a la derecha del texto, nunca encima: el titular tiene
   * que seguir siendo legible mientras el dron lo escanea. Si el titular llega
   * muy a la derecha, el dron pasa al otro lado en vez de salirse de pantalla.
   */
  function poseInspeccion(r: DOMRect) {
    const vw = window.innerWidth;
    const centroX = r.left + Math.min(r.width, 560) * 0.62;
    const porLaDerecha = centroX + LADO * 0.5 + 40 < vw;

    const x = porLaDerecha ? centroX + 70 : centroX - LADO * 0.66;
    // El fuselaje se queda ~115px por encima del titular: lo suficiente para
    // que el haz tenga recorrido visible y para que el tren de aterrizaje no
    // llegue a cruzar la primera línea del texto.
    const y = r.top - 115;

    return {
      x: gsap.utils.clamp(LADO * 0.55, vw - LADO * 0.55, x),
      y: Math.max(TECHO, y),
    };
  }

  /* ---------------------------------------------------------------- */
  /* Dibujo                                                            */
  /* ---------------------------------------------------------------- */

  function dibujar() {
    // El canvas se mueve con `translate3d` para que el compositor lo suba a su
    // propia capa: mover `left`/`top` dispararía layout en cada cuadro.
    canvas.style.transform = `translate3d(${nave.x - LADO / 2}px, ${nave.y - LADO / 2}px, 0)`;

    if (!rectDoc || efectos.haz < 0.01) {
      haz.setAttribute("opacity", "0");
      reticula.setAttribute("opacity", "0");
      barrido.setAttribute("opacity", "0");
      return;
    }

    const r = enPantalla(rectDoc);
    const sensor = escena.puntoSensor();
    // El origen del haz es la baliza del morro proyectada a coordenadas de
    // ventana: sale del sensor real del modelo, no del centro del canvas.
    const ox = nave.x - LADO / 2 + sensor.x;
    const oy = nave.y - LADO / 2 + sensor.y;

    const izq = r.left - 10;
    const der = r.right + 10;
    const arriba = r.top - 8;
    const abajo = r.bottom + 8;

    // Cono: del punto del sensor a los dos extremos de la banda inspeccionada.
    haz.setAttribute("d", `M ${ox} ${oy} L ${izq} ${abajo} L ${der} ${abajo} Z`);
    haz.setAttribute("opacity", String(efectos.haz * 0.75));

    // Retícula de esquinas. Marca el área bajo inspección sin encerrar el
    // texto en una caja, que se leería como un componente de interfaz.
    const c = Math.min(22, r.height * 0.55, r.width * 0.12);
    reticula.setAttribute(
      "d",
      `M ${izq} ${arriba + c} L ${izq} ${arriba} L ${izq + c} ${arriba}
       M ${der - c} ${arriba} L ${der} ${arriba} L ${der} ${arriba + c}
       M ${der} ${abajo - c} L ${der} ${abajo} L ${der - c} ${abajo}
       M ${izq + c} ${abajo} L ${izq} ${abajo} L ${izq} ${abajo - c}`,
    );
    reticula.setAttribute("opacity", String(efectos.reticula * 0.85));

    // Línea de barrido: la pasada del sensor sobre el texto.
    const y = arriba + (abajo - arriba) * pasada.p;
    barrido.setAttribute("x1", String(izq));
    barrido.setAttribute("x2", String(der));
    barrido.setAttribute("y1", String(y));
    barrido.setAttribute("y2", String(y));
    barrido.setAttribute("opacity", String(efectos.barrido * 0.9));
  }

  /* ---------------------------------------------------------------- */
  /* Vuelo                                                             */
  /* ---------------------------------------------------------------- */

  const RIGIDEZ = 5.2;

  function volar(dt: number) {
    // `getVelocity` solo se actualiza mientras el scroll se mueve: si dejó de
    // llegar hace más de 90ms, la velocidad real es cero y hay que dejarla
    // decaer, o el dron se quedaría adelantado para siempre.
    const fresca = performance.now() - instanteMedida < 90;
    const cruda = fresca ? gsap.utils.clamp(-3000, 3000, velMedida) : 0;
    velScroll += (cruda - velScroll) * Math.min(1, dt * 4.5);

    const destino = rectDoc ? poseInspeccion(enPantalla(rectDoc)) : poseCrucero();
    if (rectDoc) {
      // Manteniendo estación sobre un titular la deriva es mínima: solo lo
      // suficiente para que no se vea clavado en un punto.
      destino.y += gsap.utils.clamp(-16, 16, velScroll * 0.008);
    }

    // Muelle críticamente amortiguado. `1 - e^(-k·dt)` da un acercamiento
    // suave e independiente de los fps, a diferencia de un lerp con factor
    // fijo, que va más rápido en pantallas de 120Hz que en las de 60.
    const k = 1 - Math.exp(-dt * RIGIDEZ);
    const dx = (destino.x - nave.x) * k;
    const dy = (destino.y - nave.y) * k;

    nave.x += dx;
    nave.y += dy;

    // Velocidad suavizada: es lo que alimenta la actitud de vuelo.
    nave.vx += (dx / Math.max(dt, 0.001) - nave.vx) * Math.min(1, dt * 8);
    nave.vy += (dy / Math.max(dt, 0.001) - nave.vy) * Math.min(1, dt * 8);

    const alabeo = gsap.utils.clamp(-0.42, 0.42, -nave.vx * 0.0012);
    const cabeceo = gsap.utils.clamp(-0.3, 0.3, nave.vy * 0.0006 + velScroll * 0.00004);
    // El morro sigue el rumbo, con un mínimo de tres cuartos para que nunca se
    // vea completamente de perfil.
    const guinada = -0.62 + gsap.utils.clamp(-0.5, 0.5, nave.vx * 0.0009);

    escena.setPostura({
      alabeo,
      cabeceo,
      guinada,
      regimen: gsap.utils.clamp(0.35, 1, Math.hypot(nave.vx, nave.vy) / 700 + 0.4),
      sensor: efectos.sensor,
    });
  }

  /* ---------------------------------------------------------------- */
  /* Inspección                                                        */
  /* ---------------------------------------------------------------- */

  function inspeccionar(el: HTMLElement) {
    if (objetivo === el) return;
    objetivo = el;
    el.dataset.dronEscaneando = "true";

    rectDoc = medir(el);
    // Segunda medición: los bloques entran con una animación de revelado y la
    // primera toma puede quedar hecha a mitad del desplazamiento.
    gsap.delayedCall(0.75, () => {
      if (objetivo === el) rectDoc = medir(el);
    });

    tlInspeccion?.kill();
    tlInspeccion = gsap
      .timeline()
      // El haz tarda en encender: el dron primero tiene que llegar.
      .to(efectos, { haz: 1, sensor: 1, duration: 0.5, delay: 0.35, ease: "power2.out" })
      .to(efectos, { reticula: 1, duration: 0.3, ease: "power2.out" }, "<0.15")
      .to(efectos, { barrido: 1, duration: 0.2 }, "<")
      // Dos pasadas del sensor sobre el texto, como una campaña real: una de
      // reconocimiento y otra de detalle.
      .fromTo(
        pasada,
        { p: 0 },
        { p: 1, duration: 1.5, ease: "power1.inOut", repeat: 1, yoyo: true },
        "<",
      )
      .to(efectos, { barrido: 0, duration: 0.35 });
  }

  function soltar(el: HTMLElement) {
    if (objetivo !== el) return;
    delete el.dataset.dronEscaneando;
    objetivo = null;
    rectDoc = null;

    tlInspeccion?.kill();
    tlInspeccion = gsap
      .timeline()
      .to(efectos, { barrido: 0, reticula: 0, duration: 0.25, ease: "power2.in" })
      .to(efectos, { haz: 0, sensor: 0, duration: 0.35, ease: "power2.in" }, "<0.1");
  }

  /* ---------------------------------------------------------------- */
  /* Enganche al scroll                                                */
  /* ---------------------------------------------------------------- */

  /**
   * Un único disparador que cubre el documento entero, solo para leer la
   * velocidad del scroll. `getVelocity` es un método de instancia y no
   * estático, así que hace falta una instancia aunque no se use para nada más.
   */
  const medidor = ScrollTrigger.create({
    trigger: document.documentElement,
    start: 0,
    end: "max",
    onUpdate: (self) => {
      velMedida = self.getVelocity();
      instanteMedida = performance.now();
    },
  });

  const objetivos = Array.from(document.querySelectorAll<HTMLElement>("[data-dron-objetivo]"));

  const disparadores = objetivos.map((el) =>
    ScrollTrigger.create({
      trigger: el,
      // La ventana de inspección empieza cuando el titular entra en el tercio
      // superior y termina cuando sale por arriba. Es aproximadamente el rato
      // que alguien pasa leyendo esa sección.
      start: "top 68%",
      end: "bottom 22%",
      onEnter: () => inspeccionar(el),
      onEnterBack: () => inspeccionar(el),
      onLeave: () => soltar(el),
      onLeaveBack: () => soltar(el),
    }),
  );

  /* ---------------------------------------------------------------- */
  /* Entrada y bucle                                                   */
  /* ---------------------------------------------------------------- */

  // Entrada: llega volando desde fuera de pantalla. El dron aparece porque
  // llegó, no porque se le subió la opacidad.
  const inicial = poseCrucero();
  nave.x = window.innerWidth + LADO;
  nave.y = inicial.y - 120;
  gsap.fromTo(canvas, { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 0.15 });

  let ultimo = performance.now();
  let visible = true;

  function ticker() {
    if (!visible) return;
    const ahora = performance.now();
    const dt = Math.min((ahora - ultimo) / 1000, 0.05);
    ultimo = ahora;

    // El scroll se lee UNA vez por cuadro y antes de escribir nada: leerlo
    // después de haber tocado estilos obligaría al navegador a recalcular el
    // diseño en medio del bucle.
    scrollActual = window.scrollY;

    volar(dt);
    dibujar();
    escena.render(dt);
  }

  gsap.ticker.add(ticker);

  // Con la pestaña en segundo plano no se gasta ni un cuadro.
  function alCambiarVisibilidad() {
    visible = document.visibilityState === "visible";
    if (visible) ultimo = performance.now();
  }
  document.addEventListener("visibilitychange", alCambiarVisibilidad);

  function alRedimensionar() {
    escena.resize();
    ScrollTrigger.refresh();
    if (objetivo) rectDoc = medir(objetivo);
  }
  window.addEventListener("resize", alRedimensionar);

  return {
    destruir() {
      gsap.ticker.remove(ticker);
      tlInspeccion?.kill();
      disparadores.forEach((d) => d.kill());
      medidor.kill();
      document.removeEventListener("visibilitychange", alCambiarVisibilidad);
      window.removeEventListener("resize", alRedimensionar);
      objetivos.forEach((el) => delete el.dataset.dronEscaneando);
      svg.remove();
    },
  };
}
