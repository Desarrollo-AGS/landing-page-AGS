import Image from "next/image";
import type { MediaCapacidad as Media } from "@/content/brochureIao";
import { formatearCifra } from "@/components/ui/FichaCaso";

/**
 * Lo que acompaña a una capacidad: fotografía, video de faena o cifra real.
 *
 * `conVideo` solo se activa en el panel de escritorio. En móvil el video se
 * queda en su póster: 4 MB de datos móviles para un recuadro no se justifican,
 * con el mismo criterio que el hero de la portada.
 */
export function MediaCapacidad({ media, conVideo = false }: { media: Media; conVideo?: boolean }) {
  if (media.tipo === "cifra") {
    return (
      <div className="relative flex h-full flex-col justify-end bg-steel-900 p-8 sm:p-10">
        <div aria-hidden="true" className="iao-reticula-fina absolute inset-0" />
        <p className="relative flex flex-wrap items-baseline gap-x-3">
          <span className="num font-display text-[clamp(3rem,14vw,8.5rem)] font-bold leading-[0.85] tracking-[-0.05em] text-white lg:text-[clamp(4rem,8.5vw,8.5rem)]">
            {formatearCifra(media.valor)}
          </span>
          <span className="font-display text-[clamp(1.5rem,2.4vw,2.25rem)] font-semibold text-orange">
            {media.unidad}
          </span>
        </p>
        <p className="relative mt-5 max-w-[22rem] text-[0.9375rem] leading-relaxed text-steel-300">
          {media.pie}
        </p>
      </div>
    );
  }

  const src = media.tipo === "imagen" ? media.src : media.poster;

  return (
    <figure className="relative h-full">
      <div data-capacidad-fondo className="absolute inset-0">
        <Image
          src={src}
          alt={media.alt}
          fill
          sizes="(min-width: 1024px) 46vw, 100vw"
          loading="lazy"
          className="object-cover"
        />
        {media.tipo === "video" && conVideo ? (
          <video
            muted
            loop
            playsInline
            preload="none"
            poster={media.poster}
            aria-label={media.alt}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={media.webm} type="video/webm" />
            <source src={media.mp4} type="video/mp4" />
          </video>
        ) : null}
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-steel-950/85 via-steel-950/10 to-transparent"
      />
      <figcaption className="absolute inset-x-0 bottom-0 p-5 text-[0.8125rem] leading-snug text-white/80 sm:p-6">
        {media.pie}
      </figcaption>
    </figure>
  );
}
