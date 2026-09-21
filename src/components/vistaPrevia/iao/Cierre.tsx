import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { BotonEnlace } from "@/components/ui/Boton";
import { Contenedor } from "@/components/ui/Contenedor";
import { Encabezado, Lineas } from "./Tipografia";

/**
 * 07 · Cierre.
 *
 * Vuelve a la idea central. El dron sube, pasa sobre la frase y se aleja: la
 * frase queda sola. El CTA baja al formulario de contacto de esta misma página,
 * que es el mismo bloque que usan todas las páginas del sitio.
 */
export function Cierre() {
  return (
    <section
      id="capitulo-07"
      data-capitulo="07"
      data-dron-escena="cierre"
      aria-labelledby="iao-cierre"
      className="iao-cierre iao-fijado-escritorio relative isolate flex min-h-[100svh] items-end overflow-hidden bg-steel-950"
    >
      <div aria-hidden="true" data-cierre-fondo className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-drone-aerofotografia-antofagasta.webp"
          alt=""
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover object-[70%_center] opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-steel-950 via-steel-950/70 to-steel-950/40" />
      </div>

      <Contenedor className="iao-cierre__contenido pb-16 pt-[46svh] sm:pb-24 lg:pt-40">
        <Encabezado numero="07" nombre="Cierre" />
        <h2
          id="iao-cierre"
          data-cierre-titulo
          className="mt-7 font-display text-[clamp(2.3rem,6.6vw,6.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.035em] text-white"
        >
          <Lineas
            lineas={[
              "El vuelo termina",
              <span key="donde" className="text-steel-400">
                donde empieza
              </span>,
              <span key="dato" className="text-orange">
                el dato.
              </span>,
            ]}
          />
        </h2>

        <div
          data-cierre-cta
          className="mt-12 flex flex-col gap-8 border-t border-white/10 pt-8 lg:mt-14 lg:flex-row lg:items-end lg:justify-between"
        >
          <p className="max-w-[26rem] text-xl leading-snug text-steel-200">
            Transformemos la información de su operación en decisiones.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <BotonEnlace href="#contacto" tamano="lg">
              Hablemos de su operación
              <ArrowRight size={15} weight="bold" aria-hidden="true" />
            </BotonEnlace>
            <BotonEnlace href="/" variante="linea-clara" tamano="lg">
              Volver al inicio
            </BotonEnlace>
          </div>
        </div>
      </Contenedor>
    </section>
  );
}
