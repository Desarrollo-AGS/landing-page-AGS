import Image from "next/image";
import type { Captura, Dispositivos } from "@/content/software";

export interface TextosDispositivos {
  escritorioAlt: string;
  movilAlt?: string;
  qrAlt?: string;
  qrPie?: string;
}

/**
 * Composición de dispositivos de una ficha de plataforma.
 *
 * DOS MONTAJES SEGÚN LO QUE HAYA
 * ------------------------------
 * Con las tres vistas —SmartLayout— se superponen, y así cuentan en una imagen
 * lo que el párrafo de al lado dice en palabras: la plataforma se trabaja en
 * escritorio, la versión vigente se consulta desde el teléfono en terreno, y el
 * QR es lo que lleva de una a la otra. Por eso el código va encima y no al
 * costado: es el puente entre las dos pantallas.
 *
 * Con escritorio y teléfono —SmartField— se superponen igual, pero sin la
 * esquina del QR: ahí la tableta se centra contra el teléfono en vez de
 * apoyarse arriba, para que no quede un hueco abajo a la izquierda.
 *
 * Con una sola —SmartLix— no hay nada que superponer, así que va centrada y
 * ocupando el ancho completo de la columna. Un marco solo, metido en el tamaño
 * que tendría dentro de la composición, se vería pequeño sin motivo.
 *
 * Y EN ANGOSTO, APILADAS
 * ----------------------
 * Bajo 1024px la superposición no cabe: el teléfono taparía justo la parte útil
 * del escritorio. Se apilan —el escritorio completo arriba, y debajo el
 * teléfono junto al QR—, que es el mismo material ordenado de otra forma, no
 * una versión recortada.
 */
export function VistaDispositivos({
  dispositivos,
  textos,
}: {
  dispositivos: Dispositivos;
  textos: TextosDispositivos;
}) {
  const { escritorio, movil, qr } = dispositivos;

  // Cada pieza necesita imagen Y texto alternativo. Si falta cualquiera de las
  // dos mitades, esa pieza no entra: nunca se publica una captura sin su
  // descripción.
  const tel = movil && textos.movilAlt ? { captura: movil, alt: textos.movilAlt } : null;
  const codigo =
    qr && textos.qrAlt && textos.qrPie
      ? { captura: qr, alt: textos.qrAlt, pie: textos.qrPie }
      : null;

  // Sin teléfono no hay nada que superponer: la captura va sola y grande.
  if (!tel) {
    return (
      <Tableta
        captura={escritorio}
        alt={textos.escritorioAlt}
        sizes="(min-width: 1024px) 50vw, 100vw"
      />
    );
  }

  // Con QR la tableta se apoya arriba y el código ocupa la esquina inferior
  // izquierda; sin él esa esquina quedaría vacía, así que la tableta se centra
  // contra el teléfono y el conjunto se acomoda en un cuadro más bajo.
  const conQr = Boolean(codigo);

  return (
    <>
      {/* ---------- Superpuesto, desde 1024px ---------- */}
      <div className={`relative hidden lg:block ${conQr ? "aspect-[13/10]" : "aspect-[4/3]"}`}>
        <Tableta
          captura={escritorio}
          alt={textos.escritorioAlt}
          sizes="46vw"
          className={
            conQr ? "absolute left-0 top-0 w-[89%]" : "absolute left-0 top-[18%] w-[86%]"
          }
        />
        <Telefono
          captura={tel.captura}
          alt={tel.alt}
          sizes="12vw"
          className={
            conQr ? "absolute right-0 top-[10%] w-[31%]" : "absolute right-0 top-[2%] w-[31%]"
          }
        />
        {codigo ? (
          <TarjetaQr
            captura={codigo.captura}
            alt={codigo.alt}
            pie={codigo.pie}
            sizes="20vw"
            className="absolute bottom-[2%] left-[2%] w-[44%]"
          />
        ) : null}
      </div>

      {/* ---------- Apilado, bajo 1024px ---------- */}
      <div className="lg:hidden">
        <Tableta
          captura={escritorio}
          alt={textos.escritorioAlt}
          sizes="(min-width: 640px) 90vw, 100vw"
        />
        {/* Sin la tarjeta del QR el teléfono se queda solo: centrado, en vez de
            pegado a la izquierda con medio ancho vacío al lado. */}
        <div className={`mt-5 flex items-start gap-5 ${codigo ? "" : "justify-center"}`}>
          <Telefono
            captura={tel.captura}
            alt={tel.alt}
            sizes="30vw"
            className={codigo ? "w-[32%] max-w-[9rem] shrink-0" : "w-[38%] max-w-[11rem]"}
          />
          {codigo ? (
            <TarjetaQr
              captura={codigo.captura}
              alt={codigo.alt}
              pie={codigo.pie}
              sizes="60vw"
              className="min-w-0 flex-1"
            />
          ) : null}
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Las piezas                                                          */
/* ------------------------------------------------------------------ */

type Pieza = { captura: Captura; alt: string; sizes: string; className?: string };

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
const SOMBRA = "shadow-[0_28px_60px_-20px_rgba(0,0,0,0.65)]";

/**
 * Marco de aparato. La proporción sale de la propia captura, así que el bisel
 * la ciñe sin dejar franjas de fondo a los lados.
 */
function Marco({
  captura,
  alt,
  sizes,
  className = "",
  relleno,
  radio,
  radioInterior,
}: Pieza & { relleno: string; radio: string; radioInterior: string }) {
  return (
    <div
      className={`${BISEL} ${SOMBRA} ${radio} ${relleno} overflow-hidden ring-1 ring-inset ring-white/10 ${className}`}
    >
      <div
        className={`${radioInterior} relative overflow-hidden bg-black`}
        style={{ aspectRatio: captura.aspecto }}
      >
        <Image src={captura.src} alt={alt} fill sizes={sizes} className="object-contain" />
      </div>
    </div>
  );
}

/** Tableta: bisel fino y radio contenido, que es lo que la distingue del teléfono. */
function Tableta(props: Pieza) {
  return (
    <Marco
      {...props}
      relleno="p-3"
      radio="rounded-[1.5rem]"
      radioInterior="rounded-[0.75rem]"
    />
  );
}

/** Teléfono: bisel más grueso y esquinas mucho más redondeadas que la tableta. */
function Telefono(props: Pieza) {
  return (
    <Marco
      {...props}
      relleno="p-2.5"
      radio="rounded-[2.25rem]"
      radioInterior="rounded-[1.75rem]"
    />
  );
}

/**
 * La tarjeta del QR es la única pieza clara: es el puente entre las otras dos y
 * tiene que leerse como un objeto aparte, no como una tercera pantalla.
 */
function TarjetaQr({ captura, alt, pie, sizes, className = "" }: Pieza & { pie: string }) {
  return (
    <figure className={`${SOMBRA} overflow-hidden rounded-[1rem] bg-white ${className}`}>
      <div className="relative" style={{ aspectRatio: captura.aspecto }}>
        <Image src={captura.src} alt={alt} fill sizes={sizes} className="object-contain" />
      </div>
      <figcaption className="eyebrow border-t border-steel-100 px-3 py-3 text-center tracking-[0.1em] text-steel-500 lg:whitespace-nowrap">
        {pie}
      </figcaption>
    </figure>
  );
}
