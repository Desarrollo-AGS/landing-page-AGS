import type { Metadata } from "next";
import { Enlace as Link } from "@/components/ui/Enlace";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { Contenedor } from "@/components/ui/Contenedor";
import { ContactoBloque } from "@/components/home/ContactoBloque";
import { GaleriaNoticia } from "@/components/noticias/GaleriaNoticia";
import { FuenteNoticia } from "@/components/noticias/FuenteNoticia";
import { formatearFecha, getNoticia, getSlugsNoticias } from "@/content/noticias";
import { metadatosDe } from "@/lib/seo";
import { site } from "@/content/site";
import { diccionario } from "@/content/i18n";
import { IDIOMA_POR_DEFECTO, esIdioma, rutaDe } from "@/lib/idioma";

type Props = { params: Promise<{ lang: string; slug: string }> };

export async function generateStaticParams() {
  return (await getSlugsNoticias()).map((slug) => ({ slug }));
}

/**
 * Cada noticia tiene sus propias etiquetas Open Graph, con su portada y su
 * fecha de publicación: es el requisito para que el enlace se vea bien al
 * compartirse en LinkedIn, que es donde circula este contenido.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const idioma = esIdioma(lang) ? lang : IDIOMA_POR_DEFECTO;
  const n = await getNoticia(slug, idioma);
  if (!n) return {};
  return metadatosDe({
    titulo: n.titulo,
    descripcion: n.resumen,
    ruta: `/noticias/${n.slug}`,
    lang: idioma,
    imagen: n.portada,
    tipo: "article",
    publicado: n.fecha,
  });
}

export default async function PaginaNoticia({ params }: Props) {
  const { lang, slug } = await params;
  const idioma = esIdioma(lang) ? lang : IDIOMA_POR_DEFECTO;
  const noticia = await getNoticia(slug, idioma);
  if (!noticia) notFound();
  const t = diccionario(idioma);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: noticia.titulo,
    description: noticia.resumen,
    datePublished: noticia.fecha,
    image: noticia.portada ? `${site.url}${noticia.portada}` : undefined,
    author: { "@type": "Organization", name: noticia.autor ?? site.nombre },
    publisher: { "@type": "Organization", name: site.nombre, url: site.url },
    mainEntityOfPage: `${site.url}${rutaDe(idioma, `/noticias/${noticia.slug}`)}`,
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
              {t.paginas.noticiaDetalle.volver}
            </Link>

            <time
              dateTime={noticia.fecha}
              className="num mt-8 block text-[0.8125rem] font-medium tracking-[0.08em] text-orange"
            >
              {formatearFecha(noticia.fecha, idioma)}
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

        {/* El mosaico sube sobre la cabecera oscura, como la portada única
            de antes: la foto entra a la vez que el titular en vez de empujarlo
            fuera de pantalla. */}
        {noticia.galeria.length > 0 ? (
          <Contenedor className="-mt-10 sm:-mt-12">
            <GaleriaNoticia fotos={noticia.galeria} />
          </Contenedor>
        ) : null}

        <Contenedor className="py-14 sm:py-20">
          <div className="max-w-[68ch]">
            {/* `prose-publicacion` respeta el ritmo de párrafos cortos de una
                publicación de redes, que es de donde viene este contenido:
                cada línea es su propio párrafo y no un bloque corrido. */}
            <div
              className="prose-ags prose-publicacion"
              dangerouslySetInnerHTML={{ __html: noticia.contenidoHtml }}
            />

            {!noticia.traducida ? (
              <p className="mt-8 border-l-2 border-steel-300 pl-4 text-[0.875rem] text-steel-500">
                {t.noticias.sinTraducir}
              </p>
            ) : null}

            {noticia.fuente ? <FuenteNoticia fuente={noticia.fuente} lang={idioma} /> : null}
          </div>
        </Contenedor>
      </article>

      <ContactoBloque lang={idioma} />
    </>
  );
}
