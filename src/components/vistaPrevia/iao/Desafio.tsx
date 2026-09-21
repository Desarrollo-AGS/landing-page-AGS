import Image from "next/image";
import { Contenedor } from "@/components/ui/Contenedor";
import { desafios } from "@/content/brochureIao";
import { Encabezado, Lineas } from "./Tipografia";

/**
 * 01 · El desafío.
 *
 * Primero el problema, sin dron. En escritorio el capítulo se fija y el scroll
 * enciende los cinco conceptos de a uno; cuando están todos, la fotografía de
 * un piloto de AGS en faena cubre la pantalla y recién ahí llega el dron.
 *
 * En móvil y con movimiento reducido es un bloque de lectura normal seguido de
 * la fotografía: la misma historia, sin fijar la pantalla.
 */
export function Desafio() {
  return (
    <section
      id="capitulo-01"
      data-capitulo="01"
      data-dron-escena="desafio"
      aria-labelledby="iao-desafio"
      className="iao-desafio iao-fijado-escritorio relative bg-steel-950 pt-24 sm:pt-32"
    >
      <Contenedor className="iao-desafio__contenido relative">
        <div className="grid w-full gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center lg:gap-20">
          <div>
            <Encabezado numero="01" nombre="El desafío" />
            <h2
              id="iao-desafio"
              data-desafio-titulo
              className="mt-7 font-display text-[clamp(2.4rem,5.6vw,5.25rem)] font-bold uppercase leading-[0.92] tracking-[-0.035em] text-white"
            >
              <Lineas lineas={["Las operaciones", "industriales", "no pueden detenerse."]} />
            </h2>
          </div>

          <ol className="border-t border-white/10">
            {desafios.map((d, i) => (
              <li
                key={d.concepto}
                data-desafio-fila
                className="relative grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-2 border-b border-white/10 py-4 sm:py-5"
              >
                <span className="num pt-1.5 text-[0.75rem] text-steel-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-[clamp(1.35rem,2.3vw,2rem)] font-semibold uppercase leading-tight tracking-[-0.015em] text-white">
                    {d.concepto}
                  </h3>
                  <p className="mt-1.5 max-w-[30rem] text-[0.9375rem] leading-relaxed text-steel-400">
                    {d.detalle}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  data-tick
                  className="absolute -bottom-px left-0 h-px w-full origin-left bg-orange/70"
                />
              </li>
            ))}
          </ol>
        </div>
      </Contenedor>

      {/* La solución: el piloto en terreno. El dron 3D llega sobre el cielo. */}
      <div
        data-desafio-foto
        className="iao-desafio__foto relative mt-20 aspect-[4/5] overflow-hidden bg-steel-900 sm:aspect-[16/9] lg:aspect-[21/9]"
      >
        <div data-desafio-imagen className="absolute inset-0">
          <Image
            src="/images/fachada-antes-despues.webp"
            alt="Fachada de una nave industrial durante la limpieza con dron: la franja superior aún sucia y la inferior ya limpia"
            fill
            sizes="100vw"
            loading="lazy"
            className="object-cover object-[60%_center]"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-steel-950 via-steel-950/35 to-steel-950/10"
        />
        <Contenedor className="absolute inset-x-0 bottom-0 pb-10 sm:pb-14 lg:pb-16">
          <p
            data-desafio-frase
            className="max-w-[16ch] font-display text-[clamp(2rem,5vw,4.5rem)] font-bold leading-[0.98] tracking-[-0.03em] text-white"
          >
            <Lineas lineas={["AGS lleva la inspección", "hasta el activo."]} />
          </p>
        </Contenedor>
      </div>
    </section>
  );
}
