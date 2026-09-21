"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  ArrowsIn,
  ArrowsOut,
  CaretLeft,
  CaretRight,
  MagnifyingGlassPlus,
  X,
} from "@phosphor-icons/react/dist/ssr";
import type { PageFlip } from "page-flip";
import type { Contratapa, PaginaBrochure } from "@/content/brochure";

/**
 * Librito del brochure, con hojeo realista (StPageFlip).
 *
 * CÓMO SE USA
 * -----------
 * Se arrastra la esquina de la hoja, se hace clic sobre ella, se usan las
 * flechas del teclado o los botones, o se salta a una página desde las
 * miniaturas. A doble página desde ~960px de ancho de libro; en pantallas
 * chicas, a una.
 *
 * LEGIBILIDAD
 * -----------
 * Las páginas del PDF son horizontales (16:9). A doble página, el texto chico
 * de las diapositivas queda al límite. Por eso hay dos salidas: pantalla
 * completa y "Ampliar", que abre las páginas visibles a todo el ancho con la
 * imagen de 2400px.
 *
 * REACT Y LA LIBRERÍA
 * -------------------
 * StPageFlip mueve y reestiliza los nodos de las hojas. Si esos nodos fueran
 * de React, al desmontar React intentaría quitar elementos que ya no están
 * donde los dejó. Así que React solo es dueño de un contenedor vacío: las
 * hojas se crean acá, a mano, dentro de un nodo propio que se elimina entero
 * al salir de la página.
 */

const MEDIA_REDUCIDO = "(prefers-reduced-motion: reduce)";

const suscribirNada = () => () => {};

function crearHoja(p: PaginaBrochure, i: number): HTMLElement {
  const hoja = document.createElement("div");
  hoja.className = "librito-pagina";
  // Portada y contratapa van en cartón: se voltean rígidas, sin curvarse.
  if (i === 0) hoja.dataset.density = "hard";

  const img = document.createElement("img");
  img.src = p.src;
  img.srcset = `${p.src} 1200w, ${p.srcGrande} 2400w`;
  img.sizes = "(min-width: 1024px) 50vw, 100vw";
  img.alt = p.alt;
  img.decoding = "async";
  img.draggable = false;
  // Las tres primeras se ven al abrir; el resto se pide al acercarse.
  img.loading = i < 3 ? "eager" : "lazy";
  hoja.append(img);
  return hoja;
}

function crearContratapa(c: Contratapa): HTMLElement {
  const hoja = document.createElement("div");
  hoja.className = "librito-pagina librito-contratapa";
  hoja.dataset.density = "hard";

  const interior = document.createElement("div");
  interior.className = "librito-contratapa__interior";

  const logo = document.createElement("img");
  logo.src = "/brand/ags-logo-negativo.svg";
  logo.alt = "AGS Soluciones Industriales Aéreas";
  logo.className = "librito-contratapa__logo";
  logo.draggable = false;

  const titulo = document.createElement("p");
  titulo.className = "librito-contratapa__titulo";
  titulo.textContent = c.titulo;

  const datos = document.createElement("ul");
  datos.className = "librito-contratapa__datos";
  for (const dato of [c.correo, c.telefono]) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = dato.href;
    a.textContent = dato.label;
    li.append(a);
    datos.append(li);
  }
  for (const texto of [c.sitio, c.ciudad]) {
    const li = document.createElement("li");
    li.textContent = texto;
    datos.append(li);
  }

  interior.append(logo, titulo, datos);
  hoja.append(interior);
  return hoja;
}

