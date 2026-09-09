import type { Metadata } from "next";
import Image from "next/image";
import { ImageSquare } from "@phosphor-icons/react/dist/ssr";
import { CabeceraPagina } from "@/components/ui/CabeceraPagina";
import { Contenedor } from "@/components/ui/Contenedor";
import { Revelar } from "@/components/ui/Revelar";
import { ContactoBloque } from "@/components/home/ContactoBloque";
import { iniciativas } from "@/content/comunidad";
import { metadatosDe } from "@/lib/seo";

export const metadata: Metadata = metadatosDe({
  titulo: "Comunidad: nuestro vínculo con Antofagasta",
  descripcion:
    "Charlas técnicas en el colegio AIS y patrocinio del club de rugby Coyotes Antofagasta. El vínculo de AGS Soluciones con la comunidad donde opera.",
  ruta: "/comunidad",
});

/**
 * F-08 · Comunidad.
 *
 * Bloque repetible: para sumar una iniciativa basta agregar un objeto a
 * `content/comunidad.ts`. La composición alterna el lado de la imagen, así que
 * dos iniciativas no se leen como dos filas idénticas.
 *
 * Una iniciativa SIN fotografías se renderiza igual, con una reserva declarada.
 * Es el caso del colegio AIS: sus imágenes involucran a menores y no se
 * publican sin autorización escrita.
 */
export default function PaginaComunidad() {
  return (
    <>
      <CabeceraPagina
        titulo="Antofagasta es donde operamos y donde vivimos"
        bajada="La empresa nació acá. Parte de lo que hacemos vuelve a la ciudad, en el aula y en la cancha."
        migas={[{ label: "Comunidad" }]}
      />

      <section className="bg-white py-16 sm:py-20">
        <Contenedor>
          <ul className="space-y-16 sm:space-y-24">
            {iniciativas.map((ini, i) => {
              const imagenALaDerecha = i % 2 === 0;

              return (
                <Revelar
                  as="li"
                  key={ini.slug}
                  className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
                >
                  <div className={imagenALaDerecha ? "lg:order-2" : ""}>
                    {ini.imagenes.length > 0 ? (
                      <div className="chamfer relative aspect-[4/3] overflow-hidden bg-steel-100">
                        <Image
                          src={ini.imagenes[0].src}
                          alt={ini.imagenes[0].alt}
                          fill
                          sizes="(min-width: 1024px) 50vw, 100vw"
                          loading="lazy"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="chamfer flex aspect-[4/3] flex-col items-center justify-center gap-3 border border-dashed border-steel-300 bg-steel-50 px-8 text-center">
                        <ImageSquare
                          size={24}
                          weight="light"
                          aria-hidden="true"
                          className="text-steel-400"
                        />
                        <p className="measure text-[0.8125rem] leading-relaxed text-steel-500">
                          {ini.pendiente}
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="eyebrow text-orange-ink">{ini.bajada}</p>
                    <h2 className="mt-3 text-d4 text-steel-900 sm:text-d3">{ini.titulo}</h2>
                    <p className="measure mt-5 text-[1.0625rem] leading-relaxed text-steel-700">
                      {ini.descripcion}
                    </p>
                  </div>
                </Revelar>
              );
            })}
          </ul>
        </Contenedor>
      </section>

      <ContactoBloque />
    </>
  );
}
