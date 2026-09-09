import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { BarraSuperior } from "@/components/layout/BarraSuperior";
import { BotonWhatsApp } from "@/components/layout/BotonWhatsApp";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { site } from "@/content/site";
import { DESCRIPCION_BASE, TITULO_BASE, organizacionJsonLd } from "@/lib/seo";
import "./globals.css";

/**
 * TIPOGRAFÍA
 * ----------
 * El manual de normas gráficas (3.1) fija Inter como tipografía corporativa.
 * Para display se usa Inter Tight: es la misma superfamilia con un corte más
 * estrecho, pensado justamente para titulares, así que respeta el manual y a la
 * vez da una jerarquía que Inter sola no alcanza a marcar.
 *
 * Ambas se sirven desde `next/font`, autoalojadas: sin `<link>` a Google Fonts
 * en producción, sin salto de layout al cargar.
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${TITULO_BASE} | ${site.nombre}`,
    template: `%s | ${site.nombre}`,
  },
  description: DESCRIPCION_BASE,
  applicationName: site.nombre,
  authors: [{ name: site.nombre, url: site.url }],
  robots: { index: true, follow: true },
  icons: { icon: "/brand/ags-icon.png", apple: "/brand/ags-icon.png" },
};

export const viewport: Viewport = {
  themeColor: "#00263E",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CL" className={`${inter.variable} ${interTight.variable}`}>
      <body className="flex min-h-screen flex-col">
        {/* Salto al contenido: primer tabulador de la página. Sin él, navegar
            con teclado obliga a recorrer barra superior, logo, seis ítems de
            menú y el CTA en cada página del sitio. */}
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-steel-900 focus:px-4 focus:py-3 focus:text-white"
        >
          Saltar al contenido
        </a>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizacionJsonLd) }}
        />

        <BarraSuperior />
        <Navbar />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer />
        <BotonWhatsApp />
      </body>
    </html>
  );
}
