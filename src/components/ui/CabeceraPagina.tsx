import { Contenedor } from "@/components/ui/Contenedor";
import { Migas } from "@/components/ui/Migas";
import { IDIOMA_POR_DEFECTO, type Idioma } from "@/lib/idioma";

/**
 * Cabecera de página interna. Fondo navy corporativo: separa la página del
 * home sin cambiar el tema del sitio, que sigue siendo claro. Es el mismo
 * recurso que usan el hero y el footer, así que la portada abre y cierra en
 * oscuro y las internas heredan solo la franja superior.
 */
export function CabeceraPagina({
  titulo,
  bajada,
  migas,
  lang = IDIOMA_POR_DEFECTO,
}: {
  titulo: string;
  bajada?: string;
  migas?: { label: string; href?: string }[];
  lang?: Idioma;
}) {
  return (
    <section className="bg-steel-900 pt-14 pb-16 sm:pt-16 sm:pb-20">
      <Contenedor>
        <Migas items={migas ?? []} lang={lang} className="mb-7" />

        <span className="rule-accent mb-6" aria-hidden="true" />
        <h1 className="max-w-[24ch] text-d3 text-white sm:text-d2">{titulo}</h1>
        {bajada ? (
          <p className="measure mt-5 text-[1.0625rem] leading-relaxed text-steel-300">
            {bajada}
          </p>
        ) : null}
      </Contenedor>
    </section>
  );
}
