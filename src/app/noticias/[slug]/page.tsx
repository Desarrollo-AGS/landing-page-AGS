import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { Contenedor } from "@/components/ui/Contenedor";
import { ContactoBloque } from "@/components/home/ContactoBloque";
import { formatearFecha, getNoticia, getSlugsNoticias } from "@/content/noticias";
import { metadatosDe } from "@/lib/seo";
import { site } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getSlugsNoticias()).map((slug) => ({ slug }));
}

/**
 * Cada noticia tiene sus propias etiquetas Open Graph, con su portada y su
 * fecha de publicación: es el requisito para que el enlace se vea bien al
 * compartirse en LinkedIn, que es donde circula este contenido.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const n = await getNoticia(slug);
  if (!n) return {};
  return metadatosDe({
    titulo: n.titulo,
    descripcion: n.resumen,
    ruta: `/noticias/${n.slug}`,
    imagen: n.portada,
    tipo: "article",
    publicado: n.fecha,
  });
}

export default async function PaginaNoticia({ params }: Props) {
  const { slug } = await params;
  const noticia = await getNoticia(slug);
  if (!noticia) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: noticia.titulo,
    description: noticia.resumen,
    datePublished: noticia.fecha,
    image: noticia.portada ? `${site.url}${noticia.portada}` : undefined,
    author: { "@type": "Organization", name: noticia.autor ?? site.nombre },
    publisher: { "@type": "Organization", name: site.nombre, url: site.url },
    mainEntityOfPage: `${site.url}/noticias/${noticia.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        <header className="bg-steel-900 pt-14 pb-16 sm:pt-16 sm:pb-20">
          <Contenedor>
            <Link
              href="/noticias"
              className="inline-flex items-center gap-2 text-[0.8125rem] text-steel-400 transition-colors hover:text-white"
            >
              <ArrowLeft size={13} weight="bold" aria-hidden="true" />
              Volver a noticias
            </Link>

            <time
              dateTime={noticia.fecha}
              className="num mt-8 block text-[0.8125rem] font-medium tracking-[0.08em] text-orange"
            >
              {formatearFecha(noticia.fecha)}
            </time>

            <h1 className="mt-3 max-w-[24ch] text-d3 text-white sm:text-d2">
              {noticia.titulo}
            </h1>

            {noticia.resumen ? (
              <p className="measure mt-5 text-[1.0625rem] leading-relaxed text-steel-300">
                {noticia.resumen}
              </p>
            ) : null}
          </Contenedor>
        </header>

        {noticia.portada ? (
          <Contenedor className="-mt-10 sm:-mt-12">
            <div className="chamfer relative aspect-[16/9] overflow-hidden bg-steel-100">
              <Image
                src={noticia.portada}
                alt={noticia.portadaAlt}
                fill
                priority
                sizes="(min-width: 1320px) 1320px, 100vw"
                className="object-cover"
              />
            </div>
          </Contenedor>
        ) : null}

        <Contenedor className="py-14 sm:py-20">
          <div
            className="prose-ags max-w-[68ch]"
            dangerouslySetInnerHTML={{ __html: noticia.contenidoHtml }}
          />
        </Contenedor>
      </article>

      <ContactoBloque />
    </>
  );
}
