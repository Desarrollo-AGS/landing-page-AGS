import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Contenedor } from "@/components/ui/Contenedor";
import { BotonEnlace } from "@/components/ui/Boton";
import { anioFundacion, quienesSomosExtracto, ventajas } from "@/content/nosotros";
import { site } from "@/content/site";
import { Encabezado, Lineas } from "@/components/vistaPrevia/iao/Tipografia";

/**
 * 04 · Quiénes somos.
 *
 * Mismo contenido que el bloque actual: los años se siguen derivando del año de
 * fundación real y no son un número escrito a mano que envejece mal.
 *
 * La puesta cambia en dos cosas: la fotografía barre de izquierda a derecha al
 * entrar (hoy ya lo hace, pero suelto) y las tres ventajas se encienden de a
 * una con el scroll en vez de aparecer juntas. El dron pasa por detrás de la
 * columna de texto, por la canaleta derecha.
 */
export function Nosotros() {
  const anios = new Date().getFullYear() - anioFundacion;

  return (
    <section
      id="capitulo-04"
      data-capitulo="04"
      data-dron-escena="nosotros"
      aria-labelledby="ini-nosotros"
      className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28"
    >
      <Contenedor>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div
            data-nosotros-foto
            // 2:1 y no 4:3: la fotografía del equipo es panorámica (8546x4176)
            // y en un marco 4:3 el recorte se comía a las personas de los extremos.
            className="chamfer relative aspect-[2/1] overflow-hidden bg-steel-100"
          >
            <Image
              src="/images/AGS-Nosotros.jpg"
              alt="Equipo de AGS Soluciones reunido frente al letrero corporativo en sus oficinas"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              loading="lazy"
              className="object-cover"
            />
          </div>

          <div>
            <Encabezado numero="04" nombre="Quiénes somos" tono="claro" />
            <h2 id="ini-nosotros" className="mt-5 text-d3 text-steel-900 sm:text-d2">
              <Lineas lineas={[`${anios} años operando drones`, "en faena industrial"]} />
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-steel-600">
              {quienesSomosExtracto} Hoy extendemos el servicio a{" "}
              {site.operacion.slice(1).join(" y ")}, desde nuestra base en Antofagasta.
            </p>

            <ul className="mt-9 space-y-5">
              {ventajas.map((v) => (
                <li key={v.titulo} data-ventaja className="flex gap-4">
                  <span aria-hidden="true" className="mt-2 h-px w-6 shrink-0 bg-orange" />
                  <div>
                    <h3 className="text-[0.9375rem] font-semibold text-steel-900">{v.titulo}</h3>
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
          </div>
        </div>
      </Contenedor>
    </section>
  );
}
