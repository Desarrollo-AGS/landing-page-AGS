import { PencilSimpleLine } from "@phosphor-icons/react/dist/ssr";

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
  texto = "Texto provisional, pendiente de validación por AGS.",
}: {
  compacto?: boolean;
  texto?: string;
}) {
  return (
    <p
      className={`inline-flex items-center gap-2 border border-dashed border-steel-300 bg-steel-50 text-[0.75rem] leading-snug text-steel-600 ${
        compacto ? "mt-3 px-2.5 py-1.5" : "mt-6 px-3 py-2"
      }`}
    >
      <PencilSimpleLine size={13} aria-hidden="true" className="shrink-0 text-steel-500" />
      {texto}
    </p>
  );
}
