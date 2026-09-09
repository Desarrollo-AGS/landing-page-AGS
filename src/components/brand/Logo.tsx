import Image from "next/image";

/**
 * Logotipo oficial, servido tal cual. El manual de marca (1.5) prohíbe estirar,
 * deformar, recolorear y colocar la marca sobre fondos con elementos, así que
 * acá no se aplica ningún filtro CSS: solo se elige el archivo correcto.
 *
 *   positivo  logotipo naranja        · fondos claros
 *   negativo  logotipo naranja + bajada en blanco · fondos oscuros
 *
 * Las dos versiones vienen con proporciones distintas del archivo original, así
 * que cada una declara la suya. Escalar una con las medidas de la otra es
 * exactamente el "no estire ni altere" del manual.
 */

const ARCHIVOS = {
  positivo: { src: "/brand/ags-logo-positivo.svg", w: 300, h: 41.358 },
  negativo: { src: "/brand/ags-logo-negativo.svg", w: 144.023, h: 19.855 },
} as const;

export function Logo({
  variante = "positivo",
  alto = 26,
  className = "",
  prioridad = false,
}: {
  variante?: "positivo" | "negativo";
  /** Alto renderizado en píxeles. El ancho se deriva de la proporción real. */
  alto?: number;
  className?: string;
  prioridad?: boolean;
}) {
  const { src, w, h } = ARCHIVOS[variante];
  return (
    <Image
      src={src}
      alt="AGS Soluciones Industriales Aéreas"
      width={Math.round((w / h) * alto)}
      height={alto}
      priority={prioridad}
      className={className}
    />
  );
}
