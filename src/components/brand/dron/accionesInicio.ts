/**
 * Acciones del dron en el inicio: el recorrido, paso a paso.
 *
 * La coreografía completa, en el orden en que se lee la portada:
 *
 *   1. Aparece pequeño sobre el botón "Contáctanos" del navbar, del ancho del
 *      botón, y lo escanea con un barrido horizontal, mirando a la izquierda.
 *   2. Sale en curva por encima del antetítulo del hero hacia el costado
 *      izquierdo, y sigue bajando por la canaleta durante la franja de
 *      clientes (ver `guionInicio.ts`): el banner solo no da scroll suficiente
 *      para que el viaje no parezca un dardo.
 *   3. Sigue recto hasta la foto de servicios y hace fotogrametría sobre ella:
 *      12 waypoints en serpentina que terminan justo cuando termina el scroll
 *      de la lista de servicios.
 *   4. Se oculta para dejarle la pantalla al video de faena.
 *   5. Reaparece sobre las cifras de "Proyectos ya ejecutados" y las escanea.
 *      Cuando las cifras se van, baja por el costado derecho mirando a la
 *      izquierda. Las fichas de proyectos NO se escanean.
 *   6. En software aterriza entre las dos tarjetas: las hélices se van
 *      deteniendo con el scroll hasta parar, y el dron se queda ahí, anclado a
 *      ese punto, mientras se sigue bajando al footer.
 *
 * PIDEN DESTINOS, NO POSICIONES
 * -----------------------------
 * Lo que devuelve `cuadro` es a dónde QUIERE ir el dron. Quien lo lleva es el
 * muelle de `vuelo.ts`, así que acá no hay que suavizar nada: alcanza con que
 * el destino se mueva de forma continua con el progreso. Por eso estas
 * acciones se leen como un plan de vuelo —posarse, recorrer, bajar— y no como
 * una curva de animación.
 *
 * EMPALMES
 * --------
 * Cada acción arranca donde terminó la anterior: servicios entra desde la
 * canaleta izquierda, casos entra por el borde derecho, y software arranca en
 * el punto donde casos deja al dron. El muelle taparía un salto, pero se
 * notaría como un tirón: mejor que no haya salto.
 */

import { gsap } from "gsap";
import type { Accion, FabricaAccion, Vista } from "./coreografiaNarrativa";

const { clamp } = gsap.utils;
const NS = "http://www.w3.org/2000/svg";
const NARANJA = "#ff5500";

/**
 * Columna por la que el dron baja el costado izquierdo del banner: por fuera
 * del contenedor, en la canaleta.
 *
 * El margen del contenedor son 92px a 1440 y el dron mide ~150 a escala de
 * vuelo, así que en este tramo baja de tamaño (ver `ESCALA_COSTADO`): a escala
 * normal no cabe entre el borde de la ventana y el texto, y se le monta encima.
 */
const costadoIzquierdo = (v: Vista) => clamp(48, 110, v.izq - 30);

/** Escala mientras baja por la canaleta, pegado al borde. */
const ESCALA_COSTADO = 0.22;

/** Columna por la que baja el costado derecho, después de las cifras. */
const costadoDerecho = (v: Vista) => v.w - 95;

/** Suavizado en los extremos: sale y llega sin tirón. */
const suave = (t: number) => t * t * (3 - 2 * t);

const entre = (a: number, b: number, t: number) => a + (b - a) * t;

function svgEn(capa: HTMLElement): SVGSVGElement {
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("class", "absolute inset-0 h-full w-full");
  svg.setAttribute("aria-hidden", "true");
  svg.style.opacity = "0";
  capa.append(svg);
  return svg;
}

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
/* 1 y 2 · Hero: botón del navbar, curva y bajada por la izquierda      */
/* ------------------------------------------------------------------ */

