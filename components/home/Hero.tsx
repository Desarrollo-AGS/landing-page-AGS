import Image from "next/image";
import { Button } from "@/components/ui/Button";

/**
 * Video de fondo: demo real de un servicio de AGS (limpieza de fachada con dron,
 * Minera Escondida), provisto por el cliente. Original 1080p60 con audio, 53MB —
 * no apto para autoplay en un hero (LCP/datos móviles). Se comprimió a 720p30, sin
 * audio (se reproduce muted igual) y H.264 CRF 27 → 10.8MB (~80% menos), calidad
 * visual conservada porque el gradiente + texto ya cubren buena parte del cuadro.
 * El original queda en /assets/videos (fuera de public/, no se deploya).
 *
 * `motion-reduce:hidden` en el video + `motion-reduce:block` en la imagen (oculta
 * por defecto): quien prefiere menos movimiento (prefers-reduced-motion) ve la foto
 * estática en vez del video en loop — mismo criterio de accesibilidad que
 * StatsCounter (Sprint 2).
 */
export default function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-brand-navy">
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/nosotros-equipo-terreno.jpg"
      >
        <source src="/videos/hero-limpieza-1080.mp4" type="video/mp4" />
      </video>
      <Image
        src="/images/nosotros-equipo-terreno.jpg"
        alt="Dron limpiando la fachada de una instalación minera en Antofagasta"
        fill
        priority
        sizes="100vw"
        className="z-0 hidden object-cover motion-reduce:block"
      />
      {/* Capa 2: overlay oscuro/naranja sobre el video — ver .hero-overlay en
          globals.css para los valores de color/opacidad documentados. */}
      <div aria-hidden="true" className="hero-overlay absolute inset-0 z-10" />

      {/* Capa 3: contenido del banner, por encima del overlay vía z-index. */}
      <div className="relative z-20 mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-24 sm:px-6 lg:px-8">
        <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          Servicios de Drones en Antofagasta para Minería, Energía y Construcción
        </h1>
        <p className="max-w-xl text-lg text-white/85">
          Tecnología e innovación al servicio de la seguridad y la eficiencia.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button href="#cotizar" variant="primary">
            Cotiza tu proyecto
          </Button>
          <Button href="#servicios" variant="outline-light">
            Ver servicios
          </Button>
        </div>
      </div>
    </section>
  );
}
