import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { FuenteNoticia as Fuente } from "@/content/noticias";
import { diccionario } from "@/content/i18n";
import { IDIOMA_POR_DEFECTO, type Idioma } from "@/lib/idioma";

/**
 * Enlace a la publicación original.
 *
 * Va DESPUÉS del cuerpo y no antes: quien llega a la nota ya está acá, y
 * mandarlo afuera antes de que lea es perder la visita. Al final funciona como
 * lo que es, la cita de dónde salió.
 *
 * `rel="noopener"` por seguridad al abrir en otra pestaña, sin `nofollow`: es
 * una fuente real que se está citando, no un enlace patrocinado.
 */
export function FuenteNoticia({
  fuente,
  lang = IDIOMA_POR_DEFECTO,
}: {
  fuente: Fuente;
  lang?: Idioma;
}) {
  const t = diccionario(lang).noticias;

  return (
    <aside className="chamfer mt-12 border border-steel-200 bg-steel-50 p-6 sm:p-7">
      <p className="eyebrow text-steel-500">{t.fuenteEtiqueta}</p>
      <a
        href={fuente.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-3 inline-flex items-start gap-2 text-[1.0625rem] font-semibold leading-snug text-orange-ink underline-offset-4 hover:underline"
      >
        {t.verOriginal.replace("{medio}", fuente.medio)}
        <ArrowUpRight
          size={16}
          weight="bold"
          aria-hidden="true"
          className="mt-1 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </a>
      {fuente.autor ? (
        <p className="mt-2 text-[0.875rem] text-steel-600">
          {t.publicadoPor.replace("{autor}", fuente.autor)}
        </p>
      ) : null}
    </aside>
  );
}
