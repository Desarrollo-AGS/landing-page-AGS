import Image from "next/image";
import { clientes } from "@/content/clientes";
import { Contenedor } from "@/components/ui/Contenedor";
import { Encabezado } from "@/components/vistaPrevia/iao/Tipografia";

/**
 * 01 · Confían en nosotros.
 *
 * La marquesina es la misma del inicio (misma pista duplicada, misma máscara
 * lateral, misma grilla estática bajo 768px y con movimiento reducido). Lo
 * único que cambia es el encabezado: pasa a ser un capítulo numerado, que es lo
 * que le da continuidad al recorrido.
 *
 * Es una franja corta a propósito: separa la portada del primer capítulo fijado
 * y le da al dron el tramo de bajada por la canaleta.
 */
export function Clientes() {
  return (
    <section
      id="capitulo-01"
      data-capitulo="01"
      data-dron-escena="clientes"
      aria-labelledby="ini-clientes"
      className="border-b border-steel-100 bg-white py-14 sm:py-16"
    >
      <Contenedor>
        <Encabezado numero="01" nombre="Confían en nosotros" tono="claro" />
        <h2 id="ini-clientes" className="sr-only">
          Confían en nosotros
        </h2>
      </Contenedor>

      {/* --- Marquesina, desde 768px --- */}
      <div
        className="marquee relative mt-8 hidden overflow-hidden motion-safe:md:block"
        style={{
          maskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
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
