import { notFound } from "next/navigation";
import { casosExito, getCasoExitoBySlug } from "@/data/casosExito";

export function generateStaticParams() {
  return casosExito.map((caso) => ({ slug: caso.slug }));
}

export default async function CasoExitoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caso = getCasoExitoBySlug(slug);

  if (!caso) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-brand-navy">
        {caso.cliente} — {caso.cifraDestacada}
      </h1>
      <p className="mt-4 text-base text-brand-stone-900/70">{caso.texto}</p>
      <p className="mt-8 text-sm text-brand-stone-900/50">
        Página de detalle completa pendiente — se implementa en Sprint 4 (spec: Ticket 4.3).
      </p>
    </section>
  );
}
