"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "@phosphor-icons/react/dist/ssr";
import { useReducedMotion } from "motion/react";
import { BotonEnlace } from "@/components/ui/Boton";
import { Contenedor } from "@/components/ui/Contenedor";
import { Dron } from "@/components/brand/Dron";

/**
 * F-03 · Hero.
 *
 * VIDEO
 * -----
 * `poster` obligatorio: la primera imagen visible es un cuadro real de faena,
 * nunca un rectángulo negro. Se sirve WebM (4,0 MB) antes que MP4 (4,9 MB),
 * ambos bajo el techo de 8 MB del brief; el navegador toma el primero que
 * soporta, así que Chrome y Firefox bajan el más liviano y Safari el MP4.
 *
 * El video NO se descarga en el primer render: `preload="none"` y la fuente se
 * monta después, y solo si la conexión lo permite. Con `saveData` activo, con
 * 2g/3g declarados o con `prefers-reduced-motion`, se queda el póster. Así el
 * titular pinta de inmediato y no se gasta el plan de datos de nadie.
 *
 * LEGIBILIDAD
 * -----------
 * El velo (`.hero-scrim`, ver globals.css) se calibró contra los cuadros MÁS
 * CLAROS del video, que es cielo del desierto a mediodía, no contra el
 * promedio. Con el video cargado o sin cargar, el H1 mantiene contraste.
 */

type Conexion = { saveData?: boolean; effectiveType?: string };

