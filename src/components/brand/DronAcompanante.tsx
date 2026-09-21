"use client";

import { useEffect, useRef } from "react";
import { alQuedarOcioso, puedeMontarDron } from "./dron/condiciones";

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

export function DronAcompanante() {
  const capaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const capa = capaRef.current;
    if (!capa) return;
    if (!puedeMontarDron({ anchoMinimo: 1024 })) return;

    let cancelado = false;
    let limpiar: (() => void) | undefined;

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

    const cancelarOcio = alQuedarOcioso(() => void montar());

    return () => {
      cancelado = true;
      cancelarOcio();
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
