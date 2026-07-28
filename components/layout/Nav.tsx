"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { servicios } from "@/data/servicios";
import { sectionHref } from "@/lib/nav";

const desktopLinkClass =
  "text-sm font-medium text-brand-stone-900 transition-colors hover:text-brand-orange";

function ChevronDownIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 transition-transform duration-150 ${className}`}
      aria-hidden="true"
    >
      <path d="M5 7.5 10 12.5 15 7.5" />
    </svg>
  );
}

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <ul className="hidden items-center gap-8 md:flex">
      <li>
        <Link href="/" className={desktopLinkClass}>
          Inicio
        </Link>
      </li>
      <li className="group relative">
        <Link
          href={sectionHref(pathname, "servicios")}
          className={`${desktopLinkClass} flex items-center gap-1`}
        >
          Servicios
          <ChevronDownIcon className="group-hover:rotate-180 group-focus-within:rotate-180" />
        </Link>
        <ul className="invisible absolute left-0 top-full z-10 min-w-64 rounded-lg border border-neutral-200 bg-white py-2 opacity-0 shadow-lg transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
          {servicios.map((servicio) => (
            <li key={servicio.slug}>
              <Link
                href={`/servicios/${servicio.slug}`}
                className="block px-4 py-2 text-sm text-brand-stone-900 hover:bg-brand-sand-50 hover:text-brand-orange"
              >
                {servicio.titulo}
              </Link>
            </li>
          ))}
        </ul>
      </li>
      <li>
        <Link href="/nosotros" className={desktopLinkClass}>
          Nosotros
        </Link>
      </li>
      <li>
        <Link href={sectionHref(pathname, "casos-exito")} className={desktopLinkClass}>
          Casos de Éxito
        </Link>
      </li>
      <li>
        <Link href={sectionHref(pathname, "cotizar")} className={desktopLinkClass}>
          Contacto
        </Link>
      </li>
    </ul>
  );
}

interface MobileNavProps {
  onNavigate: () => void;
}

export function MobileNav({ onNavigate }: MobileNavProps) {
  const pathname = usePathname();
  const [serviciosOpen, setServiciosOpen] = useState(false);
  const mobileLinkClass = "block py-3 text-base font-medium text-brand-stone-900";

  return (
    <ul className="flex flex-col divide-y divide-neutral-100 px-4">
      <li>
        <Link href="/" className={mobileLinkClass} onClick={onNavigate}>
          Inicio
        </Link>
      </li>
      <li>
        <button
          type="button"
          className="flex w-full items-center justify-between py-3 text-base font-medium text-brand-stone-900"
          aria-expanded={serviciosOpen}
          onClick={() => setServiciosOpen((open) => !open)}
        >
          Servicios
          <ChevronDownIcon className={serviciosOpen ? "rotate-180" : ""} />
        </button>
        {serviciosOpen && (
          <ul className="flex flex-col gap-1 border-l border-neutral-200 pb-3 pl-4">
            {servicios.map((servicio) => (
              <li key={servicio.slug}>
                <Link
                  href={`/servicios/${servicio.slug}`}
                  className="block py-2 text-sm text-brand-stone-900"
                  onClick={onNavigate}
                >
                  {servicio.titulo}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
      <li>
        <Link href="/nosotros" className={mobileLinkClass} onClick={onNavigate}>
          Nosotros
        </Link>
      </li>
      <li>
        <Link
          href={sectionHref(pathname, "casos-exito")}
          className={mobileLinkClass}
          onClick={onNavigate}
        >
          Casos de Éxito
        </Link>
      </li>
      <li>
        <Link
          href={sectionHref(pathname, "cotizar")}
          className={mobileLinkClass}
          onClick={onNavigate}
        >
          Contacto
        </Link>
      </li>
    </ul>
  );
}
