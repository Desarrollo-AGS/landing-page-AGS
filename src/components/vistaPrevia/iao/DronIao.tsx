"use client";

import { useEffect, useRef } from "react";
import { alQuedarOcioso, puedeMontarDron } from "@/components/brand/dron/condiciones";

/**
 * Dron protagonista de /nosotros/brochure.
 *
 * Es el mismo modelo, la misma escena y el mismo piloto que el acompañante de
 * la portada (ver `./dron/*`). Cambia el guion: acá sigue los capítulos
 * marcados con `data-dron-escena`.
 *
 * DIFERENCIAS CON EL ACOMPAÑANTE
 * ------------------------------
 *   · También se monta en móvil. En la portada el dron competía con el póster
 *     del video por el LCP; acá el LCP es el titular, que pinta antes de que
 *     esto siquiera empiece a descargar. Con conexión medida o lenta, igual
 *     que allá, no se monta.
 *   · Avisa si quedó montado o no con `data-dron` en la raíz `[data-iao]`.
 *     La portada lo usa para mostrar la fotografía real del equipo cuando no
 *     hay dron 3D (movimiento reducido, sin WebGL, conexión lenta).
 *
 * Un solo canvas para toda la experiencia: el dron atraviesa los capítulos, no
 * se crea uno por sección.
 */
export function DronIao() {
  const capaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const capa = capaRef.current;
    if (!capa) return;
    const raiz = capa.closest<HTMLElement>("[data-iao]");
    const marcar = (estado: "activo" | "ausente") => {
      if (raiz) raiz.dataset.dron = estado;
    };

    if (!puedeMontarDron()) {
      marcar("ausente");
      return;
    }

    let cancelado = false;
    let limpiar: (() => void) | undefined;

    async function montar() {
      if (cancelado || !capa) return;

      const canvas = document.createElement("canvas");
      canvas.setAttribute("aria-hidden", "true");
      canvas.style.cssText = "position:absolute;top:0;left:0;will-change:transform,opacity;opacity:0";
      capa.append(canvas);

      try {
        const [{ crearEscena }, { crearCoreografiaNarrativa }] = await Promise.all([
          import("@/components/brand/dron/escena"),
          import("./coreografiaIao"),
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

        const coreografia = crearCoreografiaNarrativa(capa, escena, canvas);
        marcar("activo");
        limpiar = () => {
          coreografia.destruir();
          escena.dispose();
          canvas.remove();
        };
      } catch (error) {
        // La experiencia se entiende igual sin el dron 3D: la portada cae a la
        // fotografía del equipo real.
        console.warn("[ags] no se pudo iniciar el dron del brochure", error);
        canvas.remove();
        marcar("ausente");
      }
    }

    // Espera corta: el dron es parte de la portada, pero nunca antes de `load`.
    const cancelarOcio = alQuedarOcioso(() => void montar(), { espera: 1200 });

    return () => {
      cancelado = true;
      cancelarOcio();
      limpiar?.();
      if (raiz) delete raiz.dataset.dron;
    };
  }, []);

  return (
    <div
      ref={capaRef}
      aria-hidden="true"
      // z-30, igual que el acompañante: sobre el contenido, bajo el navbar.
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
    />
  );
}
