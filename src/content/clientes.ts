/**
 * Los ocho logos de clientes que pide el brief (F-10a). Archivos reales, no
 * marcas de texto dibujadas a mano.
 *
 * TRES DE LOS OCHO VENÍAN SOLO EN VERSIÓN BLANCA
 * ----------------------------------------------
 * Acciona, Ingeteam y Puerto Angamos estaban entregados únicamente en su
 * versión negativa (silueta blanca), pensada para fondos oscuros: sobre la
 * franja blanca del sitio eran literalmente invisibles. Se generó la versión
 * positiva invirtiendo la tinta y conservando el canal alfa, así que la
 * silueta de cada marca es exactamente la misma, solo cambia el color.
 *
 * Conviene pedirle a AGS los archivos oficiales a color de esas tres marcas:
 * hoy pasan a opacidad plena en el hover, pero no "pasan a color" como sí lo
 * hacen las otras cinco, porque no existe un archivo a color de origen.
 *
 * SQM queda fuera a propósito: su marca es un círculo con el texto calado, y
 * al normalizarla a monocromo se convierte en un disco sólido. Volvería a
 * entrar con una versión wordmark.
 *
 * `alto` es la altura óptica en píxeles dentro de la franja. No es la misma
 * para todos: un logotipo apaisado y uno cuadrado puestos a la misma altura se
 * ven desbalanceados, porque el cuadrado ocupa mucha más área.
 */

export interface Cliente {
  nombre: string;
  archivo: string;
  /** Dimensiones intrínsecas reales del archivo, para que no se deforme. */
  w: number;
  h: number;
  /** Altura de render en la franja, ajustada ópticamente marca por marca. */
  alto: number;
}

export const clientes: Cliente[] = [
  { nombre: "Enel", archivo: "/logos/enel.svg", w: 116, h: 42, alto: 30 },
  { nombre: "Acciona", archivo: "/logos/acciona-positivo.png", w: 190, h: 84, alto: 26 },
  { nombre: "BHP", archivo: "/logos/bhp.png", w: 300, h: 136, alto: 30 },
  { nombre: "Colbún", archivo: "/logos/colbun.png", w: 300, h: 120, alto: 26 },
  { nombre: "Ingeteam", archivo: "/logos/ingeteam-positivo.png", w: 198, h: 72, alto: 24 },
  {
    nombre: "Puerto Angamos",
    archivo: "/logos/puerto-angamos-positivo.png",
    w: 200,
    h: 100,
    alto: 40,
  },
  { nombre: "Molynor", archivo: "/logos/molynor.svg", w: 132, h: 31, alto: 24 },
  { nombre: "CBB", archivo: "/logos/cbb.png", w: 300, h: 137, alto: 34 },
];
