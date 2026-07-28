import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  href: string;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

const baseClass =
  "inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold transition-colors";

const variantClass: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-brand-orange text-white hover:bg-brand-orange/90",
  secondary: "border border-brand-navy text-brand-navy hover:bg-brand-sand-50",
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
