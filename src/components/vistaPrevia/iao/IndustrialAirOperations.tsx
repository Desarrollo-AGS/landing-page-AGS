import { DronIao } from "./DronIao";
import { capitulos } from "@/content/brochureIao";
import { Capacidades } from "./Capacidades";
import { CasosReales } from "./CasosReales";
import { Cierre } from "./Cierre";
import { Desafio } from "./Desafio";
import { Director } from "./Director";
import { IndiceCapitulos } from "./IndiceCapitulos";
import { Operacion } from "./Operacion";
import { Plataformas } from "./Plataformas";
import { Portada } from "./Portada";
import { Resultados } from "./Resultados";
import { VueloAlDato } from "./VueloAlDato";

/**
 * AGS — INDUSTRIAL AIR OPERATIONS
 * -------------------------------
 * La presentación comercial de AGS contada como un recorrido: problema,
 * operación, capacidades, del vuelo al dato, casos, resultados y contacto.
 *
 * CÓMO ESTÁ ARMADA
 * ----------------
 *   · Cada capítulo es un componente de servidor con su HTML completo.
 *   · `Director` carga `animaciones.ts` (GSAP) y marca la raíz con
 *     `data-movimiento`; recién ahí se activan los capítulos fijados.
 *   · `DronNarrativo` monta UN canvas para toda la experiencia y lo mueve
 *     según `data-dron-escena` (ver ./coreografiaIao.ts).
 *
 * Para quitar o reordenar un capítulo se toca esta lista y `capitulos` en
 * content/brochure.ts. Si el capítulo tiene dron, su guion vive en la
 * coreografía narrativa.
 */
export function IndustrialAirOperations() {
  return (
    <div data-iao className="iao bg-steel-950 text-steel-300">
      <DronIao />
      <IndiceCapitulos capitulos={capitulos} />
      <Director />

      <Portada />
      <Desafio />
      <Operacion />
      <Capacidades />
      <VueloAlDato />
      <Plataformas />
      <CasosReales />
      <Resultados />
      <Cierre />
    </div>
  );
}
