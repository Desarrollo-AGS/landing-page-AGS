import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { CasoExito } from "@/data/casosExito";

function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
      aria-hidden="true"
    >
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  );
}

interface CasoExitoCardProps {
  caso: CasoExito;
}

export function CasoExitoCard({ caso }: CasoExitoCardProps) {
  return (
    <Link href={`/casos-exito/${caso.slug}`} className="group block h-full">
      <Card className="flex h-full flex-col">
        <div className="relative h-40 w-full">
          <Image
            src={caso.imagen}
            alt={`${caso.cliente} — ${caso.servicio}`}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2 p-6">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-stone-900/50">
            {caso.cliente}
          </p>
          <p className="font-display text-2xl font-semibold tabular-nums text-brand-orange">
            {caso.cifraDestacada}
          </p>
          <p className="flex-1 text-sm text-brand-stone-900/70">{caso.servicio}</p>
          <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand-orange">
            Ver caso completo
            <ArrowRightIcon />
          </span>
        </div>
      </Card>
    </Link>
  );
}
