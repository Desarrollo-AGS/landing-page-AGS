/**
 * Animaciones de /nosotros/brochure.
 *
 * CRITERIO
 * --------
 * Se anima lo que ayuda a entender, no todo lo que se puede mover:
 *
 *   · Fijar la pantalla solo donde hay una secuencia que contar: el desafío
 *     (problema → solución), la operación (cuatro etapas), del vuelo al dato
 *     (el flujo), los casos (recorrido horizontal) y el cierre.
 *   · `scrub` solo dentro de esos capítulos fijados: ahí el scroll ES la línea
 *     de tiempo. En el resto, revelados de una sola vez al entrar.
 *   · Solo `transform`, `opacity` y `clip-path`: nada que dispare layout.
 *
 * RESPONSIVE Y MOVIMIENTO REDUCIDO
 * --------------------------------
 * Todo cuelga de `gsap.matchMedia`. Al cambiar de condición (girar la tablet,
 * activar movimiento reducido) se revierte y se rearma solo.
 *
 * El HTML de cada capítulo ya es su versión estática completa. Este módulo
 * marca la raíz con `data-movimiento` y recién ahí el CSS activa los marcos
 * fijados. Con movimiento reducido no se marca nada: la página queda estática
 * y legible, y solo se conserva el cambio de imagen de "Lo que hacemos", sin
 * transición.
 *
 * ORDEN
 * -----
 * Los capítulos se arman en el orden del documento. ScrollTrigger calcula las
 * posiciones en orden de creación, y un disparador creado antes que un capítulo
 * fijado que está más arriba quedaría desplazado el alto del espaciador.
 *
 * Los ids `iao-<escena>` los lee la coreografía del dron para volar sincronizada
 * con la línea de tiempo de cada capítulo. Si se cambia una duración acá, se
 * revisa su guion en ./coreografiaIao.ts.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Alto del navbar pegajoso. Los capítulos se fijan justo debajo. */
const NAVBAR = 68;
const FIJAR_DESDE = `top ${NAVBAR}px`;

type Conexion = { saveData?: boolean };

