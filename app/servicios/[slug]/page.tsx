import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ServicioCard } from "@/components/home/ServicioCard";
import { getServicioBySlug, getServiciosRelacionados, servicios } from "@/data/servicios";
import { siteConfig } from "@/lib/metadata";

interface ServicioPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return servicios.map((servicio) => ({ slug: servicio.slug }));
}

export async function generateMetadata({ params }: ServicioPageProps): Promise<Metadata> {
  const { slug } = await params;
  const servicio = getServicioBySlug(slug);

  if (!servicio) {
    return {};
  }

  const title = `${servicio.titulo} en Antofagasta`;
  const description = `${servicio.resumenCorto} Servicio de ${servicio.titulo.toLowerCase()} en Antofagasta con AGS Soluciones, especialistas en drones desde 2016.`;
  const url = `${siteConfig.url}/servicios/${servicio.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/servicios/${servicio.slug}`,
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [{ url: servicio.imagen }],
    },
  };
}

export default async function ServicioPage({ params }: ServicioPageProps) {
  const { slug } = await params;
  const servicio = getServicioBySlug(slug);

  if (!servicio) {
    notFound();
  }

  const relacionados = getServiciosRelacionados(slug);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: servicio.titulo,
    description: servicio.descripcionCompleta,
    serviceType: servicio.titulo,
    areaServed: {
      "@type": "City",
      name: "Antofagasta",
    },
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      url: siteConfig.url,
      areaServed: "Antofagasta, Chile",
    },
    url: `${siteConfig.url}/servicios/${servicio.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <article>
        <div className="relative h-64 w-full sm:h-80 lg:h-96">
          <Image
            src={servicio.imagen}
            alt={servicio.titulo}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/20 to-transparent"
          />
          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto flex max-w-3xl flex-wrap gap-2 px-4 pb-6 sm:px-6 lg:px-8">
              {servicio.industrias.map((industria) => (
                <Badge key={industria}>{industria}</Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-brand-navy sm:text-4xl">
            {servicio.titulo}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-brand-stone-900/80">
            {servicio.descripcionCompleta}
          </p>

          <div className="mt-10 rounded-xl border border-neutral-200 bg-brand-sand-50 p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-brand-navy">
              ¿Necesitas este servicio en tu operación?
            </h2>
            <p className="mt-2 text-sm text-brand-stone-900/70">
              Cuéntanos el alcance de tu proyecto y te enviamos una cotización a medida.
            </p>
            <Button href="/cotizar" className="mt-6">
              Cotiza tu proyecto
            </Button>
          </div>
        </div>

        {relacionados.length > 0 && (
          <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-semibold text-brand-navy">
              Servicios relacionados
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relacionados.map((relacionado) => (
                <ServicioCard key={relacionado.slug} servicio={relacionado} />
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  );
}