const hero: FabricaAccion = () => ({
  cuadro(c) {
    // El botón vive en el navbar, fuera de la sección: se busca en el header.
    const boton = document.querySelector<HTMLElement>('header a[href="/contacto"]');
    const texto = c.el.querySelector<HTMLElement>("[data-hero-texto]");
    if (!boton || !texto) return;
    const rb = boton.getBoundingClientRect();
    const rt = texto.getBoundingClientRect();
    if (rb.width === 0) return;

    // El hero arranca en 0,5 (se mide contra el centro de la ventana).
    const t = clamp(0, 1, (c.progreso - 0.5) / 0.5);

    // Tamaño del paso 1: el dron no es más ancho que el botón. El modelo
    // ocupa ~85% del lado del canvas.
    const escalaBoton = clamp(0.16, 0.5, rb.width / (0.85 * c.lado));
    const posadoEnBoton = { x: rb.left + rb.width / 2, y: rb.bottom + rb.height * 0.75 };
    const izquierda = costadoIzquierdo(c.vista);

    // --- Paso 1: escanea el botón ---
    if (t < 0.32) {
      return {
        ...posadoEnBoton,
        s: escalaBoton,
        sensor: 1,
        objetivo: rb,
        hazHorizontal: true,
        marcar: null,
        mirarHacia: -1,
      };
    }

    // --- Paso 2: curva por encima del antetítulo, hacia el costado izquierdo ---
    //
    // El tramo se toma TODO el resto del banner, y la bajada por la canaleta
    // sigue en `clientes`. Repartido así porque el banner mide una pantalla:
    // metiendo el viaje entero acá, el dron cruzaba ~1200px en ~200px de
    // scroll y se veía como un dardo.
    const u = suave((t - 0.32) / 0.68);
    // Bézier cuadrática: del botón, pasando por encima del antetítulo, hasta
    // el costado izquierdo del banner.
    const control = { x: rt.left + rt.width * 0.35, y: rt.top - 95 };
    const fin = { x: izquierda, y: c.vista.h * 0.42 };
    const v = 1 - u;
    return {
      x: v * v * posadoEnBoton.x + 2 * v * u * control.x + u * u * fin.x,
      y: v * v * posadoEnBoton.y + 2 * v * u * control.y + u * u * fin.y,
      s: entre(escalaBoton, ESCALA_COSTADO, u),
      sensor: 0,
      objetivo: null,
      marcar: null,
    };
  },
});

/* ------------------------------------------------------------------ */
/* 3 · Servicios: fotogrametría sobre la foto                          */
/* ------------------------------------------------------------------ */

/** Dónde termina el hero y, por lo tanto, dónde entra servicios. */
const ENTRADA_SERVICIOS = 0.07;

