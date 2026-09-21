/**
 * Animaciones GSAP del inicio.
 *
 * Es una capa sobre las secciones de siempre: no cambia textos ni orden, y
 * convive con los revelados de `Revelar` (Motion), que siguen a cargo de la
 * entrada de cada bloque. Acá va lo que depende del scroll:
 *
 *   · Hero        el titular se aparta y el video se acerca al salir.
 *   · Servicios   la foto fija hace parallax mientras se recorre el índice.
 *   · Faena       la banda de video se fija y se abre a sangre; el dron llega.
 *   · Nosotros    la foto se revela con un corte horizontal.
 *   · Casos       las cifras cuentan al entrar, mientras el dron las escanea.
 *
 * El recorrido del dron vive en `brand/dron/guionInicio.ts`. La única sección
 * fijada es Faena, y su línea de tiempo lleva el id `dron-faena` para que el
 * dron vuele sincronizado con ella.
 *
 * Todo cuelga de `gsap.matchMedia`: con movimiento reducido no se arma nada y
 * la página queda exactamente como antes.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Alto del navbar pegajoso. Faena se fija justo debajo. */
const NAVBAR = 68;

export function crearAnimacionesInicio(): () => void {
  // En móvil la barra de direcciones cambia el alto al scrollear: sin esto,
  // cada cambio recalcula los disparadores y la página salta.
  ScrollTrigger.config({ ignoreMobileResize: true });

  const seccion = (nombre: string) =>
    document.querySelector<HTMLElement>(`[data-dron-escena="${nombre}"]`);

  function hero() {
    const s = seccion("hero");
    if (!s) return;
    const texto = s.querySelector("[data-hero-texto]");
    const fondo = s.querySelector("[data-hero-fondo]");
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: s, start: "top top", end: "bottom top", scrub: true },
    });
    if (texto) tl.to(texto, { yPercent: -14, autoAlpha: 0.2 }, 0);
    if (fondo) tl.to(fondo, { scale: 1.08, yPercent: 6 }, 0);
  }

  function servicios() {
    const s = seccion("servicios");
    const img = s?.querySelector("[data-servicios-foto] img");
    if (!s || !img) return;
    gsap.fromTo(
      img,
      { scale: 1.14 },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: s, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  }

  function faena(escritorio: boolean) {
    const s = seccion("faena");
    const banda = s?.querySelector<HTMLElement>("[data-faena-banda]");
    if (!s || !banda) return;
    const medios = banda.querySelectorAll(":scope > img, :scope > video");
    const texto = banda.querySelector("[data-faena-texto]");

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
      return;
    }

    // Escritorio: la banda se fija bajo el navbar. Mientras está fijada se
    // abre desde una ventana hasta cubrir el ancho, el video se asienta y el
    // titular sube. El dron entra por la derecha a mitad de camino.
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        id: "dron-faena",
        trigger: banda,
        start: `top ${NAVBAR}px`,
        end: "+=90%",
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
    if (medios.length) tl.fromTo(medios, { scale: 1.18 }, { scale: 1, duration: 1.6, ease: "power2.out" }, 0);
    if (texto) tl.from(texto, { y: 50, autoAlpha: 0, duration: 0.6, ease: "power3.out" }, 0.55);
    tl.to({}, { duration: 0.5 });
  }

  function nosotros() {
    const s = seccion("nosotros");
    const img = s?.querySelector<HTMLElement>("[data-nosotros-foto] img");
    if (!s || !img) return;
    // Se recorta la imagen y no su marco: el marco lleva el chaflán de marca
    // como clip-path, y pisarlo lo borraría.
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

  function casos(restaurar: (() => void)[]) {
    const s = seccion("casos");
    if (!s) return;
    const formato = new Intl.NumberFormat("es-CL", { maximumFractionDigits: 0 });
    for (const el of s.querySelectorAll<HTMLElement>("[data-cifra]")) {
      const valor = Number(el.dataset.cifra);
      if (!Number.isFinite(valor)) continue;
      const final = el.textContent;
      const contador = { v: 0 };
      el.textContent = formato.format(0);
      // El HTML trae el valor real; al revertir el contexto se devuelve.
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

  const mm = gsap.matchMedia();

  mm.add(
    {
      escritorio: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      movil: "(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)",
    },
    (contexto) => {
      const { escritorio = false } = contexto.conditions ?? {};
      const restaurar: (() => void)[] = [];

      // En el orden del documento: ScrollTrigger calcula posiciones en orden
      // de creación, y un disparador creado antes que la sección fijada que
      // tiene encima quedaría desplazado.
      hero();
      servicios();
      faena(escritorio);
      nosotros();
      casos(restaurar);

      ScrollTrigger.refresh();
      return () => restaurar.forEach((f) => f());
    },
  );

  const refrescar = () => ScrollTrigger.refresh();
  window.addEventListener("load", refrescar);
  void document.fonts?.ready.then(refrescar);

  return () => {
    window.removeEventListener("load", refrescar);
    mm.revert();
  };
}
