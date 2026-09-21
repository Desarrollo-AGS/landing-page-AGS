import type { CSSProperties } from "react";
import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import { Contenedor } from "@/components/ui/Contenedor";
import { enumerar, site } from "@/content/site";
import { Lineas } from "./Tipografia";

const retraso = (ms: number) => ({ "--retraso": `${ms}ms` }) as CSSProperties;

/**
 * 00 · Portada.
 *
 * Poco texto y mucho aire: el aire es el espacio donde vuela el dron 3D, que
 * entra desde fuera de pantalla y queda flotando a la derecha del titular.
 *
 * La entrada del titular es CSS y no GSAP: tiene que verse bien antes de que
 * cargue cualquier JavaScript, y es el elemento que define el LCP.
 *
 * Cuando no hay dron 3D (movimiento reducido, sin WebGL, conexión lenta), la
 * raíz queda con `data-dron="ausente"` y aparece la fotografía real de un dron
 * de la flota. La imagen es un fondo CSS condicionado a ese atributo, así que
 * no se descarga cuando el dron 3D sí está.
 */
export function Portada() {
  return (
    <section
      id="capitulo-00"
      data-capitulo="00"
      data-dron-escena="portada"
      aria-labelledby="iao-titulo"
      className="relative -mt-[68px] flex min-h-[100svh] flex-col overflow-hidden bg-steel-950"
    >
      <div aria-hidden="true" data-portada-reticula className="iao-reticula absolute inset-0" />

      <div aria-hidden="true" className="iao-dron-reserva absolute inset-0 lg:left-[40%]">
        <div className="absolute inset-0 bg-gradient-to-t from-steel-950 via-steel-950/70 to-steel-950/35 lg:bg-gradient-to-r lg:from-steel-950 lg:via-steel-950/50 lg:to-steel-950/10" />
      </div>

      <Contenedor className="relative z-10 flex flex-1 flex-col pb-6 pt-[calc(68px+1.75rem)] sm:pb-8">
        <nav aria-label="Ruta de navegación">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8125rem] text-steel-400">
            <li>
              <Link href="/" className="transition-colors hover:text-white">
                Inicio
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <CaretRight size={11} weight="bold" aria-hidden="true" className="text-steel-500" />
              <Link href="/nosotros" className="transition-colors hover:text-white">
                Nosotros
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <CaretRight size={11} weight="bold" aria-hidden="true" className="text-steel-500" />
              <span aria-current="page" className="text-steel-300">
                Brochure
              </span>
            </li>
          </ol>
        </nav>

        <div data-portada-texto className="mt-auto pt-10">
          <p className="eyebrow iao-entrada-suave text-steel-400" style={retraso(80)}>
            {site.nombreLargo}
          </p>

          <h1
            id="iao-titulo"
            className="mt-5 font-display font-bold uppercase leading-[0.88] tracking-[-0.035em] text-white"
          >
            <span className="iao-mascara">
              <span
                className="iao-mascara__texto iao-entrada text-[clamp(1.5rem,3.2vw,2.75rem)] tracking-[-0.02em] text-orange"
                style={retraso(120)}
              >
                AGS
              </span>{" "}
            </span>
            <span lang="en" className="block text-[clamp(2.3rem,9.1vw,7rem)]">
              <span className="iao-mascara">
                <span className="iao-mascara__texto iao-entrada" style={retraso(220)}>
                  Industrial
                </span>{" "}
              </span>
              <span className="iao-mascara">
                <span className="iao-mascara__texto iao-entrada" style={retraso(320)}>
                  Air Operations
                </span>
              </span>
            </span>
          </h1>

          <p
            className="iao-entrada-suave mt-7 max-w-[25rem] text-[1.0625rem] leading-relaxed text-steel-300 sm:text-lg"
            style={retraso(650)}
          >
            Estrategia y soluciones aéreas
            <br />
            para operaciones industriales.
          </p>
        </div>

        <div
          className="iao-entrada-suave mt-7 flex items-center justify-between gap-6 border-t border-white/10 pt-4 text-[0.75rem] text-steel-400 sm:mt-14 sm:pt-5"
          style={retraso(900)}
        >
          <p className="num hidden sm:block">
            23°39′ S · 70°24′ O — {site.contacto.direccion.ciudad}
          </p>
          <p className="hidden md:block">Operación en {enumerar(site.operacion)}</p>
          <a
            href="#capitulo-01"
            className="eyebrow flex items-center gap-3 text-white transition-colors hover:text-orange"
          >
            <span lang="en">Scroll to explore</span>
            <span aria-hidden="true" className="relative block h-8 w-px overflow-hidden bg-white/15">
              <span className="iao-sonda absolute inset-0 bg-orange" />
            </span>
          </a>
        </div>
      </Contenedor>
    </section>
  );
}
