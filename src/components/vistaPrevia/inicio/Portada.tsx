"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "@phosphor-icons/react/dist/ssr";
import { useReducedMotion } from "motion/react";
import { BotonEnlace } from "@/components/ui/Boton";
import { Contenedor } from "@/components/ui/Contenedor";
import { Lineas } from "@/components/vistaPrevia/iao/Tipografia";

/**
 * 00 · Portada. Mismo contenido que el hero de siempre, otra puesta en escena.
 *
 * QUÉ CAMBIA RESPECTO DEL HERO ACTUAL
 * -----------------------------------
 *   · El titular entra línea por línea desde una máscara, no de una vez.
 *   · El texto se limita a la mitad izquierda: la derecha queda vacía A
 *     PROPÓSITO, porque ahí vuela el dron. En el inicio de hoy el dron tenía
 *     que esquivar el texto encogiéndose; acá el layout le reserva el aire.
 *
 * La entrada es CSS (`iao-entrada`), no GSAP: el titular es el LCP y no puede
 * depender de que cargue JavaScript.
 *
 * TODA la lógica de video es la del hero original, sin tocar: es la que está
 * calibrada para no arruinar el LCP (ver comentarios abajo, portados tal cual).
 *
 * EL VIDEO CORPORATIVO
 * --------------------
 * La fuente original (`Corporativo.mp4`, raíz del proyecto) pesa 195 MB: 4K a
 * 62 Mbps con pista de audio. Lo servido es una versión para web:
 *   · 1080p y SIN audio: es un fondo silenciado, el audio era peso muerto.
 *   · H.264 con `+faststart` (arranca a reproducir antes de bajar entero) y
 *     WebM/VP9, que es más liviano y el que eligen Chrome y Firefox.
 *   · Recortado a la meseta de brillo (0,85 s → 24,95 s). El original entra y
 *     sale con fundido a negro: sin el recorte, el póster era un rectángulo
 *     negro y cada vuelta del bucle parpadeaba a oscuro.
 *   · El póster es el PRIMER fotograma del video ya recortado, así que el paso
 *     de póster a video no salta.
 */

type Conexion = { saveData?: boolean; effectiveType?: string };

const retraso = (ms: number) => ({ "--retraso": `${ms}ms` }) as CSSProperties;

export function Portada() {
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

    // En pantallas chicas el video NO se carga: al pintar su póster se vuelve
    // un candidato LCP más tardío y saltaba de 1,2 s a 3,8 s.
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    let idOcioso: number | undefined;
    let cancelado = false;

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
        if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idOcioso);
        else clearTimeout(idOcioso);
      }
    };
  }, [reducido]);

  function alternar() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) void v.play().catch(() => {});
    else v.pause();
  }

  return (
    <section
      id="capitulo-00"
      data-capitulo="00"
      data-dron-escena="portada"
      className="relative -mt-[68px] flex min-h-[100svh] flex-col overflow-hidden bg-steel-950 lg:max-h-[58rem]"
    >
      <div data-portada-fondo className="absolute inset-0">
        <Image
          src="/images/ags-video-corporativo-poster.webp"
          alt="Vista aérea de cerros del desierto que emergen sobre un mar de nubes"
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
            preload="auto"
            poster="/images/ags-video-corporativo-poster.webp"
            aria-label="Video corporativo de AGS: vuelos sobre el desierto, faenas industriales, el equipo operando drones en terreno y sus plataformas de software"
            onPlay={() => setReproduciendo(true)}
            onPause={() => setReproduciendo(false)}
            onCanPlay={(e) => {
              void e.currentTarget.play().catch(() => {});
            }}
            className="absolute inset-0 h-full w-full object-cover object-center"
          >
            <source src="/videos/ags-video-corporativo.webm" type="video/webm" />
            <source src="/videos/ags-video-corporativo.mp4" type="video/mp4" />
          </video>
        ) : null}
      </div>

      <div aria-hidden="true" className="hero-scrim absolute inset-0" />
      {/* Retícula de levantamiento, apagada hacia la izquierda: marca el aire
          de la derecha como "espacio de vuelo" sin restarle contraste al texto. */}
      <div aria-hidden="true" data-portada-reticula className="ini-reticula absolute inset-0" />

      <Contenedor className="relative z-10 flex flex-1 flex-col pb-14 pt-[calc(68px+5rem)] sm:pb-16">
        {/* `my-auto` y no `mt-auto`: centrado vertical. Con `mt-auto` el bloque
            se iba al fondo del contenedor, que era lo correcto cuando debajo
            había un pie de portada; sin él quedaba hundido contra el borde.
            Centrado queda además a la altura del dron, que vuela a la derecha.

            max-w a la mitad: el vacío de la derecha es donde vuela el dron. */}
        <div data-portada-texto className="my-auto max-w-[46rem] lg:max-w-[52%]">
          <p className="eyebrow iao-entrada-suave text-orange" style={retraso(60)}>
            Operaciones aéreas industriales desde 2016
          </p>

          <h1 className="mt-5 text-[2.5rem] font-bold leading-[1.04] tracking-[-0.03em] text-white [text-shadow:0_2px_24px_rgb(0_26_43/0.5)] sm:text-[3.4rem] lg:text-d1">
            <Lineas
              lineas={["Convertimos la altura", "en un terreno seguro"]}
              className="iao-entrada"
            />
          </h1>

          <p
            className="iao-entrada-suave mt-6 max-w-[38rem] text-[1.0625rem] leading-relaxed text-white [text-shadow:0_1px_16px_rgb(0_26_43/0.6)] sm:text-lg"
            style={retraso(620)}
          >
            Inspección termográfica, topografía y limpieza con drones para minería, energía y
            construcción. Sin andamios, sin detener la planta.
          </p>

          <div
            className="iao-entrada-suave mt-9 flex flex-col gap-3 sm:flex-row"
            style={retraso(780)}
          >
            <BotonEnlace href="/contacto" tamano="lg">
              Cotizar un servicio
            </BotonEnlace>
            <BotonEnlace href="/servicios" variante="linea-clara" tamano="lg">
              Ver servicios
            </BotonEnlace>
          </div>
        </div>

      </Contenedor>

      {montarVideo ? (
        <button
          type="button"
          onClick={alternar}
          aria-label={reproduciendo ? "Pausar el video de fondo" : "Reproducir el video de fondo"}
          // Arriba a la derecha, bajo el navbar. Queda lejos del titular (a la
          // izquierda) y del aire donde vuela el dron (centro-derecha, más abajo).
          className="absolute right-5 top-[calc(68px+1.25rem)] z-10 flex h-10 w-10 items-center justify-center border border-white/25 bg-black/35 text-white backdrop-blur-sm transition-colors hover:border-white/60 hover:bg-black/55"
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
