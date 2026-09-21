/**
 * Plataformas que muestra el carrusel de la vista previa.
 *
 * POR QUÉ NO SALE DE `@/content/software`
 * --------------------------------------
 * Ese arreglo alimenta el navbar, el footer, el sitemap y las rutas
 * `/software/<slug>`. Agregar ahí una plataforma nueva cambiaría el SITIO REAL
 * y publicaría un enlace a una página que todavía no existe. Como esto es una
 * vista previa, la tercera tarjeta vive acá y no toca nada de lo publicado.
 *
 * SMARTLIX
 * --------
 * La descripción NO está inventada: sale de `DEV-AGS/smartlix/smartlix-landing-page/
 * PRODUCT.md`, que es la especificación del propio producto. De ahí también sale
 * su enganche con el control de riego en pilas de lixiviación, que este sitio
 * atribuía por error a SmartLayout.
 *
 * Sigue viviendo acá y no en `content/software.ts` porque SmartLix todavía no
 * tiene ficha `/software/smartlix`: en el sitio real solo aparece como enlace
 * externo en el footer.
 *
 * Es preferible un pendiente declarado a un texto de relleno: un párrafo
 * inventado se lee como definitivo hasta que alguien lo compara con el producto
 * real, y para entonces ya está publicado.
 */

import { productos, type Producto } from "@/content/software";

export interface Plataforma extends Omit<Producto, "sitio"> {
  /** `null` mientras la plataforma no tenga página ni sitio publicado. */
  sitio: string | null;
  /** Ruta interna de la ficha. `null` si todavía no existe. */
  ficha: string | null;
  /** Texto pendiente de entrega: la tarjeta lo marca como tal. */
  pendiente?: boolean;
}

export const plataformas: Plataforma[] = [
  ...productos.map((p) => ({ ...p, ficha: `/software/${p.slug}` })),
  {
    slug: "smartlix",
    nombre: "SmartLix",
    resuelve:
      "Convierte cada vuelo sobre la pila de lixiviación en un estado de riego medible por módulo.",
    descripcion:
      "SmartLix toma el par de ortofotos de cada vuelo —RGB y térmica de la misma fecha— y las alinea sobre la grilla real de módulos de la pila. Cada celda queda clasificada por bandas de temperatura configurables, de modo que la operación lee el estado del riego sobre la pila completa y compara un vuelo con otro bajo la misma escala térmica.",
    servicios: ["control-riego-pilas-lixiviacion"],
    sitio: "https://www.smartlix.cl",
    ficha: null,
    captura: "/images/imagen-smartlix.png",
    capturaAlt:
      "Interfaz de SmartLix: monitoreo térmico de una pila de lixiviación, con la grilla de módulos coloreada por temperatura y la escala en grados",
  },
];
