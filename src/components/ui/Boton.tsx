import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

/**
 * CONTRASTE DEL CTA PRIMARIO — decisión deliberada, verificada, no estética.
 *
 * El naranja de marca #FF5500 con texto blanco da 3.21:1: reprueba AA. La
 * salida habitual es oscurecer el naranja hasta que el blanco pase, pero eso
 * abandona el color corporativo justo en el elemento más visible del sitio.
 *
 * Acá se hace al revés: se conserva el #FF5500 exacto del manual y se cambia
 * la tinta a navy #00263E. Da 4.86:1 (AA) y además es el par cromático real de
 * la señalética industrial, que es el lenguaje del cliente.
 */

type Variante = "primaria" | "solida" | "linea" | "linea-clara";
type Tamano = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xs font-semibold " +
  "whitespace-nowrap transition-[background-color,border-color,color,transform] " +
  "duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:translate-y-px " +
  "disabled:pointer-events-none disabled:opacity-55";

const variantes: Record<Variante, string> = {
  // Naranja de marca puro + tinta navy. 4.86:1.
  primaria: "bg-orange text-steel-900 hover:bg-orange-bright active:bg-orange-press",
  // Navy sólido + blanco. 15.59:1.
  solida: "bg-steel-900 text-white hover:bg-steel-800",
  // Sobre fondo claro.
  linea:
    "border border-steel-200 bg-white text-steel-900 hover:border-steel-900 hover:bg-steel-50",
  // Sobre fondo navy o sobre el video del hero.
  "linea-clara":
    "border border-white/35 bg-white/5 text-white backdrop-blur-[2px] hover:border-white hover:bg-white/12",
};

const tamanos: Record<Tamano, string> = {
  md: "h-10 px-4 text-[0.9375rem]",
  lg: "h-12 px-6 text-base",
};

interface Comun {
  variante?: Variante;
  tamano?: Tamano;
  className?: string;
  children: ReactNode;
}

type PropsEnlace = Comun & { href: string; externo?: boolean };
type PropsBoton = Comun & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

function clases(v: Variante = "primaria", t: Tamano = "md", extra = "") {
  return `${base} ${variantes[v]} ${tamanos[t]} ${extra}`.trim();
}

export function BotonEnlace({
  href,
  externo,
  variante,
  tamano,
  className,
  children,
}: PropsEnlace) {
  const cn = clases(variante, tamano, className);
  if (externo) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cn}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cn}>
      {children}
    </Link>
  );
}

export function Boton({ variante, tamano, className, children, ...rest }: PropsBoton) {
  return (
    <button className={clases(variante, tamano, className)} {...rest}>
      {children}
    </button>
  );
}
