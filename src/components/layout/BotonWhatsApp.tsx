"use client";

import { useEffect, useRef, useState } from "react";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { whatsappHref } from "@/content/site";

/**
 * F-13 · Botón flotante de WhatsApp, en todas las páginas.
 *
 * El número y el mensaje precargado salen de `content/site.ts`, no están
 * escritos acá. Si AGS cambia de número, se cambia en un solo archivo.
 *
 * NO TAPAR EL BOTÓN DE ENVIAR (requisito explícito del brief)
 * -----------------------------------------------------------
 * En móvil el botón "Enviar solicitud" ocupa todo el ancho, así que al llegar
 * al pie del formulario el flotante le cae encima. En vez de esconder el
 * canal de contacto, el botón SE APARTA: cualquier elemento marcado con
 * `data-fab-libre` que entre en la franja inferior de la pantalla lo hace
 * subir 5rem, por encima del control. Al salir, vuelve a su posición.
 *
 * Se resuelve con IntersectionObserver y un `rootMargin` negativo que recorta
 * la raíz a la banda inferior, no con un listener de scroll: no hay trabajo
 * por cuadro y el desplazamiento no se pone pesado.
 */
export function BotonWhatsApp() {
  const [apartado, setApartado] = useState(false);
  const observador = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const objetivos = document.querySelectorAll("[data-fab-libre]");
    if (objetivos.length === 0) return;

    observador.current = new IntersectionObserver(
      (entradas) => setApartado(entradas.some((e) => e.isIntersecting)),
      // Solo la banda inferior de 160px cuenta como colisión: es donde el
      // flotante vive realmente.
      { root: null, rootMargin: "0px 0px 0px 0px", threshold: 0 },
    );

    objetivos.forEach((o) => observador.current?.observe(o));
    return () => observador.current?.disconnect();
  }, []);

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir a AGS Soluciones por WhatsApp para cotizar un servicio con drones"
      className={`fixed right-5 bottom-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-[#04361A] shadow-e3 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-105 active:scale-95 ${
        apartado ? "-translate-y-20 sm:translate-y-0" : ""
      }`}
    >
      <WhatsappLogo size={30} weight="fill" aria-hidden="true" />
    </a>
  );
}
