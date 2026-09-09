"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ElementType, ReactNode } from "react";

/**
 * Revelado al entrar en viewport. Propósito, no decoración: en una página de
 * ocho secciones ordena la lectura, marcando dónde empieza cada bloque.
 *
 * Solo `opacity` y `transform` (GPU, sin layout ni paint). `once: true` para
 * que no vuelva a animarse al subir. Con `prefers-reduced-motion` el contenido
 * se renderiza directamente visible: no se anima ni se retrasa.
 *
 * `as` existe por una razón concreta de marcado: dentro de un `<ul>` el único
 * hijo válido es `<li>`. Envolver cada elemento en un `<div>` animado rompía la
 * semántica de la lista para lectores de pantalla, así que en esos casos el
 * propio componente se renderiza como `<li>`.
 */
export function Revelar({
  children,
  delay = 0,
  y = 18,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: ElementType;
}) {
  const reducido = useReducedMotion();
  const Etiqueta = as;
  const Animado = motion[as as "div"] ?? motion.div;

  if (reducido) return <Etiqueta className={className}>{children}</Etiqueta>;

  return (
    <Animado
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.62, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Animado>
  );
}