const servicios: FabricaAccion = (capa) => {
  const COLUMNAS = 4;
  const FILAS = 3;
  /** Plan de vuelo en serpentina, en fracciones de la foto. */
  const ruta: { x: number; y: number }[] = [];
  for (let f = 0; f < FILAS; f++) {
    for (let k = 0; k < COLUMNAS; k++) {
      const columna = f % 2 === 0 ? k : COLUMNAS - 1 - k;
      ruta.push({ x: (columna + 0.5) / COLUMNAS, y: (f + 0.5) / FILAS });
    }
  }

  /**
   * Puntos de cada captura, deterministas: la misma semilla da siempre la
   * misma nube. Así, al subir y volver a bajar, la nube se rehace idéntica.
   */
  function puntosDe(indice: number, w: number, h: number) {
    let s = indice * 9301 + 49297;
    const azar = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    const p = ruta[indice];
    return Array.from({ length: 7 }, () => ({
      x: p.x * w + (azar() - 0.5) * (w / COLUMNAS) * 1.1,
      y: p.y * h + (azar() - 0.5) * (h / FILAS) * 1.1,
    }));
  }

  const svg = svgEn(capa);
  const defs = nodo("defs", {}, svg);
  const recorte = nodo("clipPath", { id: "dron-fotogrametria" }, defs);
  const rectRecorte = nodo("rect", { x: 0, y: 0, width: 0, height: 0 }, recorte);
  const recortado = nodo("g", { "clip-path": "url(#dron-fotogrametria)" }, svg);
  const lienzo = nodo("g", {}, recortado);
  const capturas = nodo("g", {}, lienzo);
  const malla = nodo("path", { fill: "none", stroke: NARANJA, "stroke-width": 0.8, opacity: 0 }, lienzo);
  const fondoHud = nodo("rect", { x: 8, y: 11, width: 0, height: 19, fill: "rgba(0,26,43,0.78)" }, lienzo);
  const hud = nodo(
    "text",
    {
      x: 14,
      y: 24,
      fill: "#ffffff",
      "font-size": 10,
      "font-family": "ui-monospace, SFMono-Regular, Menlo, monospace",
      "letter-spacing": "0.14em",
    },
    lienzo,
  );

  let foto: HTMLElement | null = null;
  let rect = new DOMRect();
  /** Un grupo por captura: se crean y se destruyen siguiendo el scroll. */
  const grupos: SVGGElement[] = [];
  let mallaHecha = -1;
  let textoHud = "";

  function capturar(indice: number) {
    const w = (rect.width / COLUMNAS) * 1.3;
    const h = (rect.height / FILAS) * 1.3;
    const p = ruta[indice];
    const cx = p.x * rect.width;
    const cy = p.y * rect.height;

    const grupo = nodo("g", {}, capturas);
    const huella = nodo(
      "rect",
      { x: cx - w / 2, y: cy - h / 2, width: w, height: h, fill: "rgba(255,85,0,0.08)", stroke: NARANJA, "stroke-width": 1 },
      grupo,
    );
    gsap.fromTo(huella, { opacity: 1 }, { opacity: 0.2, duration: 1.4, ease: "power2.out" });

    const destello = nodo("rect", { x: cx - w / 2, y: cy - h / 2, width: w, height: h, fill: "#ffffff" }, grupo);
    gsap.fromTo(destello, { opacity: 0.45 }, { opacity: 0, duration: 0.35, onComplete: () => destello.remove() });

    for (const [k, punto] of puntosDe(indice, rect.width, rect.height).entries()) {
      const circulo = nodo("circle", { cx: punto.x, cy: punto.y, r: 1.8, fill: "#ffffff" }, grupo);
      gsap.fromTo(
        circulo,
        { opacity: 0, attr: { r: 5 } },
        { opacity: 0.9, attr: { r: 1.8 }, duration: 0.5, delay: 0.08 + k * 0.05, ease: "back.out(2)" },
      );
    }
    grupos.push(grupo);
  }

  /** Une cada punto con sus dos vecinos más cercanos: malla densificada. */
  function construirMalla(hasta: number) {
    const nube = Array.from({ length: hasta }, (_, i) => puntosDe(i, rect.width, rect.height)).flat();
    let d = "";
    for (const a of nube) {
      const vecinos = nube
        .filter((b) => b !== a)
        .map((b) => ({ b, d: (a.x - b.x) ** 2 + (a.y - b.y) ** 2 }))
        .sort((m, n) => m.d - n.d)
        .slice(0, 2);
      for (const { b } of vecinos) d += `M${a.x.toFixed(1)} ${a.y.toFixed(1)}L${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
    }
    malla.setAttribute("d", d);
    mallaHecha = hasta;
  }

  return {
    entrar(c) {
      foto = c.el.querySelector<HTMLElement>("[data-servicios-foto]");
      gsap.to(svg, { opacity: 1, duration: 0.5, overwrite: true });
    },

    cuadro(c) {
      // Sin la foto (bajo 1024px está oculta) rige el guion.
      if (!foto || foto.offsetParent === null) return;
      rect = foto.getBoundingClientRect();

      const huellaW = (rect.width / COLUMNAS) * 1.3;
      const huellaH = (rect.height / FILAS) * 1.3;
      const primer = ruta[0];

      // Entrada: viene bajando por la canaleta y se mete sobre el primer
      // waypoint. Sin esto habría un salto al cambiar de sección.
      if (c.progreso < ENTRADA_SERVICIOS) {
        const u = suave(c.progreso / ENTRADA_SERVICIOS);
        while (grupos.length) grupos.pop()?.remove();
        mallaHecha = -1;
        malla.setAttribute("d", "");
        gsap.set(malla, { opacity: 0 });
        return {
          x: entre(costadoIzquierdo(c.vista), rect.left + primer.x * rect.width, u),
          y: entre(
            c.vista.h * 0.9,
            Math.max(rect.top + 26, rect.top + primer.y * rect.height - huellaH * 0.5 - 60),
            u,
          ),
          s: entre(ESCALA_COSTADO, 0.3, u),
          sensor: 0,
          objetivo: null,
          marcar: null,
        };
      }

      // El plan de vuelo se estira sobre el resto del scroll de la sección: el
      // último disparo cae junto con el último servicio de la lista.
      const avance =
        clamp(0, 0.9999, (c.progreso - ENTRADA_SERVICIOS) / (0.97 - ENTRADA_SERVICIOS)) * ruta.length;
      const i = Math.floor(avance);
      const f = avance - i;
      const a = ruta[i];
      const b = ruta[Math.min(i + 1, ruta.length - 1)];
      // Se detiene sobre cada waypoint y recién después avanza al siguiente.
      const t = suave(clamp(0, 1, (f - 0.35) / 0.65));
      const nadir = {
        x: rect.left + (a.x + (b.x - a.x) * t) * rect.width,
        y: rect.top + (a.y + (b.y - a.y) * t) * rect.height,
      };

      // Las capturas siguen al scroll en los dos sentidos.
      const hechas = f > 0.08 ? i + 1 : i;
      while (grupos.length > hechas) grupos.pop()?.remove();
      while (grupos.length < hechas) capturar(grupos.length);

      // La malla cierra el levantamiento, al final del scroll de servicios.
      const cerrando = c.progreso > 0.93 && grupos.length >= ruta.length - 1;
      if (cerrando && mallaHecha !== grupos.length) {
        construirMalla(grupos.length);
        gsap.to(malla, { opacity: 0.5, duration: 1.2, ease: "power2.out", overwrite: true });
      } else if (!cerrando && mallaHecha !== -1) {
        gsap.to(malla, { opacity: 0, duration: 0.3, overwrite: true });
        mallaHecha = -1;
      }

      const texto =
        mallaHecha !== -1
          ? `MODELO 3D · ${grupos.length * 7} PUNTOS`
          : `FOTOGRAMETRÍA · IMG ${String(grupos.length).padStart(2, "0")}/${ruta.length}`;
      if (texto !== textoHud) {
        hud.textContent = texto;
        // Monoespaciada de 10px con 0,14em de tracking: ~7,4px por carácter.
        fondoHud.setAttribute("width", String(texto.length * 7.4 + 12));
        textoHud = texto;
      }

      // La retícula se recorta a la foto: en los waypoints del borde, la huella
      // con solape se salía y caía sobre el pie de imagen.
      const izq = Math.max(rect.left, nadir.x - huellaW / 2);
      const arriba = Math.max(rect.top, nadir.y - huellaH / 2);
      const der = Math.min(rect.right, nadir.x + huellaW / 2);
      const abajo = Math.min(rect.bottom, nadir.y + huellaH / 2);

      return {
        x: nadir.x,
        // Vuela sobre su huella, pero nunca más arriba del borde de la foto:
        // en la primera fila se salía del marco y el cono cruzaba el párrafo.
        y: Math.max(rect.top + 26, nadir.y - huellaH * 0.5 - 60),
        s: 0.3,
        sensor: 1,
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
      gsap.to(svg, { opacity: 0, duration: 0.4, overwrite: true });
    },

    destruir() {
      svg.remove();
    },
  };
};

/* ------------------------------------------------------------------ */
/* 5 · Casos: escanea las cifras y baja por el costado derecho          */
/* ------------------------------------------------------------------ */

/** Tramo de entrada: viene de fuera de pantalla, por la derecha. */
const ENTRADA_CASOS = 0.12;

const casos: FabricaAccion = () => ({
  cuadro(c) {
    const cifras = c.objetivos()[0];
    if (!cifras) return;
    const r = cifras.rect;
    const sobreLasCifras = { x: r.left + r.width / 2, y: Math.max(105, r.top - 145) };

    // Entrada: aparece por el borde derecho y se va a las cifras.
    if (c.progreso < ENTRADA_CASOS) {
      const u = suave(c.progreso / ENTRADA_CASOS);
      return {
        x: entre(c.vista.w * 1.12, sobreLasCifras.x, u),
        y: entre(c.vista.h * 0.22, sobreLasCifras.y, u),
        s: 0.3,
        o: clamp(0, 1, c.progreso / (ENTRADA_CASOS * 0.5)),
        sensor: u,
        objetivo: r,
        marcar: u > 0.6 ? cifras.el : null,
        hazHorizontal: true,
      };
    }

    // Mientras las cifras están a la vista, el dron se sostiene sobre ellas.
    if (r.bottom > 150 && r.top < c.vista.h * 0.8) {
      return {
        ...sobreLasCifras,
        s: 0.3,
        sensor: 1,
        objetivo: r,
        marcar: cifras.el,
        hazHorizontal: true,
      };
    }

    // Cuando se van, baja por el costado derecho mirando a la izquierda. Las
    // fichas de proyectos no se escanean.
    const t = suave(clamp(0, 1, (c.progreso - 0.3) / 0.65));
    return {
      x: costadoDerecho(c.vista),
      y: c.vista.h * entre(0.24, 0.82, t),
      s: 0.32,
      sensor: 0,
      objetivo: null,
      marcar: null,
      mirarHacia: -1,
    };
  },
});

/* ------------------------------------------------------------------ */
/* 6 · Software: aterrizaje entre las dos tarjetas                     */
/* ------------------------------------------------------------------ */

const software: FabricaAccion = () => ({
  cuadro(c) {
    const tarjetas = c.objetivos();
    if (tarjetas.length < 2) return;
    const [izquierda, derecha] = [...tarjetas].sort((m, n) => m.rect.left - n.rect.left);

    // El punto de apoyo: el hueco entre las dos tarjetas. Se mide en vivo, así
    // que una vez posado el dron se mueve con la página, como si estuviera
    // apoyado ahí.
    const suelo = {
      x: (izquierda.rect.right + derecha.rect.left) / 2,
      y: izquierda.rect.top + izquierda.rect.height * 0.42,
    };

    // Descenso: entra por donde lo dejó casos y baja al hueco.
    const t = suave(clamp(0, 1, (c.progreso - 0.04) / 0.34));
    const desde = { x: costadoDerecho(c.vista), y: c.vista.h * 0.82 };

    // Rotores: mientras más se baja, más se frenan, hasta detenerse.
    const regimen = clamp(0, 1, 1 - (c.progreso - 0.3) / 0.3);

    return {
      x: entre(desde.x, suelo.x, t),
      y: entre(desde.y, suelo.y, t),
      s: 0.34 - 0.06 * t,
      sensor: 0,
      objetivo: null,
      marcar: null,
      mirarHacia: entre(-1, 0.2, t),
      regimen,
    };
  },
});

export const accionesInicio: Record<string, FabricaAccion> = {
  hero,
  servicios,
  casos,
  software,
};

export type { Accion };
