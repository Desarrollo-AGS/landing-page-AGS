import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-brand-sand-50 px-3 py-1 text-xs font-medium text-brand-navy ${className}`}
    >
      {children}
    </span>
  );
}
