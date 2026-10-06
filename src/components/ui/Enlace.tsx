"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { idiomaDeRuta, rutaDe } from "@/lib/idioma";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

/**
 * Enlace interno que conserva el idioma.
 *
 * POR QUÉ EXISTE
 * --------------
 * Con el inglés en `/en/...`, un `<Link href="/casos">` escrito tal cual
 * devuelve al español en cuanto alguien pulsa algo desde la versión inglesa.
 * Pasaba en los 21 archivos que enlazan dentro del sitio.
 *
 * En vez de llevar el idioma como prop por toda la jerarquía —la mayoría son
 * componentes de servidor y habría que hilarlo hasta el último botón— este
 * componente lo deduce de la URL actual y prefija el destino. El resto del
 * código sigue escribiendo rutas en su forma canónica, sin prefijo.
 *
 * Solo toca rutas internas: deja intactos `http(s)`, `mailto:`, `tel:` y los
 * anclas `#`.
 */
export function Enlace({ href, ...resto }: Props) {
  const pathname = usePathname() ?? "/";
  const interna = href.startsWith("/") && !href.startsWith("//");
  const destino = interna ? rutaDe(idiomaDeRuta(pathname), href) : href;

  // El casteo es inevitable: con rutas tipadas, Next espera literales de ruta y
  // acá el destino se arma en tiempo de ejecución a partir del idioma.
  return <Link href={destino as ComponentProps<typeof Link>["href"]} {...resto} />;
}
