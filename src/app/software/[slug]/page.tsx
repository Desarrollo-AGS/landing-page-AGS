import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { CabeceraPagina } from "@/components/ui/CabeceraPagina";
import { Contenedor } from "@/components/ui/Contenedor";
import { Revelar } from "@/components/ui/Revelar";
import { MarcoCaptura } from "@/components/ui/MarcoCaptura";
import { ContactoBloque } from "@/components/home/ContactoBloque";
import { getProducto, productos } from "@/content/software";
import { getServicio } from "@/content/servicios";
import { metadatosDe } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return productos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProducto(slug);
  if (!p) return {};
  return metadatosDe({
    titulo: `${p.nombre}, la plataforma del servicio`,
    descripcion: p.resuelve,
    ruta: `/software/${p.slug}`,
    imagen: p.captura,
  });
}

export default async function PaginaProducto({ params }: Props) {
  const { slug } = await params;
  const producto = getProducto(slug);
  if (!producto) notFound();

  const enganchados = producto.servicios
    .map((s) => getServicio(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <CabeceraPagina
        titulo={producto.nombre}
        bajada={producto.resuelve}
        migas={[{ label: "Software", href: "/software" }, { label: producto.nombre }]}
      />

      <section className="bg-white py-16 sm:py-20">
        <Contenedor>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:gap-16">
            <Revelar>
              <MarcoCaptura
                src={producto.captura}
                alt={producto.capturaAlt}
                nombre={producto.nombre}
              />
            </Revelar>

            <Revelar delay={0.08}>
              <p className="text-[1.0625rem] leading-relaxed text-steel-700">
                {producto.descripcion}
              </p>

              <h2 className="mt-10 text-lg font-semibold text-steel-900">
                A qué servicio se engancha
              </h2>
              <ul className="mt-5 border-t border-steel-100">
                {enganchados.map((s) => (
                  <li key={s.slug} className="border-b border-steel-100">
                    <Link
                      href={`/servicios/${s.slug}`}
                      className="group flex items-center justify-between gap-6 py-4 transition-colors hover:text-steel-900"
                    >
                      <span className="text-[0.9375rem] font-medium text-steel-700 group-hover:text-steel-900">
                        {s.tituloCorto}
                      </span>
                      <ArrowRight
                        size={15}
                        weight="bold"
                        aria-hidden="true"
                        className="shrink-0 text-steel-300 transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:text-orange"
                      />
                    </Link>
                  </li>
                ))}
              </ul>

              <a
                href={producto.sitio}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-9 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-orange-ink underline-offset-4 hover:underline"
              >
                Ir al sitio de {producto.nombre}
                <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
              </a>
            </Revelar>
          </div>
        </Contenedor>
      </section>

      <ContactoBloque />
    </>
  );
}
