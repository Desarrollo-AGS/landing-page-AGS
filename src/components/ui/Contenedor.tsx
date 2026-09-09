import type { ElementType, ReactNode } from "react";

/**
 * Único contenedor del sitio: 1320px con canaletas de 20/32px. Que exista uno
 * solo es lo que hace que el borde izquierdo del navbar, del hero, de cada
 * sección y del footer caigan exactamente en la misma línea vertical.
 */
export function Contenedor({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag className={`mx-auto w-full max-w-page px-5 sm:px-8 ${className}`.trim()}>
      {children}
    </Tag>
  );
}