export function Librito({
  titulo,
  ancho,
  alto,
  paginas,
  contratapa,
}: {
  titulo: string;
  ancho: number;
  alto: number;
  paginas: PaginaBrochure[];
  contratapa: Contratapa;
}) {
  const escenarioRef = useRef<HTMLDivElement>(null);
  const libroRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<PageFlip | null>(null);
  const dialogoRef = useRef<HTMLDialogElement>(null);

  const [actual, setActual] = useState(0);
  const [horizontal, setHorizontal] = useState(true);
  const [listo, setListo] = useState(false);
  const [completa, setCompleta] = useState(false);
  const [ampliada, setAmpliada] = useState(false);

  // Safari en iPhone no permite pantalla completa sobre un elemento: ahí el
  // botón no se muestra en vez de no hacer nada.
  const admiteCompleta = useSyncExternalStore(
    suscribirNada,
    () => document.fullscreenEnabled === true,
    () => false,
  );

  const total = paginas.length + 1;

  /* ---------------------------------------------------------------- */
  /* Montaje del libro                                                 */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    const libro = libroRef.current;
    if (!libro) return;

    let cancelado = false;
    let flip: PageFlip | null = null;
    const nodo = document.createElement("div");
    libro.append(nodo);

    import("page-flip")
      .then(({ PageFlip }) => {
        if (cancelado) return;
        const reducido = window.matchMedia(MEDIA_REDUCIDO).matches;
        const hojas = [...paginas.map(crearHoja), crearContratapa(contratapa)];
        nodo.append(...hojas);

        flip = new PageFlip(nodo, {
          width: ancho,
          height: alto,
          size: "stretch",
          // StPageFlip pasa a una sola página cuando el contenedor mide menos
          // de `minWidth * 2`. Con 480, una tablet de 768px ve una página
          // legible en vez de dos diminutas. No fija un ancho mínimo real: en
          // un teléfono de 320px la página se achica igual (verificado en
          // Render.calculateBoundsRect).
          minWidth: 480,
          maxWidth: ancho,
          minHeight: Math.round((480 * alto) / ancho),
          maxHeight: alto,
          showCover: true,
          usePortrait: true,
          mobileScrollSupport: true,
          drawShadow: !reducido,
          maxShadowOpacity: 0.45,
          showPageCorners: !reducido,
          flippingTime: reducido ? 1 : 850,
        });

        flip.on("flip", (e) => setActual(Number(e.data)));
        flip.on("changeOrientation", (e) => setHorizontal(e.data === "landscape"));
        flip.on("init", (e) => {
          setHorizontal(e.object.getOrientation() === "landscape");
          setListo(true);
        });

        flip.loadFromHTML(hojas);
        flipRef.current = flip;
      })
      .catch((error) => console.warn("[ags] no se pudo iniciar el librito", error));

    return () => {
      cancelado = true;
      flipRef.current = null;
      flip?.destroy();
      nodo.remove();
    };
  }, [paginas, contratapa, ancho, alto]);

  /* ---------------------------------------------------------------- */
  /* Teclado y pantalla completa                                       */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    function alPulsar(e: KeyboardEvent) {
      const destino = e.target as HTMLElement | null;
      if (destino?.closest("input, textarea, select, [contenteditable]")) return;
      if (dialogoRef.current?.open) return;
      if (e.key === "ArrowRight") flipRef.current?.flipNext();
      else if (e.key === "ArrowLeft") flipRef.current?.flipPrev();
    }
    function alCambiarCompleta() {
      setCompleta(document.fullscreenElement === escenarioRef.current);
    }
    window.addEventListener("keydown", alPulsar);
    document.addEventListener("fullscreenchange", alCambiarCompleta);
    return () => {
      window.removeEventListener("keydown", alPulsar);
      document.removeEventListener("fullscreenchange", alCambiarCompleta);
    };
  }, []);

  function alternarCompleta() {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void escenarioRef.current?.requestFullscreen().catch(() => {});
  }

  /* ---------------------------------------------------------------- */
  /* Estado derivado                                                   */
  /* ---------------------------------------------------------------- */

  // A doble página la portada va sola y después las hojas van de a pares.
  const visibles =
    horizontal && actual > 0 ? [actual, actual + 1].filter((i) => i < total) : [actual];
  const etiqueta = visibles.map((i) => i + 1).join("–");
  const ampliables = visibles.filter((i) => i < paginas.length);
  const alInicio = actual === 0;
  const alFinal = Math.max(...visibles) >= total - 1;

  function abrirAmpliada() {
    setAmpliada(true);
    dialogoRef.current?.showModal();
  }

  const boton =
    "flex h-11 items-center justify-center gap-2 border border-white/15 px-4 text-sm font-medium text-white transition-colors hover:border-white/50 hover:bg-white/5 disabled:pointer-events-none disabled:opacity-35";

  return (
    <div ref={escenarioRef} className="librito mx-auto w-full max-w-[1600px] px-4 sm:px-8">
      <div
        role="region"
        aria-roledescription="libro"
        aria-label={titulo}
        className="librito-marco relative"
      >
        {/* Reserva el alto antes de que cargue la librería: sin esto, el
            bloque de controles salta cuando aparece el libro. */}
        {!listo ? (
          <div aria-hidden="true" className="librito-reserva">
            {/* eslint-disable-next-line @next/next/no-img-element -- reserva
                momentánea con la misma imagen que usará el libro */}
            <img src={paginas[0]?.src} alt="" className="librito-reserva__portada" />
          </div>
        ) : null}
        <div ref={libroRef} className={listo ? "" : "pointer-events-none absolute inset-0 opacity-0"} />
      </div>

      {/* ---------------- Controles ---------------- */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => flipRef.current?.flipPrev()}
            disabled={!listo || alInicio}
            aria-label="Página anterior"
            className={boton}
          >
            <CaretLeft size={16} weight="bold" aria-hidden="true" />
          </button>
          <p className="num min-w-[7.5rem] text-center text-sm text-steel-300" aria-live="polite">
            <span className="sr-only">Página </span>
            <span className="font-semibold text-white">{etiqueta}</span>
            <span className="text-steel-500"> / {total}</span>
          </p>
          <button
            type="button"
            onClick={() => flipRef.current?.flipNext()}
            disabled={!listo || alFinal}
            aria-label="Página siguiente"
            className={boton}
          >
            <CaretRight size={16} weight="bold" aria-hidden="true" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={abrirAmpliada}
            disabled={!listo || ampliables.length === 0}
            className={boton}
          >
            <MagnifyingGlassPlus size={16} aria-hidden="true" />
            Ampliar
          </button>
          {admiteCompleta ? (
            <button type="button" onClick={alternarCompleta} className={boton}>
              {completa ? (
                <ArrowsIn size={16} aria-hidden="true" />
              ) : (
                <ArrowsOut size={16} aria-hidden="true" />
              )}
              <span className="hidden sm:inline">
                {completa ? "Salir de pantalla completa" : "Pantalla completa"}
              </span>
              <span className="sr-only sm:hidden">
                {completa ? "Salir de pantalla completa" : "Pantalla completa"}
              </span>
            </button>
          ) : null}
        </div>
      </div>

      {/* ---------------- Miniaturas ---------------- */}
      <ol className="librito-miniaturas mt-6 flex gap-3 overflow-x-auto pb-2">
        {paginas.map((p, i) => (
          <li key={p.src} className="shrink-0">
            <button
              type="button"
              onClick={() => flipRef.current?.flip(i)}
              disabled={!listo}
              aria-current={visibles.includes(i) ? "page" : undefined}
              aria-label={`Ir a la página ${i + 1}: ${p.titulo}`}
              className={`group block w-28 text-left sm:w-32 ${
                visibles.includes(i) ? "" : "opacity-55 hover:opacity-100"
              } transition-opacity`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- miniatura
                  de la misma imagen que ya descargó el libro */}
              <img
                src={p.src}
                alt=""
                loading="lazy"
                className={`aspect-[16/9] w-full border object-cover ${
                  visibles.includes(i) ? "border-orange" : "border-white/10"
                }`}
              />
              <span className="mt-2 block truncate text-[0.75rem] text-steel-400">
                <span className="num text-steel-500">{String(i + 1).padStart(2, "0")}</span>{" "}
                {p.titulo}
              </span>
            </button>
          </li>
        ))}
        <li className="shrink-0">
          <button
            type="button"
            onClick={() => flipRef.current?.flip(total - 1)}
            disabled={!listo}
            aria-current={visibles.includes(total - 1) ? "page" : undefined}
            aria-label={`Ir a la página ${total}: contratapa`}
            className={`block w-28 text-left transition-opacity sm:w-32 ${
              visibles.includes(total - 1) ? "" : "opacity-55 hover:opacity-100"
            }`}
          >
            <span
              className={`flex aspect-[16/9] w-full items-center justify-center border bg-steel-900 ${
                visibles.includes(total - 1) ? "border-orange" : "border-white/10"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- logotipo SVG */}
              <img src="/brand/ags-logo-negativo.svg" alt="" className="w-1/2" />
            </span>
            <span className="mt-2 block truncate text-[0.75rem] text-steel-400">
              <span className="num text-steel-500">{String(total).padStart(2, "0")}</span>{" "}
              Contratapa
            </span>
          </button>
        </li>
      </ol>

      {/* ---------------- Ampliación ---------------- */}
      <dialog
        ref={dialogoRef}
        onClose={() => setAmpliada(false)}
        aria-label={`${titulo}, página ${etiqueta} ampliada`}
        className="librito-dialogo"
      >
        <form method="dialog" className="sticky top-0 z-10 flex justify-end p-3 sm:p-5">
          <button
            type="submit"
            className="flex h-11 items-center gap-2 border border-white/20 bg-steel-950/80 px-4 text-sm font-medium text-white backdrop-blur-sm hover:border-white/60"
          >
            <X size={16} weight="bold" aria-hidden="true" />
            Cerrar
          </button>
        </form>
        {ampliada ? (
          <div className="mx-auto flex max-w-[1800px] flex-col gap-6 px-3 pb-10 sm:px-8">
            {ampliables.map((i) => (
              // eslint-disable-next-line @next/next/no-img-element -- imagen de 2400px elegida a mano, sin reescalar
              <img
                key={i}
                src={paginas[i].srcGrande}
                alt={paginas[i].alt}
                className="block h-auto w-full"
              />
            ))}
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
