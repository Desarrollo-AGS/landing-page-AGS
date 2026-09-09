import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "@phosphor-icons/react/dist/ssr";
import { CabeceraPagina } from "@/components/ui/CabeceraPagina";
import { Contenedor } from "@/components/ui/Contenedor";
import { Revelar } from "@/components/ui/Revelar";
import { FichaCaso } from "@/components/ui/FichaCaso";
import { ContactoBloque } from "@/components/home/ContactoBloque";
import { casos } from "@/content/casos";
import { getServicio, servicios, serviciosRelacionados } from "@/content/servicios";
import { metadatosDe } from "@/lib/seo";
import { enumerar, site } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return servicios.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const servicio = getServicio(slug);
  if (!servicio) return {};

  return metadatosDe({
    titulo: `${servicio.titulo} con drones`,
    // Se recorta la descripción real del servicio en vez de escribir una
    // distinta: así el snippet de Google coincide con lo que se lee al entrar.
    descripcion: `${servicio.resumen} ${servicio.descripcion.slice(0, 150)}...`,
    ruta: `/servicios/${servicio.slug}`,
    imagen: servicio.imagen,
  });
}

export default async function PaginaServicio({ params }: Props) {
  const { slug } = await params;
  const servicio = getServicio(slug);
  if (!servicio) notFound();

  const relacionados = serviciosRelacionados(slug, 3);
  const casosDelServicio = casos.filter((c) => c.servicioSlug === slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: servicio.titulo,
    serviceType: servicio.titulo,
    description: servicio.descripcion,
    provider: { "@type": "Organization", name: site.nombre, url: site.url },
    areaServed: site.operacion.map((p) => ({ "@type": "Country", name: p })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <CabeceraPagina
        titulo={servicio.titulo}
        bajada={servicio.resumen}
        migas={[{ label: "Servicios", href: "/servicios" }, { label: servicio.tituloCorto }]}
      />

      <section className="bg-white py-16 sm:py-20">
        <Contenedor>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-16">
            <Revelar>
              <div className="chamfer relative aspect-[4/3] overflow-hidden bg-steel-100">
                <Image
                  src={servicio.imagen}
                  alt={servicio.imagenAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover"
                />
              </div>
              {servicio.imagenPendiente ? (
                <p className="mt-3 text-xs text-steel-500">
                  Fotografía de referencia. Imagen específica de este servicio pendiente de
                  entrega por AGS.
                </p>
              ) : null}
            </Revelar>

            <Revelar delay={0.08}>
              <p className="text-[1.0625rem] leading-relaxed text-steel-700">
                {servicio.descripcion}
              </p>

              <h2 className="mt-10 text-lg font-semibold text-steel-900">Qué se entrega</h2>
              <ul className="mt-5 space-y-4">
                {servicio.entregables.map((e) => (
                  <li key={e} className="flex gap-3">
                    <Check
                      size={16}
                      weight="bold"
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-orange"
                    />
                    <span className="text-[0.9375rem] leading-relaxed text-steel-600">{e}</span>
                  </li>
                ))}
              </ul>

              <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-steel-100 pt-6">
                <div>
                  <dt className="text-xs text-steel-500">Industrias</dt>
                  <dd className="mt-1.5 text-[0.9375rem] font-medium text-steel-900">
                    {servicio.industrias.join(", ")}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-steel-500">Cobertura</dt>
                  <dd className="mt-1.5 text-[0.9375rem] font-medium text-steel-900">
                    {enumerar(site.operacion)}
                  </dd>
                </div>
              </dl>
            </Revelar>
          </div>
        </Contenedor>
      </section>

      {casosDelServicio.length > 0 ? (
        <section className="bg-steel-50 py-16 sm:py-20">
          <Contenedor>
            <Revelar>
              <span className="rule-accent mb-6" aria-hidden="true" />
              <h2 className="text-d4 text-steel-900 sm:text-d3">
                Proyectos ejecutados con este servicio
              </h2>
            </Revelar>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {casosDelServicio.map((c, i) => (
                <Revelar as="li" key={c.slug} delay={i * 0.07} className="h-full h-full">
                  <FichaCaso caso={c} />
                </Revelar>
              ))}
            </ul>
          </Contenedor>
        </section>
      ) : null}

      <section className="bg-white py-16 sm:py-20">
        <Contenedor>
          <h2 className="text-d4 text-steel-900">Otros servicios</h2>
          <ul className="mt-8 grid border-t border-steel-100 sm:grid-cols-3">
            {relacionados.map((s) => (
              <li
                key={s.slug}
                className="border-b border-steel-100 sm:border-r sm:last:border-r-0"
              >
                <Link
                  href={`/servicios/${s.slug}`}
                  className="group flex h-full flex-col justify-between gap-6 py-6 pr-6 transition-colors hover:bg-steel-50 sm:px-6 sm:first:pl-0"
                >
                  <div>
                    <p className="eyebrow text-steel-500">{s.industrias.join(" · ")}</p>
                    <h3 className="mt-2.5 text-[1.0625rem] font-semibold text-steel-900">
                      {s.tituloCorto}
                    </h3>
                  </div>
                  <ArrowRight
                    size={16}
                    weight="bold"
                    aria-hidden="true"
                    className="text-steel-300 transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:text-orange"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Contenedor>
      </section>

      <ContactoBloque />
    </>
  );
}
