import { DronNarrativo } from "@/components/brand/DronNarrativo";
import { Casos } from "./Casos";
import { Clientes } from "./Clientes";
import { Director } from "./Director";
import { Faena } from "./Faena";
import { IndiceCapitulos } from "./IndiceCapitulos";
import { Nosotros } from "./Nosotros";
import { Portada } from "./Portada";
import { Servicios } from "./Servicios";
import { Software } from "./Software";

/**
 * EL INICIO, CONTADO COMO RECORRIDO
 * ---------------------------------
 * Mismo contenido y mismo orden de secciones que la portada de hoy —qué hacen,
 * a quién, qué operaciones, cómo se ve en terreno, quiénes son, la prueba, qué
 * queda después del vuelo— con la puesta en escena del brochure.
 *
 * QUÉ CAMBIA, EXACTAMENTE
 * -----------------------
 *   · Servicios, faena y casos se FIJAN: el scroll deja de avanzar y pasa a ser
 *     la línea de tiempo del capítulo. Eso es lo que separa un recorrido de una
 *     página larga con animaciones encima.
 *   · Cada capítulo reserva aire para el dron en vez de obligarlo a esquivar el
 *     texto encogiéndose en la canaleta.
 *   · Los titulares entran línea por línea desde una máscara.
 *
 * QUÉ NO CAMBIA
 * -------------
 * La paleta. El inicio ya alterna blanco, steel-950 y steel-50 en este mismo
 * orden: acá se conserva tal cual, así que la página sigue siendo continua con
 * el resto del sitio.
 *
 * CÓMO ESTÁ ARMADA
 * ----------------
 *   · Cada capítulo es un componente con su HTML completo y estático.
 *   · `Director` carga `animaciones.ts` (GSAP) y marca la raíz con
 *     `data-movimiento`; recién ahí el CSS activa los marcos fijados.
 *   · `DronNarrativo` monta UN canvas para toda la página y lo mueve según
 *     `data-dron-escena`, con el guion de `guionVistaPrevia.ts`.
 */
export function InicioGsap() {
  return (
    <div data-inicio-gsap>
      <DronNarrativo guion="inicio" anchoMinimo={1024} />
      <IndiceCapitulos />
      <Director />

      <Portada />
      <Clientes />
      <Servicios />
      <Faena />
      <Nosotros />
      <Casos />
      <Software />
    </div>
  );
}
