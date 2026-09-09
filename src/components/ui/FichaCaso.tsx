import type { Caso } from "@/content/casos";

/**
 * F-10b · Ficha de caso de éxito.
 *
 * Es la sección que aporta la prueba real, así que la jerarquía la manda el
 * dato, no el adorno: la cifra va en display grande con numeración tabular
 * (`.num`), para que MW y hectáreas queden alineados en columna entre fichas y
 * se puedan comparar de un vistazo.
 *
 * Un proyecto que no se mide en MW ni en hectáreas (torres, kilómetros de
 * línea, altitud) muestra su propia cifra en vez de un cero de relleno.
 */
export function FichaCaso({ caso, tono = "claro" }: { caso: Caso; tono?: "claro" | "oscuro" }) {
  const oscuro = tono === "oscuro";

  const cifras = [
    caso.mw !== null ? { valor: formatearCifra(caso.mw), unidad: "MW" } : null,
    caso.hectareas !== null
      ? { valor: formatearCifra(caso.hectareas), unidad: "hectáreas" }
      : null,
    caso.cifraAlterna ?? null,
  ].filter(Boolean) as { valor: string; unidad: string }[];

  return (
    <article
      className={`chamfer flex h-full flex-col p-6 transition-colors duration-200 sm:p-7 ${
        oscuro ? "bg-white/[0.04] hover:bg-white/[0.07]" : "bg-steel-50 hover:bg-steel-100/70"
      }`}
    >
      <p className={`eyebrow ${oscuro ? "text-orange" : "text-orange-ink"}`}>{caso.cliente}</p>

      <h3
        className={`mt-2.5 text-xl font-semibold tracking-[-0.018em] ${
          oscuro ? "text-white" : "text-steel-900"
        }`}
      >
        {caso.planta}
      </h3>

      <p className={`mt-1.5 text-sm ${oscuro ? "text-steel-400" : "text-steel-500"}`}>
        {caso.ubicacion}
      </p>

      <p
        className={`mt-4 flex-1 text-[0.9375rem] leading-relaxed ${
          oscuro ? "text-steel-300" : "text-steel-600"
        }`}
      >
        {caso.nota}
      </p>

      <dl
        className={`mt-6 flex flex-wrap gap-x-8 gap-y-4 border-t pt-5 ${
          oscuro ? "border-white/10" : "border-steel-200"
        }`}
      >
        {cifras.map((c) => (
          <div key={c.unidad}>
            <dt className={`text-xs ${oscuro ? "text-steel-500" : "text-steel-500"}`}>
              {c.unidad}
            </dt>
            <dd
              className={`num mt-1 text-[1.75rem] font-semibold leading-none tracking-[-0.02em] ${
                oscuro ? "text-white" : "text-steel-900"
              }`}
            >
              {c.valor}
            </dd>
          </div>
        ))}
      </dl>

      <p className={`mt-5 text-xs ${oscuro ? "text-steel-500" : "text-steel-500"}`}>
        {caso.servicio}
      </p>
    </article>
  );
}

/** Separador de miles con coma decimal, que es la convención chilena. */
export function formatearCifra(n: number): string {
  return new Intl.NumberFormat("es-CL", { maximumFractionDigits: 1 }).format(n);
}
