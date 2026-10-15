import { Enlace as Link } from "@/components/ui/Enlace";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import { diccionario } from "@/content/i18n";
import { IDIOMA_POR_DEFECTO, type Idioma } from "@/lib/idioma";

/**
 * Ruta de navegación sobre fondo oscuro.
 *
 * Vive aparte de `CabeceraPagina` porque hay páginas que no usan esa cabecera
 * y necesitan las mismas migas: la ficha de plataforma arma su propia portada
 * y no por eso debe perder el rastro de dónde está. Duplicar el marcado haría
 * que una de las dos se quedara atrás.
 *
 * El primer eslabón siempre es el inicio y no se declara: lo pone esta función.
 */
export function Migas({
  items,
  lang = IDIOMA_POR_DEFECTO,
  className = "",
}: {
  items: { label: string; href?: string }[];
  lang?: Idioma;
  className?: string;
}) {
  const t = diccionario(lang);
  if (!items.length) return null;

  return (
    <nav aria-label={t.ui.rutaNavegacion} className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8125rem] text-steel-400">
        <li>
          <Link href="/" className="transition-colors hover:text-white">
            {t.ui.inicio}
          </Link>
        </li>
        {items.map((m, i) => (
          <li key={m.label} className="flex items-center gap-2">
            <CaretRight size={11} weight="bold" aria-hidden="true" className="text-steel-500" />
            {m.href && i < items.length - 1 ? (
              <Link href={m.href} className="transition-colors hover:text-white">
                {m.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-steel-300">
                {m.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
