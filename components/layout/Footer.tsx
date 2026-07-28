import Image from "next/image";
import Link from "next/link";
import { servicios } from "@/data/servicios";
import { siteConfig } from "@/lib/metadata";

/**
 * Nota: el ticket 1.2 pide un enlace a LinkedIn "según lo visto en el sitio actual",
 * pero el `<footer>` del sitio en vivo está vacío (sin enlaces a redes sociales) al
 * momento de este sprint — no hay una URL real que enlazar todavía. Se omite la
 * sección de redes hasta que el cliente confirme un enlace real (no se inventa).
 */
const { contacto } = siteConfig;

export default function Footer() {
  const anio = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-brand-navy text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Image src="/images/logo-ags.svg" alt="AGS Soluciones" width={140} height={19} />
            <p className="mt-4 text-sm text-white/70">
              Tecnología e innovación al servicio de la seguridad y la eficiencia.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/50">
              Servicios
            </h3>
            <ul className="mt-4 space-y-2">
              {servicios.map((servicio) => (
                <li key={servicio.slug}>
                  <Link
                    href={`/servicios/${servicio.slug}`}
                    className="text-sm text-white/80 transition-colors hover:text-brand-orange"
                  >
                    {servicio.titulo}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/50">Empresa</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/nosotros"
                  className="text-sm text-white/80 transition-colors hover:text-brand-orange"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/#casos-exito"
                  className="text-sm text-white/80 transition-colors hover:text-brand-orange"
                >
                  Casos de Éxito
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/50">
              Contacto
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li>
                <a
                  href={`mailto:${contacto.email}`}
                  className="transition-colors hover:text-brand-orange"
                >
                  {contacto.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contacto.telefonoE164}`}
                  className="transition-colors hover:text-brand-orange"
                >
                  {contacto.telefono}
                </a>
              </li>
              <li>{contacto.direccion.localidad}, Chile</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/50">
          <p>© {anio} AGS Soluciones. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
