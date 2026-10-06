import {
  EnvelopeSimple,
  InstagramLogo,
  LinkedinLogo,
  MapPin,
  Phone,
} from "@phosphor-icons/react/dist/ssr";
import { mailHref, site, telHref } from "@/content/site";
import { Contenedor } from "@/components/ui/Contenedor";
import { SelectorIdioma } from "./SelectorIdioma";
import { diccionario } from "@/content/i18n";
import type { Idioma } from "@/lib/idioma";

/**
 * F-01 · Barra superior de contacto.
 *
 * Franja delgada sobre el navbar, presente en todas las páginas. Fondo navy
 * corporativo con texto steel-300 (8.77:1) y hover a blanco: contraste
 * suficiente sin competir con el navbar, que va en blanco.
 *
 * Colapso en móvil: bajo 768px la dirección desaparece (es el dato menos
 * accionable con el pulgar) y el correo se reduce a su icono. Teléfono y redes
 * se mantienen: son los dos que sí se tocan desde un celular. La franja nunca
 * pasa de 36px de alto, así que no empuja el hero fuera de pantalla.
 */
export function BarraSuperior({ lang }: { lang: Idioma }) {
  const t = diccionario(lang);
  return (
    <div className="relative z-50 bg-steel-900 text-steel-300">
      <Contenedor className="flex h-9 items-center justify-between gap-4">
        <ul className="flex items-center gap-1">
          <li>
            <a
              href={site.redes.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.ui.instagram}
              className="flex h-9 w-8 items-center justify-center transition-colors duration-200 hover:text-orange"
            >
              <InstagramLogo size={17} weight="regular" aria-hidden="true" />
            </a>
          </li>
          <li>
            <a
              href={site.redes.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.ui.linkedin}
              className="flex h-9 w-8 items-center justify-center transition-colors duration-200 hover:text-orange"
            >
              <LinkedinLogo size={17} weight="regular" aria-hidden="true" />
            </a>
          </li>
        </ul>

        <ul className="flex items-center gap-5 text-[0.8125rem]">
          {/* El selector va acá y no en el navbar: la barra está en todas las
              páginas y en todos los anchos, así que el cambio de idioma está
              siempre a la vista sin competir con la navegación. */}
          <li className="order-last border-l border-white/15 pl-5">
            <SelectorIdioma />
          </li>
          <li className="hidden lg:block">
            <span className="flex items-center gap-2">
              <MapPin size={14} aria-hidden="true" className="shrink-0 text-steel-400" />
              <span>{site.contacto.direccion.corta}</span>
            </span>
          </li>
          <li>
            <a
              href={mailHref}
              className="flex items-center gap-2 transition-colors duration-200 hover:text-white"
            >
              <EnvelopeSimple size={14} aria-hidden="true" className="shrink-0" />
              <span className="hidden sm:inline">{site.contacto.email}</span>
              <span className="sr-only sm:hidden">{site.contacto.email}</span>
            </a>
          </li>
          <li>
            <a
              href={telHref}
              className="num flex items-center gap-2 transition-colors duration-200 hover:text-white"
            >
              <Phone size={14} aria-hidden="true" className="shrink-0" />
              <span>{site.contacto.telefono}</span>
            </a>
          </li>
        </ul>
      </Contenedor>
    </div>
  );
}
