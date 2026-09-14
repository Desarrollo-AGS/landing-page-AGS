interface SectionDividerProps {
  className?: string;
}

/** Línea de acento naranja bajo títulos de sección (ticket 2 de mejoras: más peso visual del naranja de marca). */
export function SectionDivider({ className = "" }: SectionDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`mx-auto mt-4 h-1 w-16 rounded-full bg-brand-orange ${className}`}
    />
  );
}
