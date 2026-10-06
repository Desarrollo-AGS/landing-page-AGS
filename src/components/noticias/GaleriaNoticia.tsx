import Image from "next/image";
import type { FotoNoticia } from "@/content/noticias";

/**
 * Fotos que acompañan una noticia.
 *
 * EL MOSAICO SE ELIGE SEGÚN LAS FOTOS
 * -----------------------------------
 * TRES APAISADAS → mosaico clásico: una grande a la izquierda y dos apiladas a
 * la derecha. Todas comparten la misma forma, así que recortarlas al marco no
 * les quita nada y la jerarquía queda clarísima.
 *
 * CUALQUIER OTRA COMBINACIÓN → filas justificadas. Dentro de una fila todas las
 * fotos tienen el MISMO ALTO y cada una el ancho que le pide su proporción: una
 * vertical sale angosta y alta, una apaisada ancha y baja, y la fila llena el
 * renglón completo. Nadie se recorta.
 *
 * Esto último es lo que importa cuando hay verticales mezcladas. Metida en un
 * hueco apaisado, una foto vertical de una persona muestra una franja a la
 * altura del pecho: se pierde la cara y se pierde lo que lleva puesto, que en
 * una foto de patrocinio es justamente el asunto.
 *
 * Las proporciones salen del archivo, medidas en build (ver `medir` en
 * `content/noticias.ts`): no hay que declarar nada a mano.
 */

const esApaisada = (f: FotoNoticia) => f.ancho / f.alto > 1.2;

/**
 * Reparte las fotos en filas. La primera fila lleva una foto menos que las
 * siguientes, para que la principal entre más grande: es la que carga el peso
 * de la noticia, no una más del montón.
 */
function enFilas(fotos: FotoNoticia[]): FotoNoticia[][] {
  if (fotos.length <= 3) return [fotos];
  if (fotos.length === 4) return [fotos.slice(0, 2), fotos.slice(2)];
  if (fotos.length === 5) return [fotos.slice(0, 2), fotos.slice(2)];

  const filas: FotoNoticia[][] = [fotos.slice(0, 2)];
  for (let i = 2; i < fotos.length; i += 3) filas.push(fotos.slice(i, i + 3));
  return filas;
}

export function GaleriaNoticia({ fotos }: { fotos: FotoNoticia[] }) {
  if (fotos.length === 0) return null;

  if (fotos.length === 1) {
    const sola = fotos[0];
    return sola.encaje === "contener" ? (
      <Foto
        foto={sola}
        prioridad
        className="chamfer mx-auto aspect-[4/3] w-full max-w-[34rem]"
        sizes="(min-width: 640px) 34rem, 100vw"
      />
    ) : (
      <Foto foto={sola} prioridad className="chamfer aspect-[16/9] w-full" sizes="100vw" />
    );
  }

  // El mosaico clásico solo cuando las tres comparten forma apaisada.
  if (fotos.length === 3 && fotos.every(esApaisada)) {
    const [principal, ...alLado] = fotos;
    return (
      <div className="grid gap-2 sm:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <Foto
          foto={principal}
          prioridad
          className="chamfer aspect-[16/9] w-full sm:aspect-auto sm:h-full"
          sizes="(min-width: 640px) 60vw, 100vw"
        />
        <div className="grid gap-2">
          {alLado.map((f) => (
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

  return (
    <div className="flex flex-col gap-2">
      {enFilas(fotos).map((fila, iFila) => {
        // El ancho de cada foto en la fila, en porcentaje, para pedirle a Next
        // el tamaño correcto. Los huecos entre fotos se descuentan aparte en el
        // `calc` del navegador, así que acá basta la proporción.
        const suma = fila.reduce((t, f) => t + f.ancho / f.alto, 0);

        return (
          // En móvil se apilan: una fila de tres en 390px deja cada foto en
          // 120px de ancho, que no es ver una foto.
          <div key={iFila} className="flex flex-col gap-2 sm:flex-row">
            {fila.map((f, i) => {
              const relacion = f.ancho / f.alto;
              return (
                <Foto
                  key={f.src}
                  foto={f}
                  prioridad={iFila === 0 && i === 0}
                  className="chamfer w-full"
                  // `flex-grow` proporcional a la relación de aspecto: con todas
                  // las fotos de la fila declarando su propia proporción, los
                  // anchos se reparten solos y los altos salen iguales. Es el
                  // mismo cálculo de una galería justificada, hecho por el
                  // navegador en vez de a mano.
                  estilo={{
                    aspectRatio: `${f.ancho} / ${f.alto}`,
                    flex: `${relacion} 1 0%`,
                  }}
                  sizes={`(min-width: 640px) ${Math.round((relacion / suma) * 100)}vw, 100vw`}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function Foto({
  foto,
  prioridad = false,
  className,
  sizes,
  estilo,
}: {
  foto: FotoNoticia;
  prioridad?: boolean;
  className: string;
  sizes: string;
  estilo?: React.CSSProperties;
}) {
  const contener = foto.encaje === "contener";
  return (
    <div
      className={`relative overflow-hidden ${
        contener ? "bg-white p-3 sm:p-4" : "bg-steel-100"
      } ${className}`}
      style={estilo}
    >
      <Image
        src={foto.src}
        alt={foto.alt}
        fill
        sizes={sizes}
        priority={prioridad}
        loading={prioridad ? undefined : "lazy"}
        className={contener ? "object-contain" : "object-cover"}
      />
    </div>
  );
}
