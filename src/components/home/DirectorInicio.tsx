"use client";

import { useEffect } from "react";
import { alQuedarOcioso } from "@/components/brand/dron/condiciones";

/**
 * Monta las animaciones GSAP del inicio (ver `animacionesInicio.ts`). No
 * renderiza nada.
 *
 * GSAP se importa de forma dinámica y recién después de `load`: el hero es el
 * LCP de la portada y nada de esto puede competir con él. Si el import falla,
 * la portada queda exactamente como sin animaciones.
 */
export function DirectorInicio() {
  useEffect(() => {
    let cancelado = false;
    let limpiar: (() => void) | undefined;

    const cancelarOcio = alQuedarOcioso(
      () => {
        import("./animacionesInicio")
          .then(({ crearAnimacionesInicio }) => {
            if (!cancelado) limpiar = crearAnimacionesInicio();
          })
          .catch((error) => console.warn("[ags] no se pudieron iniciar las animaciones", error));
      },
      { espera: 1500 },
    );

    return () => {
      cancelado = true;
      cancelarOcio();
      limpiar?.();
    };
  }, []);

  return null;
}
