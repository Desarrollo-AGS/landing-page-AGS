"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

interface StatProps {
  value: number | null;
  label: string;
  suffix?: string;
  pendingContent?: boolean;
  duration?: number;
}

/**
 * El número final ({value}) se renderiza siempre como texto plano en el markup
 * inicial — es el fallback real con JS deshabilitado (ticket 2.4). La animación de
 * conteo es una mejora progresiva puramente client-side: muta el textContent del
 * mismo nodo por imperative API de framer-motion (`animate`), sin re-render de
 * React, así que no hay mismatch de hidratación entre servidor y cliente.
 */
export function Stat({
  value,
  label,
  suffix = "",
  pendingContent = false,
  duration = 1.8,
}: StatProps) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(numberRef, { once: true, amount: 0.6 });
  const prefersReducedMotion = useReducedMotion();
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (value === null || !isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const node = numberRef.current;
    if (!node || prefersReducedMotion) return;

    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate(latest) {
        node.textContent = new Intl.NumberFormat("es-CL").format(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, prefersReducedMotion, value, duration]);

  if (pendingContent || value === null) {
    return (
      <div className="rounded-lg border border-dashed border-white/30 px-4 py-6 text-center">
        <p className="font-display text-2xl font-semibold text-white/40">—</p>
        <p className="mt-2 text-xs text-white/50">{label} (cifra pendiente de confirmación)</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <p className="font-display text-4xl font-semibold tabular-nums text-brand-orange sm:text-5xl">
        +<span ref={numberRef}>{new Intl.NumberFormat("es-CL").format(value)}</span>
        {suffix}
      </p>
      <p className="mt-2 text-sm text-white/70">{label}</p>
    </div>
  );
}
