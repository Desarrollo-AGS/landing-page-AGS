import { NextResponse, type NextRequest } from "next/server";
import { IDIOMAS, IDIOMA_POR_DEFECTO } from "@/lib/idioma";

/**
 * Enrutado de idioma.
 *
 * Las páginas viven bajo `app/[lang]/`, pero el español se publica SIN prefijo
 * para no cambiar URLs que ya están indexadas. Este middleware cose las dos
 * cosas:
 *
 *   · `/casos`     → reescribe a `/es/casos`. La URL del navegador no cambia.
 *   · `/en/casos`  → pasa tal cual: ya calza con el segmento.
 *   · `/es/casos`  → REDIRIGE (308) a `/casos`. Sin esto, la misma página
 *                    quedaría accesible en dos URLs distintas y Google lo
 *                    trataría como contenido duplicado.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const prefijo = IDIOMAS.find((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));

  if (prefijo === IDIOMA_POR_DEFECTO) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(IDIOMA_POR_DEFECTO.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (prefijo) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/${IDIOMA_POR_DEFECTO}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Todo menos la API, los internos de Next y los archivos con extensión
  // (imágenes, videos, robots.txt, sitemap.xml, el modelo del dron...).
  matcher: ["/((?!api|_next|.*\\.).*)"],
};
