import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import {
  anioFundacion,
  nosotrosCierre,
  nosotrosMetodologiaIA,
  nosotrosMision,
  nosotrosTextoCompleto,
  nosotrosVentajas,
} from "@/data/nosotros";
import { siteConfig } from "@/lib/metadata";

const title = "Quiénes Somos — Empresa de Drones en Antofagasta";
const description =
  "Conoce a AGS Soluciones: empresa de drones en Antofagasta desde 2016, especializada en energía, minería y construcción, con presencia en Perú y Argentina.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/nosotros",
  },
  openGraph: {
    title,
    description,
    url: `${siteConfig.url}/nosotros`,
    type: "website",
    images: [{ url: "/images/nosotros-equipo-terreno.webp" }],
  },
};

export default function NosotrosPage() {
  const anios = new Date().getFullYear() - anioFundacion;

  return (
    <article>
      <div className="relative h-64 w-full sm:h-80 lg:h-96">
        <Image
          src="/images/nosotros-equipo-terreno.webp"
          alt="Equipo de AGS Soluciones en terreno"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/20 to-transparent"
        />
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-brand-navy sm:text-4xl">
          Quiénes Somos
        </h1>

        <p className="mt-2 font-display text-lg font-semibold text-brand-orange">
          +{anios} años liderando servicios de drones en Chile
        </p>

        <p className="mt-6 text-base leading-relaxed text-brand-stone-900/80">
          {nosotrosTextoCompleto}
        </p>

        <h2 className="mt-10 font-display text-xl font-semibold text-brand-navy">Nuestra misión</h2>
        <p className="mt-3 text-base leading-relaxed text-brand-stone-900/80">{nosotrosMision}</p>

        <h2 className="mt-10 font-display text-xl font-semibold text-brand-navy">
          Metodología con inteligencia artificial
        </h2>
        <p className="mt-3 text-base leading-relaxed text-brand-stone-900/80">
          {nosotrosMetodologiaIA}
        </p>

        <h2 className="mt-10 font-display text-xl font-semibold text-brand-navy">
          Ventajas frente a métodos convencionales
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-brand-stone-900/80">
          {nosotrosVentajas.map((ventaja) => (
            <li key={ventaja}>{ventaja}</li>
          ))}
        </ul>

        <h2 className="mt-10 font-display text-xl font-semibold text-brand-navy">Nuestro equipo</h2>
        <p className="mt-3 text-base leading-relaxed text-brand-stone-900/80">
          Cada servicio está respaldado y avalado por profesionales especializados en su industria,
          garantizando la precisión y la seguridad de los resultados que entregamos a nuestros
          clientes.
        </p>
        {process.env.NODE_ENV !== "production" && (
          <p className="mt-3 rounded-lg border border-dashed border-brand-orange/50 bg-brand-sand-50 px-4 py-3 text-sm text-brand-stone-900/60">
            Solo visible en desarrollo: faltan certificaciones (ej. DGAC), tamaño del equipo y roles
            específicos — pendientes de confirmación del cliente, no publicar con datos inventados
            (ver ticket 3.2).
          </p>
        )}

        <p className="mt-10 text-base leading-relaxed text-brand-stone-900/80">{nosotrosCierre}</p>

        <div className="mt-10 rounded-xl border border-neutral-200 bg-brand-sand-50 p-6 sm:p-8">
          <h2 className="font-display text-xl font-semibold text-brand-navy">
            ¿Quieres trabajar con nosotros?
          </h2>
          <p className="mt-2 text-sm text-brand-stone-900/70">
            Cuéntanos el alcance de tu proyecto y te enviamos una cotización a medida.
          </p>
          <Button href="/cotizar" className="mt-6">
            Cotiza tu proyecto
          </Button>
        </div>
      </div>
    </article>
  );
}
