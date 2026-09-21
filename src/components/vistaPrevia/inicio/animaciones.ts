/**
 * Animaciones de la vista previa del inicio.
 *
 * CRITERIO (el mismo del brochure)
 * --------------------------------
 * Se fija la pantalla solo donde hay una secuencia que contar —los siete
 * servicios, la operación en faena y el recorrido de proyectos— y ahí el scroll
 * ES la línea de tiempo. En el resto, revelados de una sola vez al entrar.
 *
 * Esto es lo que separa esta página del inicio de hoy: allá el scroll siempre
 * avanza y las animaciones decoran; acá el scroll se detiene y el capítulo
 * ocurre.
 *
 * El HTML de cada capítulo ya es su versión estática completa. Este módulo
 * marca la raíz con `data-movimiento` y recién entonces el CSS activa los
 * marcos fijados (ver el bloque VISTA PREVIA DEL INICIO en globals.css). Con
 * movimiento reducido no se marca nada y la página queda estática y legible.
 *
 * ORDEN
 * -----
 * Los capítulos se arman en orden de documento: ScrollTrigger calcula
 * posiciones en orden de creación, y un disparador creado antes que un capítulo
 * fijado que está más arriba quedaría desplazado el alto del espaciador.
 *
 * Los ids `dron-<escena>` los lee la coreografía del dron para volar
 * sincronizada con cada capítulo. Si se cambia una duración acá, se revisa
 * `guionVistaPrevia.ts`.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Alto del navbar pegajoso. Los capítulos se fijan justo debajo. */
const NAVBAR = 68;
const FIJAR_DESDE = `top ${NAVBAR}px`;

