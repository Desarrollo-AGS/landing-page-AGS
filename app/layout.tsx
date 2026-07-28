import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import AnuncioBanner from "@/components/layout/AnuncioBanner";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { siteConfig } from "@/lib/metadata";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.defaultDescription,
  openGraph: {
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "es_CL",
    type: "website",
    // Placeholder hasta contar con una imagen og:image dedicada de 1200x630 — ver Sprint 6.
    images: [{ url: "/images/favicon-ags.webp", width: 300, height: 300 }],
  },
};

/**
 * `LocalBusiness` a nivel de sitio (ticket 6.2). Datos reales (nombre, teléfono,
 * localidad — ver lib/metadata.ts para su procedencia). Sin `streetAddress`: no
 * existe una dirección con calle/número en ningún lugar del sitio actual, no se
 * inventa. Sin `sameAs`: el footer en vivo de agssoluciones.cl no tiene enlaces a
 * redes sociales (verificado en Sprint 1) — se agrega en cuanto el cliente confirme
 * una URL real, mismo criterio que Footer.tsx.
 */
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.defaultDescription,
  telephone: siteConfig.contacto.telefonoE164,
  email: siteConfig.contacto.email,
  image: `${siteConfig.url}/images/logo-ags.svg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.contacto.direccion.localidad,
    addressRegion: siteConfig.contacto.direccion.region,
    addressCountry: siteConfig.contacto.direccion.pais,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <AnuncioBanner />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
