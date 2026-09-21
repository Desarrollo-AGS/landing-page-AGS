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
import { Encabezado, Lineas } from "@/components/vistaPrevia/iao/Tipografia";

/**
 * 03 · La operación registrada en faena.
 *
 * Mismo video, mismo titular y los mismos tres motivos que el bloque actual.
 * Lo que cambia es la puesta: el capítulo se fija, la banda se abre desde una
 * ventana hasta cubrir la pantalla, y recién con el video a sangre entran los
 * tres motivos, de a uno.
 *
 * Acá el dron NO está: es el único capítulo donde el registro real manda y
 * cualquier cosa volando encima competiría con él (ver el guion en
 * `coreografiaInicio.ts`).
 *
 * El video se monta y reproduce por IntersectionObserver, igual que hoy: un
 * bucle decodificando a mitad de página, con el usuario tres secciones más
 * abajo, no aporta nada.
 */
export function Faena() {
  const seccionRef = useRef<HTMLElement>(null);
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
    <section
      ref={seccionRef}
      id="capitulo-03"
      data-capitulo="03"
      data-dron-escena="faena"
      aria-labelledby="ini-faena"
      className="bg-steel-950"
    >
      <div data-faena-banda className="relative min-h-[26rem] overflow-hidden lg:min-h-[36rem]">
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
          <div data-faena-texto className="max-w-[36rem]">
            <Encabezado numero="03" nombre="Operación registrada en faena" />
            <p className="mt-4 inline-flex items-center gap-2 text-[0.8125rem] font-medium text-orange">
              <Play size={13} weight="fill" aria-hidden="true" />
              Registro real
            </p>
            <h2 id="ini-faena" className="mt-3 text-d3 text-white sm:text-d2">
              <Lineas lineas={["Fachada de faena minera,", "limpiada en vuelo"]} />
            </h2>
            <p className="mt-5 max-w-[32rem] text-[1.0625rem] leading-relaxed text-white/85">
              Registro real de una operación sobre estructura industrial activa. Nadie subió, y la
              planta no se detuvo.
            </p>
          </div>
        </Contenedor>
      </div>

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
          ].map(({ Icono, titulo, texto }) => (
            <li key={titulo} data-razon>
              <Icono size={22} weight="light" aria-hidden="true" className="text-orange" />
              <h3 className="mt-4 text-lg font-semibold text-white">{titulo}</h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-steel-400">{texto}</p>
            </li>
          ))}
        </ul>
      </Contenedor>
    </section>
  );
}
