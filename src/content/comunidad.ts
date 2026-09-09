/**
 * COMUNIDAD — F-08.
 *
 * ADVERTENCIA SOBRE IMÁGENES, del brief y no negociable: las fotografías de
 * las charlas en el colegio AIS involucran a menores de edad. Solo se publican
 * con autorización escrita del colegio y de los apoderados, o sin rostros
 * identificables. Mientras esa autorización no esté confirmada, la iniciativa
 * del colegio va SIN imágenes (`imagenes: []`) y el bloque se maqueta con el
 * patrocinio deportivo. La estructura no obliga a poner una foto.
 */

export interface Iniciativa {
  slug: string;
  titulo: string;
  bajada: string;
  descripcion: string;
  imagenes: { src: string; alt: string }[];
  /** Aviso interno que la página muestra cuando falta material o permisos. */
  pendiente?: string;
}

export const iniciativas: Iniciativa[] = [
  {
    slug: "colegio-ais",
    titulo: "Charlas en el colegio AIS",
    bajada: "Antofagasta",
    descripcion:
      "Equipo de AGS en aula, mostrando cómo se opera un dron industrial y para qué se usa en la minería y la energía de la región. El objetivo es que estudiantes de Antofagasta vean de cerca una salida técnica que existe en su propia ciudad.",
    imagenes: [],
    pendiente:
      "Sin fotografías publicadas: las tomas involucran a menores y requieren autorización escrita del colegio y de los apoderados.",
  },
  {
    slug: "coyotes-antofagasta",
    titulo: "Patrocinio Coyotes Antofagasta",
    bajada: "Rugby",
    descripcion:
      "AGS patrocina al club de rugby Coyotes Antofagasta. El deporte amateur de la región se sostiene con apoyo local, y para AGS es una forma directa de devolver algo a la ciudad donde opera.",
    imagenes: [],
    pendiente: "Fotografías del club pendientes de entrega por AGS.",
  },
];
