"use client";

import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import { getAnuncioVigente } from "@/data/anuncios";

const STORAGE_PREFIX = "ags-anuncio-cerrado:";

function subscribe() {
  // No hay evento nativo de localStorage para escribir en la misma pestaña; el
  // cierre se refleja con estado local optimista (ver handleDismiss más abajo),
  // no requiere resuscribirse a cambios externos.
  return () => {};
}

function estaCerradoEnStorage(id: string) {
  return window.localStorage.getItem(`${STORAGE_PREFIX}${id}`) === "1";
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M5 5l10 10M15 5L5 15" />
    </svg>
  );
}

/**
 * Oculto en el servidor y en el primer render de cliente (getServerSnapshot=true,
 * "cerrado"), para no dar un mismatch de hidratación al leer localStorage — React
 * reconcilia con el valor real vía useSyncExternalStore justo después de montar, y
 * el banner aparece si sigue vigente (data/anuncios.ts: `active` + `expiresAt`) y el
 * usuario no lo cerró antes.
 */
export default function AnuncioBanner() {
  const anuncio = getAnuncioVigente();
  const cerradoPrevio = useSyncExternalStore(
    subscribe,
    () => (anuncio ? estaCerradoEnStorage(anuncio.id) : true),
    () => true,
  );
  const [cerradoLocal, setCerradoLocal] = useState(false);

  if (!anuncio || cerradoPrevio || cerradoLocal) return null;

  function handleDismiss() {
    if (!anuncio) return;
    window.localStorage.setItem(`${STORAGE_PREFIX}${anuncio.id}`, "1");
    setCerradoLocal(true);
  }

  return (
    <div className="relative flex items-center justify-center gap-3 bg-brand-navy px-10 py-2 text-center text-sm text-white">
      <Image
        src={anuncio.imagen}
        alt={anuncio.imagenAlt}
        width={64}
        height={32}
        className="hidden h-6 w-auto shrink-0 sm:block"
      />
      <p className="truncate">
        {anuncio.mensaje}
        {" — "}
        <a href={anuncio.ctaHref} className="font-semibold text-brand-orange hover:underline">
          {anuncio.ctaLabel}
        </a>
      </p>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Cerrar anuncio"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 transition-colors hover:text-white"
      >
        <CloseIcon />
      </button>
    </div>
  );
}