export function Hero() {
  const reducido = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [montarVideo, setMontarVideo] = useState(false);
  const [reproduciendo, setReproduciendo] = useState(true);

  useEffect(() => {
    if (reducido) return;

    const nav = navigator as Navigator & { connection?: Conexion };
    const c = nav.connection;
    const conexionLenta =
      c?.saveData === true ||
      (typeof c?.effectiveType === "string" && /^(slow-2g|2g|3g)$/.test(c.effectiveType));
    if (conexionLenta) return;

    /**
     * En pantallas chicas el video NO se carga: el hero se queda en el póster.
     *
     * No es una decisión estética. Medido sobre el build de producción con
     * perfil móvil (4G lento, CPU x4), el `<video>` se monta después de la
     * carga y al pintar su póster se convierte en un candidato LCP nuevo y más
     * tardío: el LCP saltaba de 1,2 s a 3,8 s. Sumado a que son casi 4 MB de
     * datos móviles para un recuadro donde el video aporta poco, el póster es
     * la mejor decisión en ese contexto.
     *
     * Desde 768px, donde el hero ocupa media pantalla y la conexión suele ser
     * fija, el video sí se carga.
     */
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    let idOcioso: number | undefined;
    let cancelado = false;

    /**
     * El video se monta DESPUÉS de que la página terminó de cargar y el hilo
     * principal quedó ocioso. Medido en móvil con 4G lento y CPU x4, montarlo
     * en el primer cuadro empeoraba el LCP en más de dos segundos: el video se
     * llevaba el ancho de banda que necesitaba el póster, que es justamente el
     * elemento que define el LCP de esta página.
     *
     * `requestIdleCallback` no existe en Safari, así que ahí se cae a un
     * `setTimeout` corto, que consigue el mismo efecto de ceder la prioridad.
     */
    const programar = () => {
      if (cancelado) return;
      const enOcio = (cb: () => void): number =>
        typeof window.requestIdleCallback === "function"
          ? window.requestIdleCallback(cb, { timeout: 2500 })
          : window.setTimeout(cb, 900);
      idOcioso = enOcio(() => {
        if (!cancelado) setMontarVideo(true);
      });
    };

    if (document.readyState === "complete") programar();
    else window.addEventListener("load", programar, { once: true });

    return () => {
      cancelado = true;
      window.removeEventListener("load", programar);
      if (idOcioso !== undefined) {
        if (typeof window.cancelIdleCallback === "function")
          window.cancelIdleCallback(idOcioso);
        else clearTimeout(idOcioso);
      }
    };
  }, [reducido]);

  function alternar() {
    const v = videoRef.current;
    if (!v) return;
    // El estado lo actualizan los manejadores `onPlay` / `onPause` del propio
    // elemento, así que acá solo se pide el cambio.
    if (v.paused) void v.play().catch(() => {});
    else v.pause();
  }

  return (
    <section
      // -mt: el hero pasa por debajo del navbar transparente. El padding
      // superior del contenido lo compensa, así que nada queda tapado.
      className="relative -mt-[68px] flex min-h-[36rem] items-end overflow-hidden bg-steel-950 lg:min-h-[calc(100svh-2.25rem)] lg:max-h-[54rem]"
    >
      <Image
        src="/images/faena-limpieza-fachada.webp"
        alt="Dron de AGS limpiando la fachada de una instalación minera en operación"
        fill
        priority
        sizes="100vw"
        quality={72}
        className="object-cover object-center"
      />

      {montarVideo ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          // Sin `preload="none"`: la descarga ya está diferida por no montar el
          // elemento hasta que la página está ociosa, y con `none` Chrome carga
          // el elemento pero no arranca la reproducción automática.
          preload="auto"
          poster="/images/faena-limpieza-fachada.webp"
          aria-label="Operación de limpieza de fachada con dron, registrada en faena minera"
          // El estado del botón se sincroniza con lo que el video hace de
          // verdad, no con lo que creemos que hizo: si el navegador bloquea el
          // autoplay, el control aparece en "reproducir" y no mintiendo.
          onPlay={() => setReproduciendo(true)}
          onPause={() => setReproduciendo(false)}
          onCanPlay={(e) => {
            void e.currentTarget.play().catch(() => {
              /* Autoplay bloqueado: queda el póster y el control de play. */
            });
          }}
          className="absolute inset-0 h-full w-full object-cover object-center"
        >
          <source src="/videos/faena-limpieza-fachada.webm" type="video/webm" />
          <source src="/videos/faena-limpieza-fachada.mp4" type="video/mp4" />
        </video>
      ) : null}

      <div aria-hidden="true" className="hero-scrim absolute inset-0" />

      {!reducido ? <Dron /> : null}

      <Contenedor className="relative z-10 pb-16 pt-[calc(68px+5rem)] sm:pb-20 lg:pb-24">
        <div className="max-w-[46rem]">
          <p className="eyebrow text-orange">Operaciones aéreas industriales desde 2016</p>

          <h1 className="mt-5 text-[2.5rem] leading-[1.04] font-bold tracking-[-0.03em] text-white text-balance [text-shadow:0_2px_24px_rgb(0_26_43/0.5)] sm:text-[3.4rem] lg:text-d1">
            Convertimos la altura en un terreno seguro
          </h1>

          <p className="mt-6 max-w-[38rem] text-[1.0625rem] leading-relaxed text-white [text-shadow:0_1px_16px_rgb(0_26_43/0.6)] sm:text-lg">
            Inspección termográfica, topografía y limpieza con drones para minería, energía y
            construcción. Sin andamios, sin detener la planta.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <BotonEnlace href="/contacto" tamano="lg">
              Cotizar un servicio
            </BotonEnlace>
            <BotonEnlace href="/servicios" variante="linea-clara" tamano="lg">
              Ver servicios
            </BotonEnlace>
          </div>
        </div>
      </Contenedor>

      {/* Control de pausa. Solo aparece cuando hay video que pausar: sobre el
          póster estático no tendría nada que hacer. */}
      {montarVideo ? (
        <button
          type="button"
          onClick={alternar}
          aria-label={
            reproduciendo ? "Pausar el video de fondo" : "Reproducir el video de fondo"
          }
          // Esquina inferior derecha, apartado 5,5rem para no chocar con el
          // botón flotante de WhatsApp, que vive en `right-5` con 3,5rem de ancho.
          className="absolute bottom-5 right-[5.5rem] z-10 flex h-10 w-10 items-center justify-center border border-white/25 bg-black/35 text-white backdrop-blur-sm transition-colors hover:border-white/60 hover:bg-black/55 sm:bottom-6"
        >
          {reproduciendo ? (
            <Pause size={15} weight="fill" aria-hidden="true" />
          ) : (
            <Play size={15} weight="fill" aria-hidden="true" />
          )}
        </button>
      ) : null}
    </section>
  );
}
