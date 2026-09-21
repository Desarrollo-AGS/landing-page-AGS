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
 * desde el rectángulo del titular y el dron lo persigue con el piloto de
 * `./vuelo`, que es el mismo que usa la coreografía del brochure. Eso es lo
 * que hace que se lea como una aeronave manteniendo posición sobre un
 * objetivo, y no como una imagen deslizándose.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Escena } from "./escena";
import { crearHaz } from "./haz";
import { crearMedidorScroll, crearPiloto } from "./vuelo";

gsap.registerPlugin(ScrollTrigger);

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

  /** Haz del sensor y retícula sobre el titular. */
  const rayo = crearHaz(capa);

  /* ---------------------------------------------------------------- */
  /* Estado                                                            */
  /* ---------------------------------------------------------------- */

  const piloto = crearPiloto({ x: window.innerWidth + LADO, y: window.innerHeight * 0.34 });
  const nave = piloto.nave;

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
  const medidor = crearMedidorScroll();
  let velScroll = 0;

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
      rayo.ocultar();
      return;
    }

    // El origen del haz es la baliza del morro proyectada a coordenadas de
    // ventana: sale del sensor real del modelo, no del centro del canvas.
    const sensor = escena.puntoSensor();
    rayo.dibujar(
      { x: nave.x - LADO / 2 + sensor.x, y: nave.y - LADO / 2 + sensor.y },
      enPantalla(rectDoc),
      efectos,
      pasada.p,
    );
  }

  /* ---------------------------------------------------------------- */
  /* Vuelo                                                             */
  /* ---------------------------------------------------------------- */

  function volar(dt: number) {
    velScroll = medidor.leer(dt);

    const titular = rectDoc ? enPantalla(rectDoc) : null;
    const destino = titular ? poseInspeccion(titular) : poseCrucero();
    if (titular) {
      // Manteniendo estación sobre un titular la deriva es mínima: solo lo
      // suficiente para que no se vea clavado en un punto.
      destino.y += gsap.utils.clamp(-16, 16, velScroll * 0.008);
    }

    const postura = piloto.volar(dt, destino, {
      velScroll,
      // En crucero el morro sigue el rumbo de vuelo. Sobre un titular apunta al
      // centro del texto: si queda a la izquierda del dron mira a la izquierda,
      // y si el dron tuvo que pasar al otro lado, mira a la derecha.
      mirarHacia: titular ? (titular.left + titular.width / 2 - nave.x) / 160 : null,
      // Mientras el sensor está encendido el morro se agacha hacia el titular
      // y acompaña a la línea de barrido.
      mirada: efectos.sensor * (0.12 + 0.1 * pasada.p),
      sensor: efectos.sensor,
    });

    escena.setPostura(postura);
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
      medidor.destruir();
      document.removeEventListener("visibilitychange", alCambiarVisibilidad);
      window.removeEventListener("resize", alRedimensionar);
      objetivos.forEach((el) => delete el.dataset.dronEscaneando);
      rayo.destruir();
    },
  };
}
