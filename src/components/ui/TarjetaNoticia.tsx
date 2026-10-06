import Image from "next/image";
import { Enlace as Link } from "@/components/ui/Enlace";
import { Newspaper } from "@phosphor-icons/react/dist/ssr";
import { formatearFecha, type Noticia } from "@/content/noticias";
import { diccionario } from "@/content/i18n";
import { IDIOMA_POR_DEFECTO, type Idioma } from "@/lib/idioma";

/**
 * Tarjeta del índice de noticias y del bloque del home (F-09).
 *
 * El TAG va sobre la foto, arriba a la derecha: noticias y comunidad comparten
 * sección y es lo único que las distingue de un vistazo. Va dentro del enlace
 * pero no es un enlace aparte —toda la tarjeta ya lleva al mismo sitio—, así
 * que no agrega una parada extra al recorrido por teclado.
 */
export function TarjetaNoticia({
  noticia,
  lang = IDIOMA_POR_DEFECTO,
}: {
  noticia: Noticia;
  lang?: Idioma;
}) {
  const t = diccionario(lang);
  return (
    <article className="h-full">
      <Link
        href={`/noticias/${noticia.slug}`}
        className="group flex h-full flex-col border border-steel-200 bg-white transition-[border-color,box-shadow] duration-200 hover:border-steel-400 hover:shadow-e2"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-steel-100">
          <span className="absolute right-3 top-3 z-10 bg-steel-950/85 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.07em] text-white backdrop-blur-sm">
            {t.noticias.tags[noticia.tag] ?? noticia.tag}
          </span>

          {noticia.portada ? (
            <Image
              src={noticia.portada}
              alt={noticia.portadaAlt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              loading="lazy"
              className={`media-zoom ${
                noticia.galeria[0]?.encaje === "contener"
                  ? "bg-white object-contain p-5"
                  : "object-cover"
              }`}
            />
          ) : (
            // Sin portada la tarjeta no se rompe ni deja un hueco blanco: cae a
            // una superficie neutra con la marca gráfica.
            <div className="flex h-full items-center justify-center bg-steel-100">
              <Newspaper
                size={26}
                weight="light"
                aria-hidden="true"
                className="text-steel-400"
              />
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6">
          {/* La fila de la fecha reserva su alto aunque esté vacía: sin esto
              los títulos de las tarjetas con y sin fecha quedan a distinta
              altura y la grilla pierde la línea. */}
          <p className="num min-h-[1.0625rem] text-xs font-medium uppercase tracking-[0.08em] text-steel-500">
            {noticia.fecha ? (
              <time dateTime={noticia.fecha}>{formatearFecha(noticia.fecha, lang)}</time>
            ) : null}
          </p>
          <h3 className="mt-3 text-lg font-semibold leading-snug tracking-[-0.015em] text-steel-900">
            {noticia.titulo}
          </h3>
          <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-steel-600">
            {noticia.resumen}
          </p>
          <span className="mt-5 text-sm font-semibold text-orange-ink group-hover:underline">
            {t.noticias.leer}
          </span>
        </div>
      </Link>
    </article>
  );
}
