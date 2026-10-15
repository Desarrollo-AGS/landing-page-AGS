import { Contenedor } from "@/components/ui/Contenedor";
import { MarquesinaClientes } from "@/components/ui/MarquesinaClientes";
import { Encabezado } from "@/components/vistaPrevia/iao/Tipografia";
import { diccionario } from "@/content/i18n";
import type { Idioma } from "@/lib/idioma";

/**
 * 01 · Confían en nosotros.
 *
 * La franja de logos vive en `ui/MarquesinaClientes`, compartida con la página
 * de casos. Lo único propio de este capítulo es el encabezado: pasa a ser un
 * capítulo numerado, que es lo que le da continuidad al recorrido.
 *
 * Es una franja corta a propósito: separa la portada del primer capítulo fijado
 * y le da al dron el tramo de bajada por la canaleta.
 */
export function Clientes({ lang }: { lang: Idioma }) {
  const t = diccionario(lang);
  return (
    <section
      id="capitulo-01"
      data-capitulo="01"
      data-dron-escena="clientes"
      aria-labelledby="ini-clientes"
      className="border-b border-steel-100 bg-white py-14 sm:py-16"
    >
      <Contenedor>
        <Encabezado numero="01" nombre={t.inicio.clientes.capitulo} tono="claro" />
        <h2 id="ini-clientes" className="sr-only">
          {t.inicio.clientes.capitulo}
        </h2>
      </Contenedor>

      <MarquesinaClientes className="mt-8" />
    </section>
  );
}
