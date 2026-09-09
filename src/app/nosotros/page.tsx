import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Certificate } from "@phosphor-icons/react/dist/ssr";
import { CabeceraPagina } from "@/components/ui/CabeceraPagina";
import { Contenedor } from "@/components/ui/Contenedor";
import { Revelar } from "@/components/ui/Revelar";
import { AvisoProvisional } from "@/components/ui/AvisoProvisional";
import { ContactoBloque } from "@/components/home/ContactoBloque";
import {
  anioFundacion,
  historia,
  metodologia,
  mision,
  quienesSomos,
  ventajas,
  vision,
} from "@/content/nosotros";
import { enumerar, site } from "@/content/site";
import { metadatosDe } from "@/lib/seo";

export const metadata: Metadata = metadatosDe({
  titulo: "Nosotros: quiénes somos, misión, visión e historia",
  descripcion: `AGS Soluciones opera drones industriales desde ${anioFundacion} en Antofagasta, con servicios en Chile, Perú y Argentina para minería, energía y construcción.`,
  ruta: "/nosotros",
});

/** Navegación interna de la página. Las cuatro secciones son anclas reales. */
const SECCIONES = [
  { id: "quienes-somos", label: "Quiénes somos" },
  { id: "mision", label: "Misión y visión" },
  { id: "historia", label: "Nuestra historia" },
  { id: "certificaciones", label: "Certificaciones" },
];

export default function PaginaNosotros() {
  const anios = new Date().getFullYear() - anioFundacion;

  return (
    <>
      <CabeceraPagina
        titulo={`${anios} años convirtiendo la altura en un terreno seguro`}
        bajada={`Desde Antofagasta, operando en ${enumerar(site.operacion)}.`}
        migas={[{ label: "Nosotros" }]}
      />

      {/* Navegación interna. Sticky bajo el navbar: en una página de cuatro
          bloques largos es lo que evita tener que volver arriba cada vez. */}
      <nav
        aria-label="Secciones de esta página"
        className="sticky top-[68px] z-30 border-b border-steel-100 bg-white/92 backdrop-blur-md"
      >
        <Contenedor>
          <ul className="-mx-1 flex gap-1 overflow-x-auto py-2">
            {SECCIONES.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="block whitespace-nowrap rounded-xs px-3 py-2 text-[0.875rem] font-medium text-steel-600 transition-colors hover:bg-steel-50 hover:text-steel-900"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </Contenedor>
      </nav>

      {/* ---------------- Quiénes somos ---------------- */}
      <section id="quienes-somos" className="scroll-mt-32 bg-white py-16 sm:py-20">
        <Contenedor>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-16">
            <Revelar>
              <span className="rule-accent mb-6" aria-hidden="true" />
              <h2 className="text-d3 text-steel-900">Quiénes somos</h2>
              <p className="mt-6 text-[1.0625rem] leading-relaxed text-steel-700">
                {quienesSomos.texto}
              </p>

              <ul className="mt-10 grid gap-6 sm:grid-cols-3">
                {ventajas.map((v) => (
                  <li key={v.titulo}>
                    <span aria-hidden="true" className="block h-px w-8 bg-orange" />
                    <h3 className="mt-4 text-[0.9375rem] font-semibold text-steel-900">
                      {v.titulo}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-steel-600">{v.detalle}</p>
                  </li>
                ))}
              </ul>
            </Revelar>

            <Revelar delay={0.08}>
              <div className="chamfer relative aspect-[4/3] overflow-hidden bg-steel-100">
                <Image
                  src="/images/equipo-reconocimiento-bhp.webp"
                  alt="Equipo de AGS Soluciones recibiendo un reconocimiento en el encuentro de proveedores de Minera Escondida, BHP"
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Revelar>
          </div>
        </Contenedor>
      </section>

      {/* ---------------- Misión y visión ---------------- */}
      <section id="mision" className="scroll-mt-32 bg-steel-50 py-16 sm:py-20">
        <Contenedor>
          <div className="grid gap-10 lg:grid-cols-2">
            <Revelar>
              <article className="chamfer flex h-full flex-col bg-white p-8 sm:p-10">
                <h2 className="text-d4 text-steel-900">Misión</h2>
                <p className="mt-5 flex-1 text-[1.0625rem] leading-relaxed text-steel-700">
                  {mision.texto}
                </p>
                {!mision.verificado ? <AvisoProvisional /> : null}
              </article>
            </Revelar>

            <Revelar delay={0.08}>
              <article className="chamfer flex h-full flex-col bg-white p-8 sm:p-10">
                <h2 className="text-d4 text-steel-900">Visión</h2>
                <p className="mt-5 flex-1 text-[1.0625rem] leading-relaxed text-steel-700">
                  {vision.texto}
                </p>
                {!vision.verificado ? <AvisoProvisional /> : null}
              </article>
            </Revelar>
          </div>

          <Revelar delay={0.12}>
            <div className="mt-10 border-l-2 border-orange bg-white p-8 sm:p-10">
              <h2 className="text-lg font-semibold text-steel-900">
                Cómo procesamos la información
              </h2>
              <p className="measure mt-4 text-[1.0625rem] leading-relaxed text-steel-700">
                {metodologia.texto}
              </p>
            </div>
          </Revelar>
        </Contenedor>
      </section>

      {/* ---------------- Historia ----------------
          La línea de tiempo se renderiza desde `historia`, así que funciona con
          un hito y con quince. El filete vertical se dibuja con un borde en el
          <ol>, no con un elemento decorativo por fila. */}
      <section id="historia" className="scroll-mt-32 bg-white py-16 sm:py-20">
        <Contenedor>
          <Revelar>
            <span className="rule-accent mb-6" aria-hidden="true" />
            <h2 className="text-d3 text-steel-900">Nuestra historia</h2>
          </Revelar>

          <ol className="mt-12 border-l border-steel-200">
            {historia.map((h, i) => (
              <Revelar
                as="li"
                key={h.anio + h.titulo}
                delay={i * 0.06}
                className="relative pb-12 pl-8 last:pb-0 sm:pl-12"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-2 h-px w-5 -translate-x-px bg-orange sm:w-8"
                />
                <p className="num text-[0.8125rem] font-semibold tracking-[0.08em] text-orange-ink">
                  {h.anio}
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-[-0.018em] text-steel-900">
                  {h.titulo}
                </h3>
                <p className="measure mt-2.5 text-[0.9375rem] leading-relaxed text-steel-600">
                  {h.detalle}
                </p>
                {!h.verificado ? <AvisoProvisional compacto /> : null}
              </Revelar>
            ))}
          </ol>
        </Contenedor>
      </section>

      {/* ---------------- Puente a certificaciones ---------------- */}
      <section id="certificaciones" className="scroll-mt-32 bg-steel-900 py-14">
        <Contenedor>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-5">
              <Certificate
                size={26}
                weight="light"
                aria-hidden="true"
                className="mt-1 shrink-0 text-orange"
              />
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Permisos, normas y certificaciones
                </h2>
                <p className="measure mt-2 text-[0.9375rem] leading-relaxed text-steel-400">
                  El marco regulatorio bajo el que opera AGS y los documentos que lo respaldan.
                </p>
              </div>
            </div>
            <Link
              href="/nosotros/certificaciones"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-orange underline-offset-4 hover:underline"
            >
              Ver el detalle
              <ArrowRight size={14} weight="bold" aria-hidden="true" />
            </Link>
          </div>
        </Contenedor>
      </section>

      <ContactoBloque />
    </>
  );
}
