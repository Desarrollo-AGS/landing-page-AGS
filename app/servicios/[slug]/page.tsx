import { notFound } from "next/navigation";
import { getServicioBySlug, servicios } from "@/data/servicios";

export function generateStaticParams() {
  return servicios.map((servicio) => ({ slug: servicio.slug }));
}

export default async function ServicioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const servicio = getServicioBySlug(slug);

  if (!servicio) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-brand-navy">
        {servicio.titulo}
      </h1>
      <p className="mt-4 text-base text-brand-stone-900/70">{servicio.resumenCorto}</p>
      <p className="mt-8 text-sm text-brand-stone-900/50">
        Página de detalle completa pendiente — se implementa en Sprint 2 (spec: Ticket 2.3).
      </p>
    </section>
  );
}
