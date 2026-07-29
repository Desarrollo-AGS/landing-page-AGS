"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { sectionHref } from "@/lib/nav";
import { DesktopNav, MobileNav } from "./Nav";

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMobileOpen(false);
  }

  const cotizarHref = sectionHref(pathname, "cotizar");

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="AGS Soluciones — Inicio" className="shrink-0">
          {/* width/height fijan el ratio intrínseco real del SVG (300x41.358); el
              tamaño visible lo controlan las clases (h-7 en mobile, h-9 desde sm) —
              ticket 4 de mejoras: logo más grande, sin romper el navbar en mobile. */}
          <Image
            src="/images/logo-ags.svg"
            alt="AGS Soluciones"
            width={261}
            height={36}
            priority
            className="h-7 w-auto sm:h-9"
          />
        </Link>

        <DesktopNav />

        <div className="flex items-center gap-3">
          <Button href={cotizarHref} className="hidden md:inline-flex">
            Cotiza tu proyecto
          </Button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-brand-navy md:hidden"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-neutral-200 bg-white md:hidden">
          <MobileNav onNavigate={() => setMobileOpen(false)} />
          <div className="px-4 pb-4 pt-2">
            <Button href={cotizarHref} className="w-full" onClick={() => setMobileOpen(false)}>
              Cotiza tu proyecto
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
