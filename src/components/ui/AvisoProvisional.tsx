import { PencilSimpleLine } from "@phosphor-icons/react/dist/ssr";
import { diccionario } from "@/content/i18n";
import { IDIOMA_POR_DEFECTO, type Idioma } from "@/lib/idioma";

/**
 * Marca de contenido provisional.
 *
 * El brief es taxativo: nada se publica con datos inventados, y lo que se
 * maqueta mientras AGS entrega el texto real tiene que quedar "claramente
 * marcado como provisional". Este componente es esa marca, y es VISIBLE en
 * pantalla a propósito: un comentario en el código no impide que alguien
 * publique el sitio creyendo que el texto está aprobado.
 *
 * Cuando el contenido definitivo llegue, se cambia `verificado: false` a
 * `true` en content/nosotros.ts y el aviso desaparece solo.
 */
export function AvisoProvisional({
  compacto = false,
  lang = IDIOMA_POR_DEFECTO,
  texto,
}: {
  compacto?: boolean;
  lang?: Idioma;
  texto?: string;
}) {
  const aviso = texto ?? diccionario(lang).ui.avisoProvisional;
  return (
    <p
      className={`inline-flex items-center gap-2 border border-dashed border-steel-300 bg-steel-50 text-[0.75rem] leading-snug text-steel-600 ${
        compacto ? "mt-3 px-2.5 py-1.5" : "mt-6 px-3 py-2"
      }`}
    >
      <PencilSimpleLine size={13} aria-hidden="true" className="shrink-0 text-steel-500" />
      {aviso}
    </p>
  );
}
