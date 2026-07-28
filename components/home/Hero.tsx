import Image from "next/image";
import { Button } from "@/components/ui/Button";

/**
 * Imagen de fondo: foto aérea real capturada con dron (faena minera, desierto
 * de Antofagasta), extraída de /assets (header-300x169.jpg del sitio actual).
 * Es un thumbnail de WordPress — no existe un original de mayor resolución en
 * los assets disponibles. Placeholder documentado en spec 2.1: reemplazar por
 * imagen o video de mayor calidad cuando el cliente aporte footage propio.
 */
export default function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-brand-navy">
      <Image
        src="/images/hero-drone-aerofotografia-antofagasta.webp"
        alt="Dron sobrevolando una faena minera en el desierto de Antofagasta"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/75 to-brand-navy/50"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-24 sm:px-6 lg:px-8">
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
