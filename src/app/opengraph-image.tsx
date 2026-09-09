import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { TITULO_BASE } from "@/lib/seo";

/**
 * Imagen de compartido por defecto, generada en build.
 *
 * Se genera en vez de usar un archivo estático por un motivo concreto: el
 * favicon de 300x300 que usaba el sitio anterior como og:image se recortaba a
 * un cuadrado ilegible en LinkedIn, que es donde circula este contenido.
 *
 * Los colores son los del manual de marca. El logotipo no se incrusta acá
 * porque `ImageResponse` no rasteriza SVG externos de forma confiable: se
 * compone el bloque tipográfico con los mismos valores de la marca.
 */
export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.nombre} · ${TITULO_BASE}`;

export default function Imagen() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#00263E",
        padding: "72px 80px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ width: 56, height: 6, background: "#FF5500" }} />
        <div
          style={{
            color: "#FF5500",
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 2,
          }}
        >
          AGS SOLUCIONES
        </div>
      </div>

      <div
        style={{
          display: "flex",
          color: "#FFFFFF",
          fontSize: 76,
          fontWeight: 700,
          lineHeight: 1.06,
          letterSpacing: -2.4,
          maxWidth: 900,
        }}
      >
        Convertimos la altura en un terreno seguro
      </div>

      <div style={{ display: "flex", color: "#93A5B2", fontSize: 26 }}>
        Servicios de drones para minería, energía y construcción
      </div>
    </div>,
    size,
  );
}
