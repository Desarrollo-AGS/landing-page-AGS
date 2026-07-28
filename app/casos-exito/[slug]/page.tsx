import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { casosExito, getCasoExitoBySlug } from "@/data/casosExito";
import { siteConfig } from "@/lib/metadata";

interface CasoExitoPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Slugs idénticos a los del sitio actual — verificados en vivo contra
 * agssoluciones.cl/casos-exito/ (Sprint 0 y de nuevo en este ticket): los 10
 * coinciden exactamente. No se renombró ninguna, por lo que no aplican redirects
 * 301 para este ticket (ver 4.3: "para cualquier slug antigua que cambie" — ninguna
 * cambió). Aun así, antes de lanzar a producción conviene que el cliente confirme
 * este listado, por si existiera algún caso no publicado en la página de listado.
 */
export function generateStaticParams() {
  return casosExito.map((caso) => ({ slug: caso.slug }));
}

export async function generateMetadata({ params }: CasoExitoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caso = getCasoExitoBySlug(slug);

  if (!caso) {
    return {};
  }

  const title = `${caso.cliente} — ${caso.cifraDestacada}`;
  const description = `${caso.servicio} para ${caso.cliente} en ${caso.ubicacion}: ${caso.cifraDestacada}. Caso de éxito real de AGS Soluciones, servicios de drones en Antofagasta.`;
  const url = `${siteConfig.url}/casos-exito/${caso.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/casos-exito/${caso.slug}`,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [{ url: caso.imagen }],
    },
  };
}

export default async function CasoExitoPage({ params }: CasoExitoPageProps) {
  const { slug } = await params;
  const caso = getCasoExitoBySlug(slug);

  if (!caso) {
    notFound();
  }

  return (
    <article>
      <div className="relative h-64 w-full sm:h-80 lg:h-96">
        <Image
          src={caso.imagen}
          alt={`${caso.cliente} — ${caso.servicio}`}
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
            <Badge>{caso.servicio}</Badge>
          </div>
        </div>
        {process.env.NODE_ENV !== "production" && caso.imagenPendiente && (
          <span className="absolute right-4 top-4 rounded-md bg-brand-orange px-2 py-1 text-xs font-semibold text-white">
            Solo dev: imagen fallback, falta foto real (ver ticket 4.3)
          </span>
        )}
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-brand-navy sm:text-4xl">
          {caso.cliente}
        </h1>
        <p className="mt-2 text-base text-brand-stone-900/60">{caso.ubicacion}</p>

        <p className="mt-6 font-display text-4xl font-semibold tabular-nums text-brand-orange">
          {caso.cifraDestacada}
        </p>

        <p className="mt-6 text-base leading-relaxed text-brand-stone-900/80">{caso.texto}</p>

        <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-neutral-200 pt-6 sm:grid-cols-3">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-brand-stone-900/50">
              Cliente
            </dt>
            <dd className="mt-1 text-sm text-brand-stone-900">{caso.cliente}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-brand-stone-900/50">
              Ubicación
            </dt>
            <dd className="mt-1 text-sm text-brand-stone-900">{caso.ubicacion}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-brand-stone-900/50">
              Servicio
            </dt>
            <dd className="mt-1 text-sm">
              <Link
                href={`/servicios/${caso.servicioSlug}`}
                className="font-medium text-brand-orange hover:underline"
              >
                {caso.servicio}
              </Link>
            </dd>
          </div>
        </dl>

        <div className="mt-10 rounded-xl border border-neutral-200 bg-brand-sand-50 p-6 sm:p-8">
          <h2 className="font-display text-xl font-semibold text-brand-navy">
            ¿Tienes un proyecto similar?
          </h2>
          <p className="mt-2 text-sm text-brand-stone-900/70">
            Cuéntanos el alcance de tu proyecto y te enviamos una cotización a medida.
          </p>
          <Button href="/#cotizar" className="mt-6">
            Cotiza tu proyecto
          </Button>
        </div>
      </div>
    </article>
  );
}
