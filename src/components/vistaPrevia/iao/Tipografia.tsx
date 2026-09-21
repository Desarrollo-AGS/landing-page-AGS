import type { ReactNode } from "react";

/**
 * Piezas tipográficas de la experiencia.
 *
 * `Lineas` parte un titular en líneas con máscara. La partición se escribe a
 * mano en cada capítulo y no con SplitText: el corte de línea es una decisión
 * editorial (qué palabra cierra cada renglón), no un accidente del ancho.
 * Cada línea termina en un espacio real para que el nombre accesible del
 * titular no pegue palabras entre renglones.
 */
export function Lineas({ lineas, className = "" }: { lineas: ReactNode[]; className?: string }) {
  return (
    <>
      {lineas.map((linea, i) => (
        <span key={i} className="iao-mascara">
          <span className={`iao-mascara__texto ${className}`.trim()}>{linea}</span>{" "}
        </span>
      ))}
    </>
  );
}

/** Número y nombre del capítulo. Es el único rótulo que se repite en todos. */
export function Encabezado({
  numero,
  nombre,
  tono = "oscuro",
}: {
  numero: string;
  nombre: string;
  tono?: "oscuro" | "claro";
}) {
  return (
    <p
      className={`eyebrow flex items-center gap-3 ${
        tono === "oscuro" ? "text-steel-400" : "text-steel-500"
      }`}
    >
      <span className="num text-orange">{numero}</span>
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-40" />
      {nombre}
    </p>
  );
}
