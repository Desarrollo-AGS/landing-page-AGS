import Image from "next/image";
import { clientes } from "@/content/clientes";
import { Contenedor } from "@/components/ui/Contenedor";

/**
 * Franja de logotipos de clientes.
 *
 * Vive aparte porque la usan dos sitios —el capítulo 01 del inicio y la página
 * de casos— y una copia pegada se habría quedado atrás a la primera vez que
 * cambie un logo, una altura óptica o la máscara.
 *
 * DOS MONTAJES, NO UNO ESCALADO
 * -----------------------------
 * Desde 768px la pista se duplica y se desplaza; la segunda copia va
 * `aria-hidden` y sin `alt`, porque para un lector de pantalla los ocho logos
 * ya se nombraron una vez. Bajo ese ancho, y con movimiento reducido, no hay
 * marquesina: los mismos ocho en grilla estática. No es una versión recortada,
 * es el mismo contenido sin el movimiento.
 */
export function MarquesinaClientes({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      {/* --- Marquesina, desde 768px --- */}
      <div
        className="marquee relative hidden overflow-hidden motion-safe:md:block"
        style={{
          maskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
        }}
      >
        <div className="marquee-track">
          {[0, 1].map((copia) => (
            <ul key={copia} aria-hidden={copia === 1} className="flex shrink-0 items-center">
              {clientes.map((c) => (
                <li
                  key={`${copia}-${c.nombre}`}
                  className="flex w-[12rem] shrink-0 items-center justify-center"
                >
                  <Image
                    src={c.archivo}
                    alt={copia === 0 ? c.nombre : ""}
                    width={c.w}
                    height={c.h}
                    style={{ height: c.alto, width: "auto" }}
                    className="logo-mark w-auto object-contain"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* --- Grilla estática: móvil y movimiento reducido --- */}
      <Contenedor className="motion-safe:md:hidden">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
          {clientes.map((c) => (
            <li key={c.nombre} className="flex h-11 items-center justify-center">
              <Image
                src={c.archivo}
                alt={c.nombre}
                width={c.w}
                height={c.h}
                style={{ height: c.alto, width: "auto" }}
                className="logo-mark w-auto object-contain"
              />
            </li>
          ))}
        </ul>
      </Contenedor>
    </div>
  );
}
