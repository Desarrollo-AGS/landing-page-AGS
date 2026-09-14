import { Clock, ShieldCheck, Target } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

/**
 * Rediseño ticket 3 (spec_mejoras_landing_page.md) + correcciones posteriores del
 * mismo ticket: estructura de dos columnas sobre fondo claro, con kicker
 * `.text-eyebrow` (réplica del CSS real de Lovable, ver globals.css) + lista de
 * beneficios con los íconos exactos del HTML de referencia (lucide-react:
 * ShieldCheck, Target, Clock). El título y el párrafo son una re-redacción del
 * mismo texto real ya verificado en data/nosotros.ts (fundación 2016,
 * energía/minería/construcción, Perú y Argentina) — no contenido inventado.
 *
 * Solo muestra este resumen — el párrafo completo real vive únicamente en
 * /nosotros (ticket 3.2), para no duplicar contenido entre ambas páginas.
 */
const beneficios = [
  { Icon: ShieldCheck, texto: "Operación bajo protocolos del mandante en faena activa" },
  { Icon: Target, texto: "Precisión centimétrica con puntos de control terrestre" },
  { Icon: Clock, texto: "Entregables procesados en 3 a 7 días hábiles" },
];

export default function NosotrosPreview() {
  return (
    <section className="bg-brand-sand-50 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-72 w-full overflow-hidden rounded-xl sm:h-96">
            <Image
              src="/images/nosotros-equipo-terreno.jpg"
              alt="Equipo de AGS Soluciones en terreno"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-eyebrow">Quiénes somos</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-brand-navy sm:text-4xl">
              Pioneros en servicios con drones en Chile desde 2016
            </h2>
            <p className="mt-4 text-base leading-relaxed text-brand-stone-900/80">
              Especializados en energía, minería y construcción, extendemos nuestro abanico de
              servicios a Perú y Argentina.
            </p>

            <ul className="mt-6 space-y-3">
              {beneficios.map(({ Icon, texto }) => (
                <li key={texto} className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" aria-hidden="true" />
                  <span className="text-sm text-brand-stone-900/80">{texto}</span>
                </li>
              ))}
            </ul>

            <Button href="/nosotros" variant="secondary" className="mt-8">
              Conócenos
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