export function crearAnimaciones(raiz: HTMLElement): () => void {
  // En móvil la barra de direcciones cambia el alto de la ventana al scrollear.
  // Sin esto, cada cambio recalcula los capítulos fijados y la página salta.
  ScrollTrigger.config({ ignoreMobileResize: true });

  const uno = <T extends HTMLElement = HTMLElement>(sel: string, base: ParentNode = raiz) =>
    base.querySelector<T>(sel);
  const todos = <T extends HTMLElement = HTMLElement>(sel: string, base: ParentNode = raiz) =>
    Array.from(base.querySelectorAll<T>(sel));
  const capitulo = (n: string) => uno(`[data-capitulo="${n}"]`);

  /* ---------------------------------------------------------------- */
  /* Revelados genéricos                                               */
  /* ---------------------------------------------------------------- */

  function revelados(base: HTMLElement) {
    for (const grupo of todos("[data-revelar-lineas]", base)) {
      gsap.from(todos(".iao-mascara__texto", grupo), {
        yPercent: 108,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.09,
        scrollTrigger: { trigger: grupo, start: "top 85%", once: true },
      });
    }
    for (const el of todos("[data-revelar]", base)) {
      gsap.from(el, {
        y: 28,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    }
  }

  /** Titular con máscara que entra una vez, antes de que el capítulo se fije. */
  function titularAlEntrar(lineas: HTMLElement[], trigger: HTMLElement, start = "top 70%") {
    if (!lineas.length) return;
    gsap.from(lineas, {
      yPercent: 108,
      duration: 1.1,
      ease: "power4.out",
      stagger: 0.1,
      scrollTrigger: { trigger, start, once: true },
    });
  }

  /* ---------------------------------------------------------------- */
  /* 00 · Portada                                                      */
  /* ---------------------------------------------------------------- */

  function portada() {
    const s = capitulo("00");
    if (!s) return;
    const texto = uno("[data-portada-texto]", s);
    const reticula = uno("[data-portada-reticula]", s);

    // Parallax de salida: el titular se aparta y la retícula se queda atrás,
    // como si la cámara empezara a subir.
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: s, start: "top top", end: "bottom top", scrub: true },
    });
    if (texto) tl.to(texto, { yPercent: -10, autoAlpha: 0.15 }, 0);
    if (reticula) tl.to(reticula, { yPercent: 14 }, 0);
  }

  /* ---------------------------------------------------------------- */
  /* 01 · El desafío                                                   */
  /* ---------------------------------------------------------------- */

  function desafio(escritorio: boolean) {
    const s = capitulo("01");
    if (!s) return;
    const titulo = todos("[data-desafio-titulo] .iao-mascara__texto", s);
    const filas = todos("[data-desafio-fila]", s);
    const foto = uno("[data-desafio-foto]", s);
    const imagen = uno("[data-desafio-imagen]", s);
    const frase = todos("[data-desafio-frase] .iao-mascara__texto", s);

    titularAlEntrar(titulo, s);

    if (!escritorio) {
      for (const f of filas) {
        gsap.from(f, {
          autoAlpha: 0,
          y: 24,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: f, start: "top 90%", once: true },
        });
      }
      if (foto) {
        gsap.fromTo(
          foto,
          { clipPath: "inset(10% 8% 10% 8%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: { trigger: foto, start: "top 95%", end: "top 30%", scrub: true },
          },
        );
        gsap.from(frase, {
          yPercent: 108,
          duration: 1,
          ease: "power4.out",
          stagger: 0.1,
          scrollTrigger: { trigger: foto, start: "top 45%", once: true },
        });
      }
      return;
    }

    // Escritorio: los cinco conceptos se encienden de a uno con el scroll y,
    // con todos a la vista, la fotografía cubre el capítulo.
    gsap.set(filas, { autoAlpha: 0.22 });

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        id: "iao-desafio",
        trigger: s,
        start: FIJAR_DESDE,
        end: "+=240%",
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
      },
    });

    filas.forEach((f, i) => {
      tl.to(f, { autoAlpha: 1, duration: 0.6 }, i * 0.6);
      const tick = uno("[data-tick]", f);
      if (tick) tl.fromTo(tick, { scaleX: 0 }, { scaleX: 1, duration: 0.6 }, i * 0.6);
    });

    if (foto) {
      tl.fromTo(
        foto,
        { clipPath: "inset(0% 0% 0% 100%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 2, ease: "power2.inOut" },
        3,
      );
    }
    if (imagen) tl.fromTo(imagen, { scale: 1.18 }, { scale: 1, duration: 2.6, ease: "power2.out" }, 3);
    tl.from(frase, { yPercent: 108, duration: 0.9, stagger: 0.15, ease: "power3.out" }, 4.6);
    // Pausa final: la frase se sostiene mientras llega el dron.
    tl.to({}, { duration: 1.2 });
  }

  /* ---------------------------------------------------------------- */
  /* 02 · La operación                                                 */
  /* ---------------------------------------------------------------- */

  function operacion(escritorio: boolean) {
    const s = capitulo("02");
    if (!s) return;
    revelados(s);

    const pasos = todos("[data-paso]", s);
    const barra = uno("[data-operacion-barra]", s);
    const etapa = uno("[data-operacion-etapa]", s);
    let etapaMostrada = 1;

    // Escritorio: las cuatro etapas visibles, la activa encendida.
    // Móvil: una etapa por pantalla.
    if (escritorio) gsap.set(pasos.slice(1), { autoAlpha: 0.28 });
    else gsap.set(pasos.slice(1), { autoAlpha: 0, y: 28 });

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        id: "iao-operacion",
        trigger: s,
        start: FIJAR_DESDE,
        end: escritorio ? "+=320%" : "+=280%",
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (!etapa) return;
          const n = Math.min(pasos.length, Math.floor(self.progress * pasos.length) + 1);
          if (n === etapaMostrada) return;
          etapaMostrada = n;
          etapa.textContent = String(n).padStart(2, "0");
        },
      },
    });

    if (barra) tl.fromTo(barra, { scaleX: 0 }, { scaleX: 1, duration: pasos.length }, 0);

    pasos.forEach((paso, i) => {
      if (i === 0) return;
      const salida = escritorio ? { autoAlpha: 0.45 } : { autoAlpha: 0, y: -20 };
      tl.to(pasos[i - 1], { ...salida, duration: 0.3 }, i - 0.15);
      tl.to(paso, { autoAlpha: 1, y: 0, duration: 0.3 }, i - 0.15);
    });
  }

  /* ---------------------------------------------------------------- */
  /* 03 · Lo que hacemos                                               */
  /* ---------------------------------------------------------------- */

  function capacidades(movimiento: boolean, restaurar: (() => void)[]) {
    const s = capitulo("03");
    if (!s) return;
    if (movimiento) revelados(s);

    // El panel fijo solo existe en escritorio. En móvil cada capacidad trae su
    // imagen y no hay nada que sincronizar.
    const panel = uno("[data-capacidades-panel]", s);
    if (!panel || panel.offsetParent === null) return;

    const items = todos("[data-capacidad]", s);
    const capas = todos("[data-capacidad-media]", s);
    const conexion = (navigator as Navigator & { connection?: Conexion }).connection;
    const conVideo = movimiento && conexion?.saveData !== true;
    let actual = 0;
    let z = capas.length;

    if (movimiento) gsap.set(items.slice(1), { autoAlpha: 0.32 });

    function activar(i: number) {
      if (i === actual) return;
      const anterior = actual;
      actual = i;

      capas[anterior]?.querySelector("video")?.pause();
      const entra = capas[i];
      entra.style.zIndex = String(++z);

      if (movimiento) {
        gsap.to(items[anterior], { autoAlpha: 0.32, duration: 0.5, overwrite: "auto" });
        gsap.to(items[i], { autoAlpha: 1, duration: 0.5, overwrite: "auto" });
        // La imagen nueva entra con un corte vertical, de abajo hacia arriba,
        // sobre la anterior. La anterior no se anima: queda debajo.
        gsap.fromTo(
          entra,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.95, ease: "power3.inOut", overwrite: "auto" },
        );
        const fondo = uno("[data-capacidad-fondo]", entra);
        if (fondo) {
          gsap.fromTo(fondo, { scale: 1.12 }, { scale: 1, duration: 1.5, ease: "power3.out", overwrite: "auto" });
        }
      }

      const video = entra.querySelector("video");
      if (video && conVideo) void video.play().catch(() => {});
    }

    items.forEach((item, i) =>
      ScrollTrigger.create({
        trigger: item,
        start: "top 55%",
        end: "bottom 55%",
        onToggle: (self) => {
          if (self.isActive) activar(i);
        },
      }),
    );

    // Lo que `activar` escribe después de armar el contexto no lo registra
    // `matchMedia`, así que se deshace a mano.
    restaurar.push(() => {
      capas.forEach((capa, i) => {
        capa.style.zIndex = i === 0 ? "1" : "0";
        capa.style.clipPath = "";
        capa.querySelector("video")?.pause();
      });
      gsap.set(items, { clearProps: "opacity,visibility" });
    });
  }

  /* ---------------------------------------------------------------- */
  /* 04 · Del vuelo al dato                                            */
  /* ---------------------------------------------------------------- */

  function vuelo(escritorio: boolean) {
    const s = capitulo("04");
    if (!s) return;
    const titulo = todos("[data-vuelo-titulo] .iao-mascara__texto", s);
    const flujo = uno("[data-flujo]", s);
    const linea = uno("[data-flujo-linea]", s);
    const nodos = todos("[data-flujo-nodo]", s);
    const capas = todos("[data-capa]", s);

    titularAlEntrar(titulo, s);
    revelados(s);

    if (!escritorio) {
      if (linea && flujo) {
        gsap.fromTo(
          linea,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: flujo, start: "top 75%", end: "bottom 60%", scrub: true },
          },
        );
      }
      for (const n of nodos) {
        gsap.from(n, {
          autoAlpha: 0,
          x: -16,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: n, start: "top 85%", once: true },
        });
      }
      return;
    }

    // Escritorio: una sola línea atraviesa las seis etapas; cada una se
    // enciende cuando la línea la alcanza. A mitad de recorrido, el dato sube
    // en capas.
    gsap.set(nodos, { autoAlpha: 0.25 });
    gsap.set(capas, { autoAlpha: 0, y: 70 });

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        id: "iao-vuelo",
        trigger: s,
        start: FIJAR_DESDE,
        end: "+=260%",
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
      },
    });

    if (linea) tl.fromTo(linea, { scaleX: 0 }, { scaleX: 1, duration: 6 }, 0);
    nodos.forEach((n, i) => tl.to(n, { autoAlpha: 1, duration: 0.35 }, i + 0.05));
    capas.forEach((c, i) =>
      tl.to(c, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" }, 2 + i * 0.7),
    );
    tl.to({}, { duration: 0.8 });
  }

  /* ---------------------------------------------------------------- */
  /* 05 · Casos reales                                                 */
  /* ---------------------------------------------------------------- */

  function casos(escritorio: boolean) {
    const s = capitulo("05");
    if (!s) return;
    revelados(s);
    if (!escritorio) return;

    const marco = uno("[data-casos-marco]", s);
    const pista = uno("[data-casos-pista]", s);
    if (!marco || !pista) return;
    const barra = uno("[data-casos-barra]", s);
    const actual = uno("[data-casos-actual]", s);
    const total = todos("[data-caso]", s).length;
    let casoMostrado = 1;

    const distancia = () => Math.max(0, pista.scrollWidth - window.innerWidth);

    // Recorrido horizontal: el scroll vertical desplaza la pista, un caso por
    // vez. El alto del recorrido es exactamente lo que falta por mostrar.
    const recorrido = gsap.to(pista, {
      x: () => -distancia(),
      ease: "none",
      scrollTrigger: {
        id: "iao-casos",
        trigger: marco,
        start: FIJAR_DESDE,
        end: () => `+=${distancia()}`,
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (barra) gsap.set(barra, { scaleX: self.progress });
          if (!actual) return;
          const n = Math.min(total, Math.round(self.progress * total + 0.5));
          if (n === casoMostrado || n < 1) return;
          casoMostrado = n;
          actual.textContent = String(n).padStart(2, "0");
        },
      },
    });

    // El número de fondo de cada caso avanza a otra velocidad que el texto: da
    // profundidad al recorrido sin mover nada que haya que leer.
    for (const numero of todos("[data-caso-numero]", s)) {
      const panel = numero.closest<HTMLElement>("[data-caso]");
      if (!panel) continue;
      gsap.fromTo(
        numero,
        { xPercent: 25 },
        {
          xPercent: -25,
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: recorrido,
            start: "left right",
            end: "right left",
            scrub: true,
          },
        },
      );
    }
  }

  /* ---------------------------------------------------------------- */
  /* 06 · Resultados                                                   */
  /* ---------------------------------------------------------------- */

  function resultados(restaurar: (() => void)[]) {
    const s = capitulo("06");
    if (!s) return;
    revelados(s);

    const formato = new Intl.NumberFormat("es-CL", { maximumFractionDigits: 0 });
    for (const el of todos("[data-cifra]", s)) {
      const valor = Number(el.dataset.cifra);
      if (!Number.isFinite(valor)) continue;
      const final = el.textContent;
      const contador = { v: 0 };
      el.textContent = formato.format(0);
      restaurar.push(() => {
        el.textContent = final;
      });

      gsap.to(contador, {
        v: valor,
        duration: 1.8,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
        onUpdate: () => {
          el.textContent = formato.format(Math.round(contador.v));
        },
      });
    }
  }

  /* ---------------------------------------------------------------- */
  /* 07 · Cierre                                                       */
  /* ---------------------------------------------------------------- */

  function cierre(escritorio: boolean) {
    const s = capitulo("07");
    if (!s) return;
    const lineas = todos("[data-cierre-titulo] .iao-mascara__texto", s);
    const cta = uno("[data-cierre-cta]", s);
    const fondo = uno("[data-cierre-fondo]", s);

    if (!escritorio) {
      titularAlEntrar(lineas, s, "top 55%");
      if (cta) {
        gsap.from(cta, {
          autoAlpha: 0,
          y: 24,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: cta, start: "top 92%", once: true },
        });
      }
      return;
    }

    // La frase se arma línea a línea mientras el dron pasa y se aleja. El CTA
    // aparece cuando la frase está completa.
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        id: "iao-cierre",
        trigger: s,
        start: FIJAR_DESDE,
        end: "+=140%",
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
      },
    });

    if (fondo) tl.fromTo(fondo, { scale: 1.1 }, { scale: 1, duration: 3 }, 0);
    tl.from(lineas, { yPercent: 108, duration: 0.8, stagger: 0.35, ease: "power3.out" }, 0.1);
    if (cta) tl.from(cta, { autoAlpha: 0, y: 30, duration: 0.6, ease: "power2.out" }, 1.7);
  }

  /* ---------------------------------------------------------------- */
  /* Montaje                                                           */
  /* ---------------------------------------------------------------- */

  const mm = gsap.matchMedia();

  mm.add(
    {
      escritorio: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      movil: "(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)",
      reducido: "(prefers-reduced-motion: reduce)",
    },
    (contexto) => {
      const { escritorio = false, reducido = false } = contexto.conditions ?? {};
      const restaurar: (() => void)[] = [];

      if (reducido) {
        capacidades(false, restaurar);
        return () => restaurar.forEach((f) => f());
      }

      raiz.dataset.movimiento = escritorio ? "escritorio" : "movil";

      portada();
      desafio(escritorio);
      operacion(escritorio);
      capacidades(true, restaurar);
      vuelo(escritorio);
      casos(escritorio);
      resultados(restaurar);
      cierre(escritorio);

      ScrollTrigger.refresh();

      return () => {
        restaurar.forEach((f) => f());
        delete raiz.dataset.movimiento;
      };
    },
  );

  // Las tipografías y las imágenes pueden terminar de cargar después de medir.
  const refrescar = () => ScrollTrigger.refresh();
  window.addEventListener("load", refrescar);
  void document.fonts?.ready.then(refrescar);

  return () => {
    window.removeEventListener("load", refrescar);
    mm.revert();
  };
}
