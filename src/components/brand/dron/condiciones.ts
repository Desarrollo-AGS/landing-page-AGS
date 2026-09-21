/**
 * Cuándo se puede montar un dron 3D, y cuándo hacerlo.
 *
 * Lo comparten el dron acompañante de la portada y el de /nosotros/brochure.
 * Este módulo NO importa Three.js ni GSAP: se carga con el componente y decide
 * si vale la pena descargar el resto.
 */

type Conexion = { saveData?: boolean; effectiveType?: string };

/**
 * `false` si hay movimiento reducido, conexión medida o lenta, un viewport más
 * angosto que `anchoMinimo`, o si el navegador no concede un contexto WebGL.
 */
export function puedeMontarDron({ anchoMinimo = 0 }: { anchoMinimo?: number } = {}): boolean {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (anchoMinimo > 0 && !window.matchMedia(`(min-width: ${anchoMinimo}px)`).matches) return false;

  const c = (navigator as Navigator & { connection?: Conexion }).connection;
  if (c?.saveData === true) return false;
  if (typeof c?.effectiveType === "string" && /^(slow-2g|2g|3g)$/.test(c.effectiveType))
    return false;

  // Sonda de WebGL: hay equipos y navegadores endurecidos donde el contexto
  // no se concede. Sin esto, el fallo aparecería recién después de haber
  // descargado el modelo y las librerías.
  const sonda = document.createElement("canvas");
  return Boolean(sonda.getContext("webgl2") ?? sonda.getContext("webgl"));
}

/**
 * Ejecuta `tarea` después de `load` y con el hilo principal ocioso: nada de lo
 * que monta el dron puede competir con el LCP. Devuelve la cancelación.
 *
 * `requestIdleCallback` no existe en Safari; ahí se cae a un `setTimeout`.
 */
export function alQuedarOcioso(tarea: () => void, { espera = 3000 } = {}): () => void {
  let cancelado = false;
  let id: number | undefined;

  function programar() {
    if (cancelado) return;
    id =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(() => !cancelado && tarea(), { timeout: espera })
        : window.setTimeout(() => !cancelado && tarea(), Math.min(espera, 1200));
  }

  if (document.readyState === "complete") programar();
  else window.addEventListener("load", programar, { once: true });

  return () => {
    cancelado = true;
    window.removeEventListener("load", programar);
    if (id === undefined) return;
    if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(id);
    else clearTimeout(id);
  };
}
