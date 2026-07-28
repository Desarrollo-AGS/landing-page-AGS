import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { Servicio } from "@/data/servicios";

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

interface ServicioCardProps {
  servicio: Servicio;
}

/**
 * `alt` usa el título del servicio (no vacío, distinto por tarjeta) aunque la imagen
 * hoy sea el mismo fallback genérico para los 7 — evita repetir el problema de SEO de
 * imágenes detectado en el sitio actual (spec 0.5: "mismo archivo, mismo alt vacío").
 */
export function ServicioCard({ servicio }: ServicioCardProps) {
  return (
    <Link href={`/servicios/${servicio.slug}`} className="group block h-full">
      <Card className="flex h-full flex-col">
        <div className="relative h-48 w-full">
          <Image
            src={servicio.imagen}
            alt={servicio.titulo}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-6">
          <div className="flex flex-wrap gap-2">
            {servicio.industrias.map((industria) => (
              <Badge key={industria}>{industria}</Badge>
            ))}
          </div>
          <h3 className="font-display text-lg font-semibold text-brand-navy">{servicio.titulo}</h3>
          <p className="flex-1 text-sm text-brand-stone-900/70">{servicio.resumenCorto}</p>
          <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand-orange">
            Más información
            <ArrowRightIcon />
          </span>
        </div>
      </Card>
    </Link>
  );
}
