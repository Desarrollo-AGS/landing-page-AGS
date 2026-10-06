import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { BarraSuperior } from "@/components/layout/BarraSuperior";
import { BotonWhatsApp } from "@/components/layout/BotonWhatsApp";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { notFound } from "next/navigation";
import { site } from "@/content/site";
import { ETIQUETA_HTML, IDIOMA_POR_DEFECTO, IDIOMAS, esIdioma } from "@/lib/idioma";
import { diccionario } from "@/content/i18n";
import { organizacionJsonLdDe } from "@/lib/seo";
import "../globals.css";

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

/**
 * El title por defecto y su plantilla salen del diccionario: si el layout
 * fijara el español, la versión inglesa heredaría un title en español en
 * cualquier página que no declare el suyo.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const idioma = esIdioma(lang) ? lang : IDIOMA_POR_DEFECTO;
  const base = diccionario(idioma).seo.paginas["/"];

  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${base.titulo} | ${site.nombre}`,
      template: `%s | ${site.nombre}`,
    },
    description: base.descripcion,
    applicationName: site.nombre,
    authors: [{ name: site.nombre, url: site.url }],
    robots: { index: true, follow: true },
    icons: { icon: "/brand/ags-icon.png", apple: "/brand/ags-icon.png" },
  };
}

export const viewport: Viewport = {
  themeColor: "#00263E",
  colorScheme: "light",
};

/** Las dos versiones se generan estáticas: nada se resuelve en cada visita. */
export function generateStaticParams() {
  return IDIOMAS.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  // Cualquier otro valor en el segmento es una URL inventada, no un idioma.
  if (!esIdioma(lang)) notFound();
  const t = diccionario(lang);

  return (
    // `data-scroll-behavior`: el sitio usa `scroll-behavior: smooth`, y sin
    // esta marca Next lo desactiva por su cuenta durante las transiciones de
    // ruta y avisa por consola en cada navegación.
    <html
      lang={ETIQUETA_HTML[lang]}
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${interTight.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        {/* Salto al contenido: primer tabulador de la página. Sin él, navegar
            con teclado obliga a recorrer barra superior, logo, seis ítems de
            menú y el CTA en cada página del sitio. */}
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-steel-900 focus:px-4 focus:py-3 focus:text-white"
        >
          {t.ui.saltarContenido}
        </a>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizacionJsonLdDe(lang)) }}
        />

        <BarraSuperior lang={lang} />
        <Navbar />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer lang={lang} />
        <BotonWhatsApp />
      </body>
    </html>
  );
}
