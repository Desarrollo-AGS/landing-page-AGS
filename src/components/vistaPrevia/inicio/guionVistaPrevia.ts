/**
 * Guion del dron en la vista previa del inicio.
 *
 * Reutiliza el motor de `brand/dron/coreografiaNarrativa.ts` tal cual: el que
 * persigue el destino con muelle, no el que se pega a la rueda del mouse. Lo
 * único propio de este archivo es A DÓNDE va el dron en cada capítulo.
 *
 * EL DRON ACOMPAÑA
 * ----------------
 * Esta es la regla que manda sobre todo lo demás, y la que más fácil se pierde:
 * al darle tareas por capítulo es tentador sacarlo de escena cuando el
 * escenario es de otro, y el resultado es una página donde el dron no está.
 * Acá va contigo desde la portada hasta que el vuelo termina; los capítulos le
 * dan COSAS QUE HACER por el camino, no lo reemplazan.
 *
 * Se aparta en dos momentos, los dos con motivo:
 *   · Faena, donde el registro real de la operación manda solo: el dron se mete
 *     en la toma (baja fuera de cuadro) en vez de volar encima.
 *   · Al final de proyectos, donde el recorrido TERMINA: el dron sigue la misma
 *     trayectoria horizontal de la pista y se va por la izquierda. De ahí hacia
 *     abajo no vuelve a aparecer. Noticias y contacto son la cola de la página
 *     y se leen solos.
 *
 *   00 Portada     Mantiene posición a la derecha del titular, en el vacío que
 *                  el layout le reserva. Al salir desciende hacia la izquierda,
 *                  a la vista: no se va, va bajando contigo.
 *   01 Clientes    Cruza la franja de logos descendiendo, visible, rumbo a la
 *                  fotografía de servicios.
 *   02 Servicios   El levantamiento. Siete pasadas sobre la foto, UNA POR
 *                  SERVICIO, sincronizadas con el relevo de la columna derecha
 *                  (ver `acciones.ts`).
 *   03 Software    Sube por el margen derecho y cruza el aire libre de arriba.
 *                  NO sobrevuela el carrusel ni escanea las capturas: las
 *                  tarjetas se mueven solas en 3D y un dron encima compite con
 *                  ellas. Acá solo acompaña, por el costado.
 *   04 Faena       Se mete en la toma. Única ausencia del recorrido.
 *   05 Nosotros    Vuelve desde arriba y baja por el margen, quedando ya en
 *                  posición sobre las cifras del capítulo siguiente.
 *   06 Proyectos   Mide las tres cifras mientras cuentan y después SE ELEVA Y
 *                  VIAJA CON LA PISTA: deriva hacia la izquierda al mismo
 *                  tiempo que las fichas, alto y pequeño. Cuando termina de
 *                  pasar el último proyecto sigue esa misma trayectoria y SALE
 *                  DE PANTALLA. Ahí acaba el recorrido.
 *
 * CONTINUIDAD
 * -----------
 * Cada capítulo empieza donde terminó el anterior. El muelle taparía un salto,
 * pero se notaría como un tirón.
 *
 * Los progresos de los capítulos fijados salen de sus propias líneas de tiempo
 * (`dron-<escena>`, creadas en `animaciones.ts`). Ojo con proyectos: su
 * disparador NO se llama `dron-casos` a propósito, así que el dron mide contra
 * la sección completa y el escaneo coincide con las cifras (ver
 * `animaciones.ts`).
 *
 * Solo escritorio: bajo 1024px no se monta (ver README, sección 7).
 */

import type { Guion, Vista } from "@/components/brand/dron/coreografiaNarrativa";
import { accionesVistaPrevia } from "./acciones";

/** Canaleta derecha, por fuera del contenedor de 1320px. */
const costadoDerecho = (v: Vista) => v.w - 104;

