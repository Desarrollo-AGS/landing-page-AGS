"use client";

import { useEffect } from "react";

/**
 * Monta las animaciones de la experiencia. No renderiza nada.
 *
 * GSAP y ScrollTrigger se importan de forma dinámica: los capítulos son HTML
 * de servidor completo y legible, y la capa de movimiento llega después. Si el
 * import falla, la página se queda en su versión estática, que es la misma que
 * ve quien tiene movimiento reducido.
 */
export function Director() {
  useEffect(() => {
    const raiz = document.querySelector<HTMLElement>("[data-iao]");
    if (!raiz) return;

    let cancelado = false;
    let limpiar: (() => void) | undefined;

    import("./animaciones")
      .then(({ crearAnimaciones }) => {
        if (!cancelado) limpiar = crearAnimaciones(raiz);
      })
      .catch((error) => console.warn("[ags] no se pudieron iniciar las animaciones", error));

    return () => {
      cancelado = true;
      limpiar?.();
    };
  }, []);

  return null;
}
