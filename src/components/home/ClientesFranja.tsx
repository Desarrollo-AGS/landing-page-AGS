import Image from "next/image";
import { clientes } from "@/content/clientes";
import { Contenedor } from "@/components/ui/Contenedor";

/**
 * F-10a · Franja "Confían en nosotros".
 *
 * Marquesina horizontal lenta, logos en monocromo que pasan a color al hover.
 * Se pausa al pasar el puntero y también con `:focus-within`, para que un logo
 * no se escape mientras alguien tabula.
 *
 * DOS RENDERIZADOS DISTINTOS, no uno con la animación apagada:
 *   · Desde 768px, marquesina (pista duplicada, animando `transform`).
 *   · Bajo 768px, grilla estática de dos columnas, como pide el brief. En un
 *     celular una marquesina obliga a esperar a que pase el logo que interesa.
 * La grilla es además el estado de `prefers-reduced-motion`: se muestra en vez
 * de la marquesina, no una marquesina detenida a mitad de recorrido.
 *
 * La pista duplicada va con `aria-hidden`: para un lector de pantalla los ocho
 * logos existen una sola vez.
 */
export function ClientesFranja() {
  return (
    <section
      aria-labelledby="clientes-titulo"
      className="border-y border-steel-100 bg-white py-10 sm:py-12"
    >
      <Contenedor>
        <h2 id="clientes-titulo" className="eyebrow text-center text-steel-500 md:text-left">
          Confían en nosotros
        </h2>
      </Contenedor>

      {/* --- Marquesina, desde 768px --- */}
      <div
        className="marquee relative mt-8 hidden overflow-hidden motion-safe:md:block"
        // Máscara lateral: los logos se desvanecen en los bordes en vez de
        // cortarse en seco contra el borde de la ventana.
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
      <Contenedor className="mt-8 motion-safe:md:hidden">
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
    </section>
  );
}
