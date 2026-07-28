import Hero from "@/components/home/Hero";
import NosotrosPreview from "@/components/home/NosotrosPreview";
import ServiciosPreview from "@/components/home/ServiciosPreview";
import StatsCounter from "@/components/home/StatsCounter";

export default function Home() {
  return (
    <>
      <Hero />

      <ServiciosPreview />

      <StatsCounter />

      <NosotrosPreview />

      <section
        id="casos-exito"
        className="flex min-h-[40vh] flex-col items-center justify-center gap-2 border-t border-neutral-200 px-6 text-center"
      >
        <h2 className="font-display text-2xl font-semibold text-brand-navy">Casos de Éxito</h2>
        <p className="text-sm text-brand-stone-900/50">
          Preview de casos de éxito pendiente — Sprint 4 (Ticket 4.2).
        </p>
      </section>

      <section
        id="cotizar"
        className="flex min-h-[40vh] flex-col items-center justify-center gap-2 border-t border-neutral-200 px-6 text-center"
      >
        <h2 className="font-display text-2xl font-semibold text-brand-navy">Cotiza tu proyecto</h2>
        <p className="text-sm text-brand-stone-900/50">
          Formulario de cotización pendiente — Sprint 5 (Ticket 5.2).
        </p>
      </section>
    </>
  );
}
