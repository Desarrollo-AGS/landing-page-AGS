import Image from "next/image";
import Link from "next/link";
import { servicios } from "@/data/servicios";
import { siteConfig } from "@/lib/metadata";

/**
 * URLs reales provistas por el cliente (spec_mejoras_landing_page.md, ticket 7) —
 * ver lib/metadata.ts. Resuelve el blocker documentado desde el ticket 1.2: el
 * footer del sitio en vivo no tenía redes sociales al momento de ese sprint.
 */
const { contacto, redes } = siteConfig;

// lucide-react (v1.27, ya instalado desde el ticket 3) no incluye íconos de marcas
// (LinkedIn/Instagram no existen en ese paquete) — SVGs propios, mismo patrón que
// los demás íconos inline del proyecto.
function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.064 2.064 0 1 1 0-4.129 2.064 2.064 0 0 1 0 4.129zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.645.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98C23.986 15.667 24 15.259 24 12s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

const socialLinks = [
  { label: "LinkedIn", href: redes.linkedin, Icon: LinkedinIcon },
  { label: "Instagram", href: redes.instagram, Icon: InstagramIcon },
];

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
            <div className="mt-4 flex items-center gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} de AGS Soluciones (se abre en una pestaña nueva)`}
                  className="text-white/70 transition-colors hover:text-brand-orange"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-orange">
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
            <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-orange">
              Empresa
            </h3>
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
            <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-orange">
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
