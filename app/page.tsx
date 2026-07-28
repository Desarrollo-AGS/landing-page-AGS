export default function Home() {
  return (
    <>
      <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-brand-navy">
          AGS Soluciones — Landing en construcción
        </h1>
        <p className="max-w-md text-base text-brand-stone-900/70">
          Fundación técnica del proyecto (Sprint 0) y layout base (Sprint 1). El contenido real de
          la Home se implementa en Sprint 2.
        </p>
      </section>

      <section
        id="servicios"
        className="flex min-h-[40vh] flex-col items-center justify-center gap-2 border-t border-neutral-200 px-6 text-center"
      >
        <h2 className="font-display text-2xl font-semibold text-brand-navy">Servicios</h2>
        <p className="text-sm text-brand-stone-900/50">
          Preview de servicios pendiente — Sprint 2 (Ticket 2.2).
        </p>
      </section>

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
