import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { nosotrosExtracto } from "@/data/nosotros";

/**
 * Solo muestra el extracto (data/nosotros.ts) — el párrafo completo real vive
 * únicamente en /nosotros (ticket 3.2), para no duplicar contenido entre ambas
 * páginas (spec 0.1: cada sección de detalle tiene contenido único, no repetido
 * del preview de home).
 */
export default function NosotrosPreview() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative h-72 w-full overflow-hidden rounded-xl sm:h-96">
          <Image
            src="/images/nosotros-equipo-terreno.webp"
            alt="Equipo de AGS Soluciones en terreno"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-brand-navy sm:text-4xl">
            Nosotros
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brand-stone-900/80">
            {nosotrosExtracto}…
          </p>
          <Button href="/nosotros" variant="secondary" className="mt-6">
            Conócenos
          </Button>
        </div>
      </div>
    </section>
  );
}
