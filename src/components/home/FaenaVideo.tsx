"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowsOutSimple,
  ClockCountdown,
  Play,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";
import { Contenedor } from "@/components/ui/Contenedor";
import { Revelar } from "@/components/ui/Revelar";

/**
 * Bloque de video de la operación en faena, portado desde agssoluciones-test
 * junto con su tratamiento visual (el brief lo pide explícitamente).
 *
 * A diferencia del hero, acá el video NO arranca solo: se monta y reproduce
 * cuando el bloque entra en pantalla, mediante IntersectionObserver, y se pausa
 * al salir. Un video en bucle a mitad de página consumiendo decodificación
 * mientras el usuario está tres secciones más abajo no aporta nada.
 *
 * Con `prefers-reduced-motion` el bloque se queda en el póster y muestra el
 * control de reproducción, en vez de moverse solo.
 */
export function FaenaVideo() {
  const seccionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const nodo = seccionRef.current;
    if (!nodo) return;

    const io = new IntersectionObserver(([entrada]) => setVisible(entrada.isIntersecting), {
      threshold: 0.25,
    });
    io.observe(nodo);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (visible) {
      void v.play().catch(() => {
        /* El navegador puede bloquear el autoplay: el póster queda visible. */
      });
    } else {
      v.pause();
    }
  }, [visible]);

  return (
    <section ref={seccionRef} className="bg-steel-950">
      <div className="relative min-h-[26rem] overflow-hidden lg:min-h-[36rem]">
        <Image
          src="/images/faena-limpieza-fachada.webp"
          alt="Fachada de una instalación minera durante la limpieza con dron"
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover"
        />

        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster="/images/faena-limpieza-fachada.webp"
          aria-label="Registro de una operación de limpieza de fachada con dron, en faena minera activa"
          className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        >
          <source src="/videos/faena-limpieza-fachada.webm" type="video/webm" />
          <source src="/videos/faena-limpieza-fachada.mp4" type="video/mp4" />
        </video>

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-steel-950/92 via-steel-950/65 to-steel-950/20"
        />

        <Contenedor className="relative flex min-h-[26rem] items-end py-14 lg:min-h-[36rem] lg:py-20">
          <div className="max-w-[36rem]">
            <p className="inline-flex items-center gap-2 text-[0.8125rem] font-medium text-orange">
              <Play size={13} weight="fill" aria-hidden="true" />
              Operación registrada en faena
            </p>
            <h2 className="mt-4 text-d3 text-white sm:text-d2">
              Fachada de faena minera, limpiada en vuelo
            </h2>
            <p className="mt-5 max-w-[32rem] text-[1.0625rem] leading-relaxed text-white/85">
              Registro real de una operación sobre estructura industrial activa. Nadie subió, y
              la planta no se detuvo.
            </p>
          </div>
        </Contenedor>
      </div>

      {/* Los tres motivos por los que la operación se hace así. Van bajo el
          video, no encima: sobre la imagen competirían con el titular. */}
      <Contenedor className="border-t border-white/10 py-14 lg:py-16">
        <ul className="grid gap-10 sm:grid-cols-3 sm:gap-8">
          {[
            {
              Icono: ShieldCheck,
              titulo: "Sin trabajo en altura",
              texto:
                "Nadie sube. Se elimina la exposición del personal al riesgo de caída y la logística de permisos que la acompaña.",
            },
            {
              Icono: ClockCountdown,
              titulo: "Sin detener la planta",
              texto:
                "Se opera sobre estructuras activas, sin montar andamios ni coordinar cortes prolongados de producción.",
            },
            {
              Icono: ArrowsOutSimple,
              titulo: "Sin límite de acceso",
              texto:
                "Se alcanzan superficies que el andamio y la grúa no cubren, incluidas cubiertas y estructuras de gran altura.",
            },
          ].map(({ Icono, titulo, texto }, i) => (
            <Revelar key={titulo} delay={i * 0.08}>
              <li>
                <Icono size={22} weight="light" aria-hidden="true" className="text-orange" />
                <h3 className="mt-4 text-lg font-semibold text-white">{titulo}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-steel-400">
                  {texto}
                </p>
              </li>
            </Revelar>
          ))}
        </ul>
      </Contenedor>
    </section>
  );
}
