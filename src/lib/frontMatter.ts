import { parse } from "yaml";

/** Separa la cabecera YAML de nuestros artículos Markdown. */
export function leerFrontMatter(input: string): {
  data: Record<string, unknown>;
  content: string;
} {
  const text = input.replace(/^\uFEFF/, "");
  const opening = /^---[\t ]*\r?\n/.exec(text);
  if (!opening) return { data: {}, content: text };

  const rest = text.slice(opening[0].length);
  const closing = /^---[\t ]*(?:\r?\n|$)/m.exec(rest);
  if (!closing) throw new Error("La cabecera YAML debe terminar con una línea ---.");

  const data: unknown = parse(rest.slice(0, closing.index));
  if (data !== null && (typeof data !== "object" || Array.isArray(data))) {
    throw new Error("La cabecera YAML debe contener campos con nombre.");
  }

  return {
    data: (data ?? {}) as Record<string, unknown>,
    content: rest.slice(closing.index + closing[0].length),
  };
}
