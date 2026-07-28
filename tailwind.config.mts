import type { Config } from "tailwindcss";

/**
 * Paleta de marca — Ticket 0.2 (Sprint 0)
 *
 * `brand.orange` (#FF5500) es el ÚNICO color verificable en los assets reales
 * de AGS Soluciones: es el `fill` usado en TODOS los trazados vectoriales de
 * `assets/logo-ags-color.svg` y `assets/logo-ags.svg` (valor hex corto `#f50`
 * = `#FF5500`), el logo oficial provisto en /assets. No hay azul ni cobre en
 * el logo real — la paleta "navy/sky/copper" de la sección 0.3 del spec era
 * una propuesta provisional sin acceso a los assets.
 *
 * Los neutros (`navy`, `stone`, `sand`) NO se encontraron en el logo (que es
 * monocromático) y se mantienen como neutros de apoyo provisionales para
 * texto/fondos hasta que el cliente confirme un manual de marca formal.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Extraído de assets/logo-ags-color.svg y assets/logo-ags.svg (fill="#f50")
          orange: "#FF5500",
          // Provisional — sin evidencia en los assets reales, ver comentario arriba.
          navy: "#0E2A47",
          "stone-900": "#2B2F33",
          "sand-50": "#F7F5F1",
        },
      },
    },
  },
};

export default config;
