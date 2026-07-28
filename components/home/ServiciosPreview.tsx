import { servicios } from "@/data/servicios";
import { ServicioCard } from "./ServicioCard";

/**
 * Se muestran los 7 servicios reales (data/servicios.ts) — el spec (ticket 2.2) deja
 * abierta la opción de destacar solo 4-6 "según jerarquía comercial", pero esa
 * priorización depende de una decisión del cliente que aún no está tomada; mostrar
 * los 7 evita omitir un servicio real sin ese input.
 */
export default function ServiciosPreview() {
  return (
    <section id="servicios" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-brand-navy sm:text-4xl">
          Servicios de drones para minería, energía y construcción
        </h2>
        <p className="mt-4 text-base text-brand-stone-900/70">
          Soluciones aéreas especializadas para cada etapa de tu operación, con tecnología y datos
          precisos.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {servicios.map((servicio) => (
          <ServicioCard key={servicio.slug} servicio={servicio} />
        ))}
      </div>
    </section>
  );
}
