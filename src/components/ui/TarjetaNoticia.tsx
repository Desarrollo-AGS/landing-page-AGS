import Image from "next/image";
import Link from "next/link";
import { Newspaper } from "@phosphor-icons/react/dist/ssr";
import { formatearFecha, type Noticia } from "@/content/noticias";

/** Tarjeta del índice de noticias y del bloque del home (F-09). */
export function TarjetaNoticia({ noticia }: { noticia: Noticia }) {
  return (
    <article className="h-full">
      <Link
        href={`/noticias/${noticia.slug}`}
        className="group flex h-full flex-col border border-steel-200 bg-white transition-[border-color,box-shadow] duration-200 hover:border-steel-400 hover:shadow-e2"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-steel-100">
          {noticia.portada ? (
            <Image
              src={noticia.portada}
              alt={noticia.portadaAlt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              loading="lazy"
              className="media-zoom object-cover"
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
          <time
            dateTime={noticia.fecha}
            className="num text-xs font-medium uppercase tracking-[0.08em] text-steel-500"
          >
            {formatearFecha(noticia.fecha)}
          </time>
          <h3 className="mt-3 text-lg font-semibold leading-snug tracking-[-0.015em] text-steel-900">
            {noticia.titulo}
          </h3>
          <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-steel-600">
            {noticia.resumen}
          </p>
          <span className="mt-5 text-sm font-semibold text-orange-ink group-hover:underline">
            Leer la noticia
          </span>
        </div>
      </Link>
    </article>
  );
}
