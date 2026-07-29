import Link from "next/link";
import type { ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline-light";

interface ButtonProps {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

const baseClass =
  "inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold transition-colors";

const variantClass: Record<ButtonVariant, string> = {
  primary: "bg-brand-orange text-white hover:bg-brand-orange/90",
  // Fondo blanco explícito + borde sutil (no brand-navy) — necesario porque se usa
  // sobre secciones con fondo claro (ej. NosotrosPreview, bg-brand-sand-50).
  secondary: "border border-neutral-200 bg-white text-brand-navy hover:bg-brand-sand-50",
  // Para CTAs sobre fondos oscuros/imágenes (ej. Hero) donde "secondary" no tiene contraste suficiente.
  "outline-light": "border border-white text-white hover:bg-white hover:text-brand-navy",
};

/**
 * Clases del Button reutilizables para elementos que no pueden ser un <Link>
 * (ej. <button type="submit"> del formulario de cotización, ticket 5.2) sin
 * duplicar los estilos ni tocar la API de Button.
 */
export function buttonClassName(variant: ButtonVariant = "primary", className = "") {
  return `${baseClass} ${variantClass[variant]} ${className}`.trim();
}

export function Button({
  href,
  variant = "primary",
  className = "",
  onClick,
  children,
}: ButtonProps) {
  return (
    <Link href={href} onClick={onClick} className={buttonClassName(variant, className)}>
      {children}
    </Link>
  );
}