export function crearAnimacionesVistaPrevia(raiz: HTMLElement): () => void {
  // En móvil la barra de direcciones cambia el alto al scrollear: sin esto,
  // cada cambio recalcula los capítulos fijados y la página salta.
  ScrollTrigger.config({ ignoreMobileResize: true });

  const uno = <T extends HTMLElement = HTMLElement>(sel: string, base: ParentNode = raiz) =>
    base.querySelector<T>(sel);
  const todos = <T extends HTMLElement = HTMLElement>(sel: string, base: ParentNode = raiz) =>
    Array.from(base.querySelectorAll<T>(sel));
  const capitulo = (n: string) => uno(`[data-capitulo="${n}"]`);

  /** Revelado simple, para lo que no tiene secuencia propia. */
  function revelar(elementos: HTMLElement[], escalon = 0.08) {
    elementos.forEach((el, i) => {
      gsap.from(el, {
        y: 26,
        autoAlpha: 0,
        duration: 0.85,
        ease: "power3.out",
        delay: i * escalon,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });
  }

  /* ---------------------------------------------------------------- */
  /* 00 · Portada                                                      */
  /* ---------------------------------------------------------------- */

  function portada() {
    const s = capitulo("00");
    if (!s) return;
    const texto = uno("[data-portada-texto]", s);
    const fondo = uno("[data-portada-fondo]", s);
    const reticula = uno("[data-portada-reticula]", s);

    // Parallax de salida: el titular se aparta, el fondo se acerca y la
    // retícula se queda atrás, como si la cámara empezara a subir.
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: s, start: "top top", end: "bottom top", scrub: true },
    });
    if (texto) tl.to(texto, { yPercent: -12, autoAlpha: 0.18 }, 0);
    if (fondo) tl.to(fondo, { scale: 1.08, yPercent: 6 }, 0);
    if (reticula) tl.to(reticula, { yPercent: 14 }, 0);
  }

  /* ---------------------------------------------------------------- */
  /* 02 · Servicios: los siete se relevan con el capítulo fijado        */
  /* ---------------------------------------------------------------- */

  function servicios(escritorio: boolean) {
    const s = capitulo("02");
    if (!s) return;
    const items = todos("[data-servicio]", s);
    const foto = uno("[data-servicios-foto] img", s);
    const barra = uno("[data-servicios-barra]", s);
    const etapa = uno("[data-servicios-etapa]", s);
    if (!items.length) return;

    if (!escritorio) {
      // Sin fijar: la lista de siempre, revelada al entrar.
      revelar(items, 0.05);
      return;
    }

    let mostrada = 1;
    // Apilados en la misma celda por CSS: solo uno a la vista por vez. El
    // recorrido es amplio (56px) porque es lo que permite cruzar las
    // transiciones sin que se lean dos títulos superpuestos — ver abajo.
    gsap.set(items.slice(1), { autoAlpha: 0, y: 56 });

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        id: "dron-servicios",
        trigger: s,
        start: FIJAR_DESDE,
        end: `+=${items.length * 52}%`,
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (!etapa) return;
          const n = Math.min(items.length, Math.floor(self.progress * items.length) + 1);
          if (n === mostrada) return;
          mostrada = n;
          etapa.textContent = String(n).padStart(2, "0");
        },
      },
    });

    if (barra) tl.fromTo(barra, { scaleX: 0 }, { scaleX: 1, duration: items.length }, 0);
    // La foto respira durante todo el capítulo: es lo que el dron inspecciona.
    if (foto) tl.fromTo(foto, { scale: 1.12 }, { scale: 1, duration: items.length }, 0);

    // Relevo con cruce corto, y los dos moviéndose en sentidos opuestos.
    //
    // Los siete comparten celda. Cruzarlos en el mismo sitio pintaba dos
    // títulos uno sobre otro; relevarlos sin cruce dejaba la columna vacía un
    // instante. Lo que lo resuelve no es la opacidad sino la SEPARACIÓN: el
    // saliente sube 56px mientras el entrante llega desde 56px abajo, así que
    // durante el cruce están a más de 100px uno del otro y ninguno tapa al
    // otro, aunque por un momento se vean los dos tenues.
    items.forEach((item, i) => {
      if (i === 0) return;
      tl.to(items[i - 1], { autoAlpha: 0, y: -56, duration: 0.2 }, i - 0.2);
      tl.to(item, { autoAlpha: 1, y: 0, duration: 0.2 }, i - 0.08);
    });
  }

  /* ---------------------------------------------------------------- */
  /* 03 · Faena: la banda se abre a sangre                              */
  /* ---------------------------------------------------------------- */

  function faena(escritorio: boolean) {
    const s = capitulo("03");
    const banda = s ? uno("[data-faena-banda]", s) : null;
    if (!s || !banda) return;
    const medios = todos(":scope > img, :scope > video", banda);
    const texto = uno("[data-faena-texto]", banda);
    const razones = todos("[data-razon]", s);

    if (!escritorio) {
      gsap.fromTo(
        banda,
        { clipPath: "inset(6% 5% 6% 5%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: { trigger: banda, start: "top 92%", end: "top 35%", scrub: true },
        },
      );
      revelar(razones);
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        id: "dron-faena",
        trigger: banda,
        start: FIJAR_DESDE,
        end: "+=110%",
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
      },
    });
    tl.fromTo(
      banda,
      { clipPath: "inset(9% 7% 9% 7%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power2.inOut" },
      0,
    );
    if (medios.length)
      tl.fromTo(medios, { scale: 1.18 }, { scale: 1, duration: 1.6, ease: "power2.out" }, 0);
    // Temprano y a propósito: en 0,55 el capítulo se pasaba media línea de
    // tiempo fijado mostrando un video sin un solo texto encima.
    if (texto) tl.from(texto, { y: 40, autoAlpha: 0, duration: 0.45, ease: "power3.out" }, 0.12);
    // Pausa: el registro se sostiene un momento con la pantalla completa.
    tl.to({}, { duration: 0.6 });

    revelar(razones);
  }

  /* ---------------------------------------------------------------- */
  /* 04 · Nosotros                                                      */
  /* ---------------------------------------------------------------- */

  function nosotros() {
    const s = capitulo("04");
    if (!s) return;
    const img = uno("[data-nosotros-foto] img", s);
    // Se recorta la imagen y no su marco: el marco lleva el chaflán de marca
    // como clip-path, y pisarlo lo borraría.
    if (img) {
      gsap.fromTo(
        img,
        { clipPath: "inset(0% 100% 0% 0%)", scale: 1.15 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: img, start: "top 88%", end: "top 38%", scrub: 0.6 },
        },
      );
    }
    revelar(todos("[data-ventaja]", s), 0.12);
  }

  /* ---------------------------------------------------------------- */
  /* 05 · Casos: cifras que cuentan y pista horizontal                  */
  /* ---------------------------------------------------------------- */

  function casos(escritorio: boolean, restaurar: (() => void)[]) {
    const s = capitulo("05");
    if (!s) return;

    // Las cifras cuentan mientras el dron las escanea. El HTML trae el valor
    // real: al revertir el contexto se devuelve.
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

    const marco = uno("[data-casos-marco]", s);
    const pista = uno("[data-casos-pista]", s);
    if (!escritorio || !marco || !pista) {
      revelar(todos("[data-caso]", s), 0.06);
      return;
    }

    const barra = uno("[data-casos-barra]", s);
    const actual = uno("[data-casos-actual]", s);
    const total = todos("[data-caso]", s).length;
    let mostrado = 1;

    const distancia = () => Math.max(0, pista.scrollWidth - window.innerWidth);

    // Recorrido horizontal: el scroll vertical desplaza la pista. El alto del
    // recorrido es exactamente lo que falta por mostrar.
    const recorrido = gsap.to(pista, {
      x: () => -distancia(),
      ease: "none",
      scrollTrigger: {
        // NO se llama `dron-casos` a propósito. Con ese id, la coreografía del
        // dron mediría su avance contra la PISTA, que arranca después de las
        // cifras: el escaneo caía sobre cifras que ya habían salido de
        // pantalla. Sin él, el dron mide contra la sección completa y el
        // escaneo coincide con las cifras (ver `guionVistaPrevia.ts`).
        id: "casos-pista",
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
          if (n === mostrado || n < 1) return;
          mostrado = n;
          actual.textContent = String(n).padStart(2, "0");
        },
      },
    });

    // El número de fondo avanza a otra velocidad que la ficha: da profundidad
    // sin mover nada que haya que leer.
    for (const numero of todos("[data-caso-numero]", s)) {
      const panel = numero.closest<HTMLElement>("[data-caso]");
      if (!panel) continue;
      gsap.fromTo(
        numero,
        { xPercent: 22 },
        {
          xPercent: -22,
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
  /* 06 · Software: el riel se dibuja y el dron aterriza                */
  /* ---------------------------------------------------------------- */

  function software(escritorio: boolean) {
    const s = capitulo("06");
    if (!s) return;
    const tarjetas = todos("[data-software-tarjeta]", s);

    if (escritorio) {
      const linea = uno("[data-flujo-linea]", s);
      const nodos = todos("[data-flujo-nodo]", s);
      const flujo = uno("[data-flujo]", s);

      if (flujo && linea) {
        gsap.set(nodos, { autoAlpha: 0 });
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: flujo, start: "top 82%", end: "top 40%", scrub: 0.6 },
        });
        tl.fromTo(linea, { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0);
        nodos.forEach((n, i) => tl.to(n, { autoAlpha: 1, duration: 0.15 }, (i + 0.5) / nodos.length));
      }
    }

    revelar(tarjetas, 0.1);
  }

  /* ---------------------------------------------------------------- */
  /* Montaje                                                           */
  /* ---------------------------------------------------------------- */

  const mm = gsap.matchMedia();

  mm.add(
    {
      escritorio: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      movil: "(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)",
    },
    (contexto) => {
      const { escritorio = false } = contexto.conditions ?? {};
      const restaurar: (() => void)[] = [];

      raiz.dataset.movimiento = escritorio ? "escritorio" : "movil";

      portada();
      servicios(escritorio);
      faena(escritorio);
      nosotros();
      casos(escritorio, restaurar);
      software(escritorio);

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
