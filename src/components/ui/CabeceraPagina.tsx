import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import { Contenedor } from "@/components/ui/Contenedor";

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
}: {
  titulo: string;
  bajada?: string;
  migas?: { label: string; href?: string }[];
}) {
  return (
    <section className="bg-steel-900 pt-14 pb-16 sm:pt-16 sm:pb-20">
      <Contenedor>
        {migas?.length ? (
          <nav aria-label="Ruta de navegación" className="mb-7">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8125rem] text-steel-400">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Inicio
                </Link>
              </li>
              {migas.map((m, i) => (
                <li key={m.label} className="flex items-center gap-2">
                  <CaretRight
                    size={11}
                    weight="bold"
                    aria-hidden="true"
                    className="text-steel-500"
                  />
                  {m.href && i < migas.length - 1 ? (
                    <Link href={m.href} className="transition-colors hover:text-white">
                      {m.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-steel-300">
                      {m.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

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