export const guionVistaPrevia: Guion = {
  escritorio: {
    // 00 · En espera a la derecha del titular y descenso a la vista. El
    // progreso arranca en 0,5 porque la portada ya está a media pantalla al
    // cargar.
    portada: [
      { p: 0.5, x: 0.74, y: 0.5, s: 0.95 },
      { p: 0.82, x: 0.72, y: 0.64, s: 0.8 },
      { p: 1, x: 0.58, y: 0.88, s: 0.6 },
    ],

    // 01 · Cruza la franja descendiendo, y TERMINA ABAJO, rozando el borde
    // inferior.
    //
    // Antes terminaba en (0,24 · 0,5) y ahí estaba el problema: el dron se
    // quedaba quieto en ese punto de la ventana mientras el capítulo de
    // servicios subía, así que el titular "Siete operaciones, un mismo
    // criterio: nadie sube" le pasaba por debajo y quedaba tapado justo
    // mientras se leía.
    //
    // No hay forma de arreglarlo moviéndolo de lado: el titular ocupa del 6%
    // al 43% del ancho y la fotografía está en esa misma columna, debajo. Por
    // eso el dron baja por fuera, hasta el borde inferior, y entra a la foto
    // DESDE ABAJO (ver la entrada en `acciones.ts`). El único texto que podría
    // cruzarse en esa subida es la propia foto, que es a donde va.
    clientes: [
      { p: 0, x: 0.58, y: 0.88, s: 0.6 },
      // Baja EN VERTICAL, sin correrse a la izquierda: a media bajada, con
      // x = 0,44, el párrafo del capítulo siguiente le pasaba por encima.
      // Manteniéndose en 0,58 el descenso cae en la columna derecha, que a
      // esta altura está vacía.
      { p: 0.5, x: 0.58, y: 0.99, s: 0.46 },
      // El cruce a la izquierda se hace RECIÉN ABAJO del borde, donde no hay
      // nada que tapar.
      { p: 1, x: 0.36, y: 1.08, s: 0.4 },
    ],

    // 02 · Levantamiento. Respaldo si la foto no está: la acción manda.
    servicios: [
      { p: 0, x: 0.36, y: 1.08, s: 0.4, sensor: 0 },
      { p: 0.08, x: 0.25, y: 0.45, s: 0.36, sensor: 1 },
      { p: 0.92, x: 0.25, y: 0.5, s: 0.36, sensor: 1 },
      { p: 1, x: 0.3, y: 1.16, s: 0.34, sensor: 0 },
    ],

    // 03 · Acompaña por el costado. El carrusel 3D ya tiene movimiento propio:
    // un dron sobrevolando las tarjetas compite con ellas y además tapa las
    // capturas, que es lo único que hay que mirar acá.
    //
    // Arranca donde lo deja servicios, fuera de cuadro por abajo. Se corre a la
    // derecha MIENTRAS SIGUE FUERA —ese tramo no se ve, así que no cuesta
    // nada— y recién entonces sube por el margen hasta el aire libre de arriba,
    // a la derecha del párrafo. Queda ahí, pequeño, hasta el capítulo
    // siguiente.
    // ALTURA: la franja de arriba es el único corredor libre en todo el
    // capítulo. El carrusel está centrado y sus tarjetas laterales llegan hasta
    // el 82% del ancho, con las flechas en el 8% y el 92%: por los costados no
    // cabe. Por eso sube rápido y cruza alto, por encima de las tarjetas, en
    // vez de quedarse a media altura rozándolas.
    software: [
      { p: 0, x: 0.3, y: 1.16, s: 0.34, o: 1, sensor: 0 },
      { p: 0.12, x: 0.62, y: 1.1, s: 0.32, o: 1, sensor: 0 },
      { p: 0.3, x: 0.82, y: 0.44, s: 0.29, o: 1, sensor: 0 },
      { p: 0.5, x: 0.84, y: 0.15, s: 0.27, o: 1, sensor: 0 },
      { p: 0.82, x: 0.78, y: 0.11, s: 0.26, o: 1, sensor: 0 },
      { p: 1, x: 0.74, y: 0.2, s: 0.27, o: 1, sensor: 0 },
    ],

    // 04 · Se mete en la toma. Baja y se apaga con el propio progreso, en vez
    // de cortarse de golpe. Ahora entra EN CUADRO desde arriba y desciende a
    // la banda de video: antes empezaba ya fuera de pantalla porque venía del
    // picado de servicios, y el gesto no se veía.
    faena: [
      { p: 0, x: 0.74, y: 0.2, s: 0.27, o: 1 },
      { p: 0.2, x: 0.72, y: 1.3, s: 0.26, o: 0 },
      { p: 1, x: 0.72, y: 1.3, s: 0.26, o: 0 },
    ],

    // 05 · Regreso desde arriba. Termina ya en posición sobre las cifras: si
    // bajaba hasta media pantalla, llegaba tarde al único momento en que las
    // cifras están a la vista.
    nosotros: [
      { p: 0, x: costadoDerecho, y: -0.22, s: 0.26, o: 0 },
      { p: 0.25, x: costadoDerecho, y: 0.2, s: 0.3, o: 1 },
      { p: 1, x: 0.82, y: 0.34, s: 0.32, o: 1 },
    ],

    // 06 · Mide las cifras, viaja CON la pista y se va. Último capítulo con
    // dron.
    //
    // Los progresos del escaneo son chicos a propósito: esta sección es muy
    // alta (incluye el espaciador de la pista fijada) y las cifras solo están
    // a la vista durante su primer tramo. Después el dron sube a la franja
    // vacía de arriba y deriva hacia la izquierda, en el mismo sentido en que
    // se mueven las fichas: va con ellas, no en contra.
    //
    // La salida prolonga esa misma trayectoria en vez de inventar un gesto de
    // despedida: cuando termina de pasar el último proyecto, el dron sigue
    // derecho y abandona el cuadro por la izquierda. Se apaga RECIÉN cuando ya
    // está fuera (en 0,97 su centro está en −230px, con el modelo entero fuera
    // de pantalla), para que se lea como que se fue y no como que se disolvió.
    // ESCALA: este capítulo lo lleva el dron más grande que el resto del
    // recorrido (0,40-0,46) pero por debajo del tamaño de entrada de la portada
    // (0,95-0,6). La primera pose conserva el 0,32 con el que llega de nosotros
    // y crece en el primer tramo: subirla de golpe en el empalme se ve como un
    // salto de escala, porque el motor suaviza el tamaño pero no lo teletransporta.
    //
    // Al ser más grande baja un poco su altura de crucero (0,17-0,20 en vez de
    // 0,14), para no acercarse al navbar.
    casos: [
      { p: 0, x: 0.8, y: 0.32, s: 0.32, o: 1, sensor: 1 },
      { p: 0.08, x: 0.81, y: 0.31, s: 0.46, o: 1, sensor: 1 },
      { p: 0.22, x: 0.86, y: 0.19, s: 0.42, o: 1, sensor: 0 },
      { p: 0.6, x: 0.5, y: 0.17, s: 0.4, o: 1, sensor: 0 },
      { p: 0.88, x: 0.12, y: 0.19, s: 0.4, o: 1, sensor: 0 },
      { p: 0.97, x: -0.18, y: 0.2, s: 0.4, o: 1, sensor: 0 },
      { p: 1, x: -0.26, y: 0.21, s: 0.4, o: 0, sensor: 0 },
    ],

    // No hay nada después de proyectos: el recorrido del dron termina ahí.
    // Noticias y contacto no llevan `data-dron-escena`, así que la escena
    // activa sigue siendo la de proyectos, congelada en su última pose: fuera
    // de cuadro y apagada.
  },

  acciones: accionesVistaPrevia,
};
