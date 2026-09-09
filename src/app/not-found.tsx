import Link from "next/link";
import { Contenedor } from "@/components/ui/Contenedor";
import { BotonEnlace } from "@/components/ui/Boton";
import { servicios } from "@/content/servicios";

/**
 * 404. En vez de un callejón sin salida, ofrece las tres rutas por las que
 * llega casi todo el tráfico perdido de este sitio: servicios, casos y
 * contacto. El sitio anterior era WordPress y tenía URLs distintas, así que
 * esta página va a recibir visitas reales.
 */
export default function NoEncontrado() {
  return (
    <>
      <section className="bg-steel-900 pt-20 pb-20 sm:pt-24 sm:pb-24">
        <Contenedor>
          <span className="rule-accent mb-6" aria-hidden="true" />
          <h1 className="text-d3 text-white sm:text-d2">Esta página no existe</h1>
          <p className="measure mt-5 text-[1.0625rem] leading-relaxed text-steel-300">
            Puede que el enlace haya cambiado con el nuevo sitio. Estas son las secciones que
            probablemente buscabas.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <BotonEnlace href="/servicios" tamano="lg">
              Ver servicios
            </BotonEnlace>
            <BotonEnlace href="/contacto" variante="linea-clara" tamano="lg">
              Contáctanos
            </BotonEnlace>
          </div>
        </Contenedor>
      </section>

      <section className="bg-white py-16">
        <Contenedor>
          <h2 className="text-lg font-semibold text-steel-900">Todos los servicios</h2>
          <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {servicios.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/servicios/${s.slug}`}
                  className="text-[0.9375rem] text-steel-600 underline-offset-4 transition-colors hover:text-orange-ink hover:underline"
                >
                  {s.tituloCorto}
                </Link>
              </li>
            ))}
          </ul>
        </Contenedor>
      </section>
    </>
  );
}
