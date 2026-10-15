/**
 * PERMISOS, NORMAS Y CERTIFICACIONES — F-05.
 *
 * ================== LEER ANTES DE AGREGAR NADA ACÁ ==================
 * Publicar una certificación vencida, o una que no se posee, es un riesgo
 * comercial y legal real en procesos de licitación minera y energética.
 *
 * Este arreglo se llena SOLO con la lista validada por AGS, con número y
 * vigencia reales. No se completa con información de referencia sacada de
 * internet, ni con lo que "suele tener" una empresa del rubro.
 *
 * Mientras esté vacío, la página muestra un estado de pendiente explícito en
 * vez de una tabla inventada. Eso es intencional: es preferible que la sección
 * declare que está en preparación a que publique un dato que no se sostiene.
 * ====================================================================
 */

export interface Certificacion {
  nombre: string;
  entidad: string;
  /** Número de resolución, registro o certificado. */
  numero?: string;
  /** Formato ISO (YYYY-MM-DD) para poder ordenar y detectar vencimientos. */
  vigenteHasta?: string;
  /** Logo de la entidad certificadora, si AGS lo entrega. */
  logo?: string;
  nota?: string;
}

export const certificaciones: Certificacion[] = [];

/**
 * El AOC de AGS, confirmado por la empresa y verificable por cualquiera en el
 * registro público de la DGAC. Es el permiso que habilita a operar drones de
 * forma remunerada en Chile, así que es lo PRIMERO que mira quien evalúa un
 * proveedor: por eso encabeza la página y no va dentro de una tabla.
 *
 * `fuente` no es decorativa. Una empresa diciendo de sí misma que está
 * certificada vale poco; el enlace al registro del regulador deja que el
 * lector lo compruebe sin pedirnos nada.
 */
export const aoc = {
  insignia: "/images/AOC-PRODRONE.webp",
  logoEntidad: "/images/logo-dgac-chile.webp",
  foto: "/images/ags-dron-permisos.webp",
  fuente: "https://www.dgac.gob.cl/drones/empresas-rpa-aoc",
};

/**
 * Contexto regulatorio. Esto NO es una declaración de lo que AGS posee: es el
 * marco bajo el que opera cualquier empresa de drones en Chile, y va en la
 * página como contexto para quien evalúa un proveedor.
 *
 * La DAN 151 de la DGAC pasó a Edición 4 en marzo de 2026, con un modelo
 * basado en gestión de riesgo y vigencias de autorización más cortas. Toda
 * referencia normativa del sitio debe apuntar a la edición vigente.
 */
export const marcoRegulatorio = {
  norma: "DAN 151",
  edicion: "Edición 4",
  vigenteDesde: "marzo de 2026",
  entidad: "Dirección General de Aeronáutica Civil (DGAC)",
  descripcion:
    "Norma chilena que regula la operación de aeronaves pilotadas a distancia. Su Edición 4 sustituye el esquema anterior por un modelo basado en gestión de riesgo, con vigencias de autorización más cortas y requisitos por categoría de operación.",
};
