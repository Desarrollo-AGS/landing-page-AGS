import Link from "next/link";
import {
  ArrowUpRight,
  EnvelopeSimple,
  InstagramLogo,
  LinkedinLogo,
  MapPin,
  Phone,
} from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/brand/Logo";
import { Contenedor } from "@/components/ui/Contenedor";
import { mailHref, site, telHref } from "@/content/site";
import {
  navFooterEmpresa,
  navFooterServicios,
  navFooterSoftware,
  type Enlace,
} from "@/lib/nav";

/**
 * F-12 · Footer corporativo.
 *
 * Cuatro columnas (servicios, empresa, software, contacto) más el bloque
 * "Apoyado por". El año del aviso legal se calcula en cada render del servidor,
 * no está escrito fijo.
 */
export function Footer() {
  const anio = new Date().getFullYear();

  return (
    <footer className="bg-steel-950 text-steel-400">
      <Contenedor className="pt-16 pb-10 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_repeat(3,minmax(0,1fr))] lg:gap-10">
          {/* Marca y contacto */}
          <div>
            <Logo variante="negativo" alto={24} />
            <p className="measure mt-5 text-[0.9375rem] leading-relaxed text-steel-400">
              Operaciones aéreas industriales para energía, minería y construcción. Tecnología e
              innovación al servicio de la seguridad y la eficiencia.
            </p>

            <ul className="mt-7 space-y-3 text-[0.9375rem]">
              <li>
                <a
                  href={mailHref}
                  className="inline-flex items-center gap-2.5 text-steel-300 transition-colors hover:text-orange"
                >
                  <EnvelopeSimple size={16} aria-hidden="true" className="shrink-0" />
                  {site.contacto.email}
                </a>
              </li>
              <li>
                <a
                  href={telHref}
                  className="num inline-flex items-center gap-2.5 text-steel-300 transition-colors hover:text-orange"
                >
                  <Phone size={16} aria-hidden="true" className="shrink-0" />
                  {site.contacto.telefono}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-steel-400">
                <MapPin size={16} aria-hidden="true" className="mt-1 shrink-0" />
                <address className="not-italic leading-relaxed">
                  {site.contacto.direccion.calle}, {site.contacto.direccion.detalle}
                  <br />
                  {site.contacto.direccion.ciudad}, {site.contacto.direccion.region}
                </address>
              </li>
            </ul>

            <ul className="mt-6 flex gap-2">
              <li>
                <a
                  href={site.redes.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram de AGS Soluciones, se abre en una pestaña nueva"
                  className="flex h-10 w-10 items-center justify-center border border-white/12 text-steel-300 transition-colors hover:border-orange hover:text-orange"
                >
                  <InstagramLogo size={18} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={site.redes.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn de AGS Soluciones, se abre en una pestaña nueva"
                  className="flex h-10 w-10 items-center justify-center border border-white/12 text-steel-300 transition-colors hover:border-orange hover:text-orange"
                >
                  <LinkedinLogo size={18} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>

          <ColumnaFooter titulo="Servicios" enlaces={navFooterServicios} />
          <ColumnaFooter titulo="Empresa" enlaces={navFooterEmpresa} />
          <ColumnaFooter titulo="Software" enlaces={navFooterSoftware} />
        </div>

        {/* -------- Apoyado por (F-12) -------------------------------------
            Etiqueta pequeña sobre el logo, en monocromo sobre fondo oscuro,
            replicando el tratamiento de itsave.cl.

            El archivo del logo NO se copia desde el sitio de itsave: se usa el
            oficial que entregue AGS. Mientras no llegue, queda esta reserva con
            el alto final ya definido, para que al reemplazarla no se mueva
            nada del layout. */}
        <div className="mt-14 border-t border-white/10 pt-8">
          <p className="eyebrow text-steel-500">Apoyado por</p>
          <div className="mt-4 flex h-11 items-center">
            <span className="flex h-11 items-center border border-dashed border-white/15 px-4 text-[0.8125rem] text-steel-500">
              Logo de Aster pendiente de entrega por AGS
            </span>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-7 text-[0.8125rem] text-steel-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {anio} {site.nombre}. {site.legal.aviso}.
          </p>
          <p className="num">{site.operacion.join(" · ")}</p>
        </div>
      </Contenedor>
    </footer>
  );
}

function ColumnaFooter({ titulo, enlaces }: { titulo: string; enlaces: Enlace[] }) {
  return (
    <nav aria-label={titulo}>
      <h2 className="eyebrow text-steel-500">{titulo}</h2>
      <ul className="mt-5 space-y-2.5 text-[0.9375rem]">
        {enlaces.map((e) => (
          <li key={e.href}>
            {e.externo ? (
              <a
                href={e.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-steel-400 transition-colors hover:text-white"
              >
                {e.label}
                <ArrowUpRight size={13} weight="bold" aria-hidden="true" />
              </a>
            ) : (
              <Link href={e.href} className="text-steel-400 transition-colors hover:text-white">
                {e.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
