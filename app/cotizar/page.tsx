import type { Metadata } from "next";
import CtaFinal from "@/components/home/CtaFinal";
import { siteConfig } from "@/lib/metadata";

/**
 * Decisión del ticket 5.3 (documentada aquí): SÍ se implementa como página propia.
 * Costo bajo (reutiliza el mismo componente de formulario que la Home) y tiene un
 * caso de uso real y concreto: un QR en el stand de AGS en ferias como Exponor, o
 * un link de campaña de pago, puede llevar directo a un formulario enfocado sin
 * pasar por toda la home. Decisión confirmada por el cliente el 2026-07-28.
 */
const title = "Cotiza tu Servicio de Drones en Antofagasta";
const description =
  "Solicita una cotización para tu proyecto de drones en Antofagasta: inspección termográfica, topografía y aerofotogrametría, limpieza de fachadas y más. Respuesta a medida según el alcance real de tu proyecto.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/cotizar",
  },
  openGraph: {
    title,
    description,
    url: `${siteConfig.url}/cotizar`,
    type: "website",
  },
};

export default function CotizarPage() {
  return (
    <CtaFinal
      headingLevel="h1"
      title="Cotiza tu Servicio de Drones en Antofagasta"
      description="Completa el formulario y te enviamos una propuesta a medida para tu proyecto de minería, energía o construcción."
    />
  );
}
