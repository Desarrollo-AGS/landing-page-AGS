/**
 * F-03 · Dron ambiental del hero.
 *
 * El brief pide reemplazar el dron grande estático por uno pequeño que recorra
 * la pantalla, y descarta explícitamente el GIF. Esto es un SVG de cuatro
 * formas geométricas, animado por CSS con dos transforms compuestos de período
 * distinto (traslación de 26s + deriva de 7,5s), de modo que el recorrido no se
 * lea como un bucle exacto. Ver `.drone-path` y `.drone-drift` en globals.css.
 *
 *   · `pointer-events: none`  nunca bloquea un clic
 *   · `aria-hidden`           es atmósfera, no información
 *   · oculto bajo 768px       en móvil el hero ya es apretado y no aporta
 *   · `prefers-reduced-motion` el componente ni siquiera se monta (ver Hero)
 *
 * Va contenido en un div con `overflow-hidden` y `inset-0`, así que la
 * traslación de -14vw a 114vw no genera scroll horizontal en ningún ancho.
 */
export function Dron() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[5] hidden overflow-hidden md:block"
    >
      <div className="drone-path absolute top-[22%] left-0">
        <div className="drone-body">
          <svg
            width="46"
            height="20"
            viewBox="0 0 46 20"
            fill="none"
            className="opacity-70 drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
          >
            {/* Brazos */}
            <path
              d="M8 7 L19 10 M38 7 L27 10 M8 15 L19 12 M38 15 L27 12"
              stroke="#ffffff"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
            {/* Fuselaje */}
            <rect x="19" y="8" width="8" height="5" rx="1" fill="#ffffff" />
            {/* Discos de rotor */}
            <ellipse cx="8" cy="7" rx="6" ry="1.1" fill="#ffffff" opacity="0.55" />
            <ellipse cx="38" cy="7" rx="6" ry="1.1" fill="#ffffff" opacity="0.55" />
            <ellipse cx="8" cy="15" rx="6" ry="1.1" fill="#ffffff" opacity="0.55" />
            <ellipse cx="38" cy="15" rx="6" ry="1.1" fill="#ffffff" opacity="0.55" />
            {/* Luz de posición, en el naranja de marca */}
            <circle cx="26" cy="10.5" r="1.2" fill="#FF5500" />
          </svg>
        </div>
      </div>
    </div>
  );
}
