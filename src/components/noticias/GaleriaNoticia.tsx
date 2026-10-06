import Image from "next/image";
import type { FotoNoticia } from "@/content/noticias";

/**
 * Mosaico de fotos de una noticia.
 *
 * El encuadre es el de una publicación de redes y no el de un artículo: una
 * foto manda y las demás la acompañan, en vez de una galería de miniaturas
 * iguales. Con una sola foto se cae al comportamiento de siempre, a lo ancho.
 *
 *   1 foto    una banda 16:9
 *   2 fotos   dos mitades verticales
 *   3+ fotos  una grande a la izquierda y el resto apilado a la derecha
 *
 * El `priority` va SOLO en la primera: es la que entra en pantalla con el
 * artículo y la candidata a LCP. Pedir prioridad para las tres haría que
 * compitieran entre ellas y ninguna llegaría antes.
 */
export function GaleriaNoticia({ fotos }: { fotos: FotoNoticia[] }) {
  if (fotos.length === 0) return null;

  if (fotos.length === 1) {
    return (
      <Foto foto={fotos[0]} prioridad className="chamfer aspect-[16/9] w-full" sizes="100vw" />
    );
  }

  if (fotos.length === 2) {
    return (
      <div className="grid gap-2 sm:grid-cols-2">
        {fotos.map((f, i) => (
          <Foto
            key={f.src}
            foto={f}
            prioridad={i === 0}
            className="chamfer aspect-[16/9] w-full"
            sizes="(min-width: 640px) 50vw, 100vw"
          />
        ))}
      </div>
    );
  }

  const [principal, ...resto] = fotos;
  return (
    // En móvil se apilan todas, cada una en 16:9, que es la proporción con la
    // que vienen las fotos de evento: en una sola columna no hay motivo para
    // recortarlas. El mosaico de dos columnas aparece recién en sm.
    <div className="grid gap-2 sm:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
      <Foto
        foto={principal}
        prioridad
        // En el mosaico la principal se estira al alto de las dos de al lado:
        // queda más cuadrada que su original, que es justamente lo que la
        // distingue como foto que manda.
        className="chamfer aspect-[16/9] w-full sm:aspect-auto sm:h-full"
        sizes="(min-width: 640px) 60vw, 100vw"
      />
      <div className="grid gap-2">
        {resto.slice(0, 3).map((f) => (
          <Foto
            key={f.src}
            foto={f}
            className="chamfer aspect-[16/9] w-full"
            sizes="(min-width: 640px) 40vw, 100vw"
          />
        ))}
      </div>
    </div>
  );
}

function Foto({
  foto,
  prioridad = false,
  className,
  sizes,
}: {
  foto: FotoNoticia;
  prioridad?: boolean;
  className: string;
  sizes: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-steel-100 ${className}`}>
      <Image
        src={foto.src}
        alt={foto.alt}
        fill
        sizes={sizes}
        priority={prioridad}
        loading={prioridad ? undefined : "lazy"}
        className="object-cover"
      />
    </div>
  );
}
