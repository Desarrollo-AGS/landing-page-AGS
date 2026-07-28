import Image from "next/image";
import { clientes } from "@/data/clientes";

/**
 * Grayscale por defecto, color al hover — tratamiento sobrio, sin animación
 * decorativa adicional (ticket 4.1). `alt` descriptivo por logo, ya definido en
 * data/clientes.ts desde Sprint 0.
 */
export default function ClientesLogos() {
  return (
    <section className="border-y border-neutral-200 bg-white py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium uppercase tracking-wide text-brand-stone-900/50">
          Empresas que confían en AGS Soluciones
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {clientes.map((cliente) => (
            <div key={cliente.nombre} className="relative h-12 w-32 sm:h-14 sm:w-40">
              <Image
                src={cliente.logo}
                alt={cliente.alt}
                fill
                sizes="160px"
                className="object-contain grayscale transition-all duration-300 hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
