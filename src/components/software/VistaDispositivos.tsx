import Image from "next/image";
import type { Dispositivos } from "@/content/software";

/**
 * Composición de dispositivos de una ficha de plataforma.
 *
 * Cuenta en una sola imagen lo que el párrafo de al lado dice en palabras: la
 * plataforma se trabaja en escritorio, la versión vigente se consulta desde el
 * teléfono en terreno, y el QR es lo que lleva de una a la otra. Por eso el
 * código va encima y no al costado: es el puente entre las dos pantallas.
 *
 * DOS MONTAJES, NO UNO ESCALADO
 * -----------------------------
 * Desde 1024px las tres piezas se superponen, que es lo que les da profundidad.
 * Bajo ese ancho la superposición no cabe —el teléfono taparía justo la parte
 * útil del escritorio— así que se apilan: el escritorio completo arriba, y
 * debajo el teléfono junto al QR. Es el mismo material ordenado de otra forma,
 * no una versión recortada.
 *
 * Las capturas son interfaz, así que van con `object-contain` dentro de marcos
 * de proporción fija: recortarlas se come los paneles, que es lo que hay que
 * ver. Cada marco ya trae la proporción de su captura, así que no sobra fondo.
 */
export function VistaDispositivos({
  dispositivos,
  textos,
}: {
  dispositivos: Dispositivos;
  textos: { escritorioAlt: string; movilAlt: string; qrAlt: string; qrPie: string };
}) {
  return (
    <div aria-hidden={false}>
      {/* ---------- Superpuesto, desde 1024px ---------- */}
      <div className="relative hidden aspect-[13/10] lg:block">
        <Escritorio
          src={dispositivos.escritorio}
          alt={textos.escritorioAlt}
          sizes="46vw"
          className="absolute left-0 top-0 w-[89%]"
        />
        <Movil
          src={dispositivos.movil}
          alt={textos.movilAlt}
          sizes="12vw"
          className="absolute right-0 top-[10%] w-[31%]"
        />
        <TarjetaQr
          src={dispositivos.qr}
          alt={textos.qrAlt}
          pie={textos.qrPie}
          sizes="20vw"
          className="absolute bottom-[2%] left-[2%] w-[44%]"
        />
      </div>

      {/* ---------- Apilado, bajo 1024px ---------- */}
      <div className="lg:hidden">
        <Escritorio
          src={dispositivos.escritorio}
          alt={textos.escritorioAlt}
          sizes="(min-width: 640px) 90vw, 100vw"
        />
        <div className="mt-5 flex items-start gap-5">
          <Movil
            src={dispositivos.movil}
            alt={textos.movilAlt}
            sizes="30vw"
            className="w-[32%] max-w-[9rem] shrink-0"
          />
          <TarjetaQr
            src={dispositivos.qr}
            alt={textos.qrAlt}
            pie={textos.qrPie}
            sizes="60vw"
            className="min-w-0 flex-1"
          />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Las tres piezas                                                     */
/* ------------------------------------------------------------------ */

type Pieza = { src: string; alt: string; sizes: string; className?: string };

/**
 * RADIOS EXPLÍCITOS, A PROPÓSITO
 * ------------------------------
 * El tema del sitio fija `--radius-xs` … `--radius-xl` TODOS en 2px: la marca
 * no redondea, bisela (ver `.chamfer` en globals.css). Eso vale para tarjetas y
 * botones, pero acá los marcos imitan aparatos reales, y un aparato con la
 * esquina en pico no se lee como aparato. Por eso cada radio va escrito a mano
 * en rem; si se cambian por `rounded-*` vuelven a 2px y se pierde el efecto.
 *
 * El bisel es casi negro y no navy: sobre el fondo de la sección —que también
 * es navy— un marco del mismo tono desaparece y la captura queda flotando.
 */
const BISEL = "bg-[#030d16]";

/**
 * Tableta: bisel fino y radio contenido, que es lo que la distingue del
 * teléfono. Lleva un filo claro apenas visible porque una silueta negra sobre
 * navy pierde el canto justo en las esquinas.
 */
function Escritorio({ src, alt, sizes, className = "" }: Pieza) {
  return (
    <div
      className={`${BISEL} overflow-hidden rounded-[1.5rem] p-3 shadow-[0_28px_60px_-20px_rgba(0,0,0,0.65)] ring-1 ring-inset ring-white/10 ${className}`}
    >
      <div className="relative aspect-[1112/695] overflow-hidden rounded-[0.75rem] bg-black">
        <Image src={src} alt={alt} fill sizes={sizes} className="object-contain" />
      </div>
    </div>
  );
}

/** Teléfono: bisel más grueso y esquinas mucho más redondeadas que la tableta. */
function Movil({ src, alt, sizes, className = "" }: Pieza) {
  return (
    <div
      className={`${BISEL} overflow-hidden rounded-[2.25rem] p-2.5 shadow-[0_28px_60px_-20px_rgba(0,0,0,0.65)] ring-1 ring-inset ring-white/10 ${className}`}
    >
      <div className="relative aspect-[430/932] overflow-hidden rounded-[1.75rem] bg-black">
        <Image src={src} alt={alt} fill sizes={sizes} className="object-contain" />
      </div>
    </div>
  );
}

/**
 * La tarjeta del QR es la única pieza clara: es el puente entre las otras dos y
 * tiene que leerse como un objeto aparte, no como una tercera pantalla.
 */
function TarjetaQr({ src, alt, pie, sizes, className = "" }: Pieza & { pie: string }) {
  return (
    <figure
      className={`overflow-hidden rounded-[1rem] bg-white shadow-[0_28px_60px_-20px_rgba(0,0,0,0.65)] ${className}`}
    >
      <div className="relative aspect-[348/219]">
        <Image src={src} alt={alt} fill sizes={sizes} className="object-contain" />
      </div>
      <figcaption className="eyebrow border-t border-steel-100 px-3 py-3 text-center tracking-[0.1em] text-steel-500 lg:whitespace-nowrap">
        {pie}
      </figcaption>
    </figure>
  );
}
