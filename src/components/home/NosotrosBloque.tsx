import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Contenedor } from "@/components/ui/Contenedor";
import { Revelar } from "@/components/ui/Revelar";
import { anioFundacion, quienesSomosExtracto, ventajas } from "@/content/nosotros";
import { site } from "@/content/site";
import { BotonEnlace } from "@/components/ui/Boton";

/**
 * Presentación de la empresa en el home, con enlace a /nosotros.
 *
 * Los "años de experiencia" se derivan del año de fundación real (2016,
 * confirmado en el texto oficial de Quiénes Somos), no es un número escrito a
 * mano que envejece mal.
 */
export function NosotrosBloque() {
  const anios = new Date().getFullYear() - anioFundacion;

  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <Contenedor>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Revelar>
            <div className="chamfer relative aspect-[4/3] overflow-hidden bg-steel-100">
              <Image
                src="/images/equipo-reconocimiento-bhp.webp"
                alt="Equipo de AGS Soluciones recibiendo un reconocimiento en el encuentro de proveedores de Minera Escondida, BHP"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                loading="lazy"
                className="object-cover"
              />
            </div>
          </Revelar>

          <Revelar delay={0.08}>
            <span className="rule-accent mb-6" aria-hidden="true" />
            <h2 className="text-d3 text-steel-900 sm:text-d2">
              {anios} años operando drones en faena industrial
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-steel-600">
              {quienesSomosExtracto} Hoy extendemos el servicio a{" "}
              {site.operacion.slice(1).join(" y ")}, desde nuestra base en Antofagasta.
            </p>

            <ul className="mt-9 space-y-5">
              {ventajas.map((v) => (
                <li key={v.titulo} className="flex gap-4">
                  <span aria-hidden="true" className="mt-2 h-px w-6 shrink-0 bg-orange" />
                  <div>
                    <h3 className="text-[0.9375rem] font-semibold text-steel-900">
                      {v.titulo}
                    </h3>
                    <p className="mt-1 text-[0.9375rem] leading-relaxed text-steel-600">
                      {v.detalle}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <BotonEnlace href="/nosotros" variante="linea" tamano="lg" className="mt-9">
              Conocer AGS
              <ArrowRight size={15} weight="bold" aria-hidden="true" />
            </BotonEnlace>
          </Revelar>
        </div>
      </Contenedor>
    </section>
  );
}
