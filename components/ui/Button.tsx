import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  href: string;
  variant?: "primary" | "secondary" | "outline-light";
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

const baseClass =
  "inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold transition-colors";

const variantClass: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-brand-orange text-white hover:bg-brand-orange/90",
  secondary: "border border-brand-navy text-brand-navy hover:bg-brand-sand-50",
  // Para CTAs sobre fondos oscuros/imágenes (ej. Hero) donde "secondary" no tiene contraste suficiente.
  "outline-light": "border border-white text-white hover:bg-white hover:text-brand-navy",
};

export function Button({
  href,
  variant = "primary",
  className = "",
  onClick,
  children,
}: ButtonProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${baseClass} ${variantClass[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
