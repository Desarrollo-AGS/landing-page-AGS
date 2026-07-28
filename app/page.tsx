import type { Metadata } from "next";
import CasosExitoPreview from "@/components/home/CasosExitoPreview";
import ClientesLogos from "@/components/home/ClientesLogos";
import CtaFinal from "@/components/home/CtaFinal";
import FaqSection from "@/components/home/FaqSection";
import Hero from "@/components/home/Hero";
import NosotrosPreview from "@/components/home/NosotrosPreview";
import ServiciosPreview from "@/components/home/ServiciosPreview";
import StatsCounter from "@/components/home/StatsCounter";
import { siteConfig } from "@/lib/metadata";

/**
 * Explícita a nivel de página (ticket 6.1) en vez de heredar solo de los defaults
 * del layout raíz: agrega `canonical` y `og:image` propios de Home, que el layout
 * no definía. El title coincide exactamente con el que pide el ticket.
 */
export const metadata: Metadata = {
  title: siteConfig.defaultTitle,
  description: siteConfig.defaultDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    url: siteConfig.url,
    type: "website",
    images: [{ url: "/images/favicon-ags.webp", width: 300, height: 300 }],
  },
};

export default function Home() {
  return (
    <>
      <Hero />

      <ServiciosPreview />

      <StatsCounter />

      <NosotrosPreview />

      <ClientesLogos />

      <CasosExitoPreview />

      <FaqSection />

      <CtaFinal />
    </>
  );
}
