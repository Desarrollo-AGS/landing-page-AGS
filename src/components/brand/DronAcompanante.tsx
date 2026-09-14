"use client";

import { useEffect, useRef } from "react";

/**
 * Dron 3D que recorre la portada ejecutando una operación aérea.
 *
 * ESTE COMPONENTE SOLO DECIDE SI SE MONTA
 * ---------------------------------------
 * La escena, el modelo, la coreografía y los efectos viven en `./dron/*` y se
 * importan de forma dinámica, así que ni Three.js ni GSAP entran en el bundle
 * inicial. Acá solo están las condiciones para no cargarlos:
 *
 *   · `prefers-reduced-motion` activo         no se monta
 *   · viewport bajo 1024px                    no se monta
 *   · `saveData` o conexión 2g/3g declarada   no se monta
 *   · sin WebGL                               no se monta
 *
 * SOBRE MÓVIL. La versión simplificada para móvil está deliberadamente fuera.
 * Medido sobre el build de producción con perfil móvil (4G lento, CPU x4), el
 * modelo son 505 KB más las librerías, y montarlo empujaba el LCP de 1,2 s a
 * 3,8 s. El brief de AGS fija Lighthouse sobre 80 en móvil, y esa exigencia
 * gana. En móvil la narrativa la sostienen las propias secciones.
 *
 * Además espera a `load` y a que el hilo principal quede ocioso: nada de esto
 * puede competir con el LCP.
 */

type Conexion = { saveData?: boolean; effectiveType?: string };

export function DronAcompanante() {
  const capaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const capa = capaRef.current;
    if (!capa) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    const c = (navigator as Navigator & { connection?: Conexion }).connection;
    if (c?.saveData === true) return;
    if (typeof c?.effectiveType === "string" && /^(slow-2g|2g|3g)$/.test(c.effectiveType))
      return;

    // Sonda de WebGL: hay equipos y navegadores endurecidos donde el contexto
    // no se concede. Sin esto, el fallo aparecería recién después de haber
    // descargado el modelo y las librerías.
    const sonda = document.createElement("canvas");
    if (!(sonda.getContext("webgl2") ?? sonda.getContext("webgl"))) return;

    let cancelado = false;
    let limpiar: (() => void) | undefined;
    let idOcioso: number | undefined;

    async function montar() {
      if (cancelado || !capa) return;

      const canvas = document.createElement("canvas");
      canvas.setAttribute("aria-hidden", "true");
      canvas.style.cssText = "position:absolute;top:0;left:0;will-change:transform;opacity:0";
      capa.append(canvas);

      try {
        const [{ crearEscena }, { crearCoreografia }] = await Promise.all([
          import("./dron/escena"),
          import("./dron/coreografia"),
        ]);
        if (cancelado) {
          canvas.remove();
          return;
        }

        const escena = await crearEscena(canvas);
        if (cancelado) {
          escena.dispose();
          canvas.remove();
          return;
        }

        const coreografia = crearCoreografia(capa, escena, canvas);
        limpiar = () => {
          coreografia.destruir();
          escena.dispose();
          canvas.remove();
        };
      } catch (error) {
        // El sitio funciona igual sin el dron: es una capa ambiental. Si algo
        // falla, se retira en silencio en vez de romper la página.
        console.warn("[ags] no se pudo iniciar el dron", error);
        canvas.remove();
      }
    }

    function programar() {
      if (cancelado) return;
      idOcioso =
        typeof window.requestIdleCallback === "function"
          ? window.requestIdleCallback(() => void montar(), { timeout: 3000 })
          : window.setTimeout(() => void montar(), 1200);
    }

    if (document.readyState === "complete") programar();
    else window.addEventListener("load", programar, { once: true });

    return () => {
      cancelado = true;
      window.removeEventListener("load", programar);
      if (idOcioso !== undefined) {
        if (typeof window.cancelIdleCallback === "function")
          window.cancelIdleCallback(idOcioso);
        else clearTimeout(idOcioso);
      }
      limpiar?.();
    };
  }, []);

  return (
    <div
      ref={capaRef}
      aria-hidden="true"
      // z-30 lo deja por debajo del navbar (z-40): el dron vuela sobre el
      // contenido, nunca sobre la navegación. `overflow-hidden` evita que la
      // trayectoria genere scroll horizontal en ningún ancho.
      className="pointer-events-none fixed inset-0 z-30 hidden overflow-hidden lg:block"
    />
  );
}
