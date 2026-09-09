import Image from "next/image";
import { ImageSquare } from "@phosphor-icons/react/dist/ssr";

/**
 * Marco de captura de producto (F-07).
 *
 * Mientras AGS no entregue las capturas de SmartField y SmartLayout (brief,
 * sección 8, punto 7), acá va una reserva EXPLÍCITA con la proporción final ya
 * definida: cuando llegue la imagen real, entra en el mismo hueco y no se mueve
 * nada del layout.
 *
 * Deliberadamente NO se dibuja una interfaz falsa con divs. Una maqueta de
 * producto inventada se ve como una captura real hasta que alguien la compara
 * con el sistema de verdad, y entonces el sitio queda mostrando algo que no
 * existe. Es preferible el hueco declarado.
 */
export function MarcoCaptura({
  src,
  alt,
  nombre,
}: {
  src: string | null;
  alt: string;
  nombre: string;
}) {
  if (src) {
    return (
      <div className="chamfer-sm relative aspect-[16/10] overflow-hidden bg-steel-100">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          loading="lazy"
          className="object-cover object-top"
        />
      </div>
    );
  }

  return (
    <div className="chamfer-sm flex aspect-[16/10] flex-col items-center justify-center gap-3 border border-dashed border-steel-200 bg-steel-50 px-6 text-center">
      <ImageSquare size={22} weight="light" aria-hidden="true" className="text-steel-400" />
      <p className="text-[0.8125rem] leading-snug text-steel-500">
        Captura de {nombre} pendiente de entrega por AGS
      </p>
    </div>
  );
}
