import { Enlace as Link } from "@/components/ui/Enlace";
import { Contenedor } from "@/components/ui/Contenedor";
import { BotonEnlace } from "@/components/ui/Boton";
import { servicios } from "@/content/servicios";
import { diccionario } from "@/content/i18n";
import { IDIOMA_POR_DEFECTO } from "@/lib/idioma";

/**
 * 404. En vez de un callejón sin salida, ofrece las tres rutas por las que
 * llega casi todo el tráfico perdido de este sitio: servicios, casos y
 * contacto. El sitio anterior era WordPress y tenía URLs distintas, así que
 * esta página va a recibir visitas reales.
 *
 * IDIOMA. Next renderiza `not-found` sin resolver el segmento `[lang]`, así
 * que acá no hay `params` de donde leerlo: la página sale en español, que es el
 * idioma por defecto del sitio. Un 404 en el idioma equivocado es un costo
 * menor que inventar un idioma a partir de una URL que justamente no existe.
 */
export default function NoEncontrado() {
  const t = diccionario(IDIOMA_POR_DEFECTO);
  return (
    <>
      <section className="bg-steel-900 pt-20 pb-20 sm:pt-24 sm:pb-24">
        <Contenedor>
          <span className="rule-accent mb-6" aria-hidden="true" />
          <h1 className="text-d3 text-white sm:text-d2">{t.paginas.noEncontrado.titulo}</h1>
          <p className="measure mt-5 text-[1.0625rem] leading-relaxed text-steel-300">
            {t.paginas.noEncontrado.parrafo}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <BotonEnlace href="/servicios" tamano="lg">
              {t.paginas.noEncontrado.ctaServicios}
            </BotonEnlace>
            <BotonEnlace href="/contacto" variante="linea-clara" tamano="lg">
              {t.paginas.noEncontrado.ctaContacto}
            </BotonEnlace>
          </div>
        </Contenedor>
      </section>

      <section className="bg-white py-16">
        <Contenedor>
          <h2 className="text-lg font-semibold text-steel-900">
            {t.paginas.noEncontrado.todosLosServicios}
          </h2>
          <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {servicios.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/servicios/${s.slug}`}
                  className="text-[0.9375rem] text-steel-600 underline-offset-4 transition-colors hover:text-orange-ink hover:underline"
                >
                  {t.servicios[s.slug].tituloCorto}
                </Link>
              </li>
            ))}
          </ul>
        </Contenedor>
      </section>
    </>
  );
}
