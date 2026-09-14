import { Accordion } from "@/components/ui/Accordion";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { getFaqPublicable } from "@/data/faq";

/**
 * El JSON-LD `FAQPage` se genera desde el mismo array que alimenta el acordeón
 * visible (getFaqPublicable) — una sola fuente de verdad, sin riesgo de que el
 * contenido mostrado y el schema se desincronicen (ticket 5.1).
 *
 * El schema SIEMPRE excluye las preguntas `pendingContent`, incluso en desarrollo
 * (donde sí se muestran en el acordeón con un aviso) — el schema es contenido
 * estructurado para buscadores, y no debe publicar una respuesta marcada como no
 * confirmada bajo ninguna circunstancia.
 */
export default function FaqSection() {
  const items = getFaqPublicable();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items
      .filter((item) => !item.pendingContent)
      .map((item) => ({
        "@type": "Question",
        name: item.pregunta,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.respuesta,
        },
      })),
  };

  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-brand-navy sm:text-4xl">
          Preguntas frecuentes
        </h2>
        <SectionDivider />
      </div>

      <div className="mt-10">
        <Accordion
          items={items.map((item) => ({
            id: item.id,
            trigger: item.pregunta,
            content: (
              <>
                <p>{item.respuesta}</p>
                {item.pendingContent && process.env.NODE_ENV !== "production" && (
                  <p className="mt-2 rounded-md border border-dashed border-brand-orange/50 bg-brand-sand-50 px-3 py-2 text-xs text-brand-stone-900/60">
                    Solo visible en desarrollo: respuesta pendiente de confirmación real del cliente
                    (no publicar en producción, ver ticket 5.1).
                  </p>
                )}
              </>
            ),
          }))}
        />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </section>
  );
}
