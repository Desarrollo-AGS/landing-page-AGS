import { getCasosExitoDestacados } from "@/data/casosExito";
import { CasoExitoCard } from "./CasoExitoCard";

/**
 * 4 casos destacados de data/casosExito.ts (ver `getCasosExitoDestacados` y el
 * comentario `destacado` junto a cada uno para el criterio de selección). Las
 * cifras (mW, Ha) son datos reales ya extraídos del sitio actual — ninguna
 * inventada (ticket 4.2).
 */
export default function CasosExitoPreview() {
  const casos = getCasosExitoDestacados();

  return (
    <section id="casos-exito" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-brand-navy sm:text-4xl">
          Casos de éxito
        </h2>
        <p className="mt-4 text-base text-brand-stone-900/70">
          Proyectos reales ejecutados para empresas líderes en minería, energía y construcción.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {casos.map((caso) => (
          <CasoExitoCard key={caso.slug} caso={caso} />
        ))}
      </div>
    </section>
  );
}
