"use client";

import { useEffect, useRef } from "react";
import { alQuedarOcioso, puedeMontarDron } from "./dron/condiciones";

/**
 * Dron protagonista con guion por sección.
 *
 * Es el mismo modelo, la misma escena y el mismo piloto que el acompañante
 * (ver `./dron/*`). Cambia a dónde vuela: sigue las secciones marcadas con
 * `data-dron-escena` según el guion que se le pase, y escanea los elementos
 * `data-dron-haz` de cada una (ver `./dron/coreografiaNarrativa.ts`).
 *
 * Los guiones son módulos con funciones, así que no pueden viajar como props
 * desde un componente de servidor: se eligen por nombre y se importan acá.
 *
 * Un solo canvas para toda la página: el dron atraviesa las secciones, no se
 * crea uno por sección.
 */

const GUIONES = {
  inicio: () =>
    import("@/components/vistaPrevia/inicio/guionVistaPrevia").then((m) => m.guionVistaPrevia),
};

export function DronNarrativo({
  guion,
  anchoMinimo = 0,
}: {
  guion: keyof typeof GUIONES;
  /** Bajo este ancho no se monta. En el inicio, 1024 (ver guionInicio.ts). */
  anchoMinimo?: number;
}) {
  const capaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const capa = capaRef.current;
    if (!capa) return;
    if (!puedeMontarDron({ anchoMinimo })) return;

    let cancelado = false;
    let limpiar: (() => void) | undefined;

    async function montar() {
      if (cancelado || !capa) return;

      const canvas = document.createElement("canvas");
      canvas.setAttribute("aria-hidden", "true");
      canvas.style.cssText = "position:absolute;top:0;left:0;will-change:transform,opacity;opacity:0";
      capa.append(canvas);

      try {
        const [{ crearEscena }, { crearCoreografiaNarrativa }, datosGuion] = await Promise.all([
          import("./dron/escena"),
          import("./dron/coreografiaNarrativa"),
          GUIONES[guion](),
        ]);
        if (cancelado) {
          canvas.remove();
          return;
        }

        const tactil = window.matchMedia("(pointer: coarse)").matches;
        const escena = await crearEscena(canvas, { dprMaximo: tactil ? 1.5 : 2 });
        if (cancelado) {
          escena.dispose();
          canvas.remove();
          return;
        }

        const coreografia = crearCoreografiaNarrativa(capa, escena, canvas, datosGuion);
        limpiar = () => {
          coreografia.destruir();
          escena.dispose();
          canvas.remove();
        };
      } catch (error) {
        // La página funciona igual sin el dron: se retira en silencio.
        console.warn("[ags] no se pudo iniciar el dron narrativo", error);
        canvas.remove();
      }
    }

    // Nunca antes de `load` y con el hilo principal ocioso: no compite con el
    // LCP del hero.
    const cancelarOcio = alQuedarOcioso(() => void montar(), { espera: 2000 });

    return () => {
      cancelado = true;
      cancelarOcio();
      limpiar?.();
    };
  }, [guion, anchoMinimo]);

  return (
    <div
      ref={capaRef}
      aria-hidden="true"
      // z-30, igual que el acompañante: sobre el contenido, bajo el navbar.
      // `overflow-hidden` evita scroll horizontal cuando el dron sale de escena.
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
    />
  );
}
