import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Contenedor } from "@/components/ui/Contenedor";
import { Revelar } from "@/components/ui/Revelar";
import { TarjetaNoticia } from "@/components/ui/TarjetaNoticia";
import { getNoticias } from "@/content/noticias";

/**
 * F-09 · Últimas tres noticias en el home.
 *
 * Si todavía no hay ninguna publicada, la sección NO se renderiza. Un bloque
 * "Noticias" vacío en la portada se lee como un sitio abandonado; que no
 * aparezca hasta que exista contenido es el comportamiento correcto.
 */
export async function NoticiasBloque() {
  const noticias = (await getNoticias()).slice(0, 3);
  if (noticias.length === 0) return null;

  return (
    <section className="bg-steel-50 py-20 sm:py-24 lg:py-28">
      <Contenedor>
        <Revelar>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-[34rem]">
              <span className="rule-accent mb-6" aria-hidden="true" />
              <h2 className="text-d3 text-steel-900 sm:text-d2">Novedades</h2>
            </div>
            <Link
              href="/noticias"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-ink underline-offset-4 hover:underline"
            >
              Ver todas las noticias
              <ArrowRight size={14} weight="bold" aria-hidden="true" />
            </Link>
          </div>
        </Revelar>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {noticias.map((n, i) => (
            <Revelar as="li" key={n.slug} delay={i * 0.07} className="h-full h-full">
              <TarjetaNoticia noticia={n} />
            </Revelar>
          ))}
        </ul>
      </Contenedor>
    </section>
  );
}
