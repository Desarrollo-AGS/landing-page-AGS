"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { CaretDown, List, X } from "@phosphor-icons/react/dist/ssr";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Logo } from "@/components/brand/Logo";
import { BotonEnlace } from "@/components/ui/Boton";
import { Contenedor } from "@/components/ui/Contenedor";
import { esRutaActiva, navPrincipal, type ItemNav } from "@/lib/nav";

/**
 * F-02 · Navbar.
 *
 * Cuatro decisiones que vale la pena dejar escritas:
 *
 * 1. EL LOGO RESPIRA. El manual de marca fija un área de seguridad alrededor
 *    del logotipo. Acá se traduce en un bloque propio con `pr-10 lg:pr-14` más
 *    su padding interno, en vez del logo pegado al primer ítem que tenía el
 *    sitio anterior.
 *
 * 2. FONDO SEGÚN CONTEXTO. Sobre el hero en video el navbar va transparente,
 *    y pasa a blanco sólido apenas se despega. El cambio se dispara con
 *    `useMotionValueEvent` sobre `useScroll`, que solo provoca un render al
 *    cruzar el umbral. Un `addEventListener("scroll")` renderizaría en cada
 *    cuadro y produciría jank en el propio scroll.
 *
 * 3. PUNTERO Y TECLADO NO SE PISAN. Con mouse, el panel se abre al pasar por
 *    encima y el clic sobre el ítem NAVEGA a su índice (/servicios, /software,
 *    /nosotros). Sin esa distinción, `pointerenter` abría el panel y el clic
 *    inmediato lo volvía a cerrar: parecía que el menú no funcionaba.
 *    Con teclado, Enter o Espacio abre y cierra el panel, Escape lo cierra
 *    devolviendo el foco al disparador, y también se cierra solo cuando el foco
 *    sale del ítem con Tab.
 *
 * 4. UNA SOLA LÍNEA. Seis ítems más el CTA caben en una línea desde 1024px.
 *    Bajo eso el menú pasa a hamburguesa con los mismos ítems, en vez de
 *    envolver a dos líneas.
 */

const CIERRE_MS = 140;

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  // Solo el home abre con un hero en video a pantalla completa. En el resto del
  // sitio el navbar arranca sólido desde el primer píxel.
  const heroOscuro = pathname === "/";
  const [desplegado, setDesplegado] = useState<string | null>(null);
  const [movilAbierto, setMovilAbierto] = useState(false);
  const [despegado, setDespegado] = useState(false);

  const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null);
  const disparadores = useRef<Record<string, HTMLButtonElement | null>>({});

  /**
   * Cancela un cierre en curso. Es obligatorio llamarlo ANTES de cualquier
   * cambio de estado del menú: al tabular de un ítem al siguiente, el `onBlur`
   * del primero deja programado un cierre a 140ms. Si el usuario abría el
   * panel del segundo con Enter dentro de esa ventana, ese temporizador viejo
   * se lo cerraba de inmediato y el menú parecía no responder al teclado.
   */
  const cancelarCierre = useCallback(() => {
    if (temporizador.current) {
      clearTimeout(temporizador.current);
      temporizador.current = null;
    }
  }, []);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const nuevo = y > 24;
    setDespegado((prev) => (prev === nuevo ? prev : nuevo));
  });

  // Al navegar se cierra todo: si no, el panel queda abierto sobre la página nueva.
  useEffect(() => {
    setDesplegado(null);
    setMovilAbierto(false);
  }, [pathname]);

  // Con el menú móvil abierto el fondo no debe poder scrollear detrás del panel.
  useEffect(() => {
    if (!movilAbierto) return;
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previo;
    };
  }, [movilAbierto]);

  useEffect(() => {
    const alPulsar = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (desplegado) {
        cancelarCierre();
        disparadores.current[desplegado]?.focus();
        setDesplegado(null);
      }
      setMovilAbierto(false);
    };
    document.addEventListener("keydown", alPulsar);
    return () => document.removeEventListener("keydown", alPulsar);
  }, [desplegado, cancelarCierre]);

  useEffect(
    () => () => {
      if (temporizador.current) clearTimeout(temporizador.current);
    },
    [],
  );

  const abrir = useCallback(
    (label: string) => {
      cancelarCierre();
      setDesplegado(label);
    },
    [cancelarCierre],
  );

  const cerrarConRetardo = useCallback(() => {
    cancelarCierre();
    // Pequeño retardo: sin él, el hueco de 1px entre el disparador y el panel
    // cierra el menú cuando el puntero baja hacia los enlaces.
    temporizador.current = setTimeout(() => setDesplegado(null), CIERRE_MS);
  }, [cancelarCierre]);

  const transparente = heroOscuro && !despegado && !movilAbierto;

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        transparente
          ? "border-b border-white/12 bg-transparent"
          : "border-b border-steel-100 bg-white/92 shadow-e1 backdrop-blur-md"
      }`}
    >
      <Contenedor className="flex h-[68px] items-center">
        {/* Bloque del logotipo: espacio propio a la derecha (área de seguridad). */}
        <Link
          href="/"
          aria-label="AGS Soluciones, ir al inicio"
          className="-ml-1 flex shrink-0 items-center rounded-xs px-1 py-2 pr-4 sm:pr-8 lg:pr-10"
        >
          <Logo
            variante={transparente ? "negativo" : "positivo"}
            alto={25}
            prioridad
            // El logotipo baja a 22px bajo 640px. A 320px de ancho, entre el
            // logo y la hamburguesa no quedaba aire y la fila se desbordaba.
            className="h-[22px] w-auto sm:h-[25px]"
          />
        </Link>

        {/* ---------- Navegación de escritorio ---------- */}
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navPrincipal.map((item) => (
              <ItemEscritorio
                key={item.label}
                item={item}
                activo={esRutaActiva(pathname, item.href)}
                abierto={desplegado === item.label}
                transparente={transparente}
                onAbrir={() => abrir(item.label)}
                onCerrar={cerrarConRetardo}
                onAlternar={(porPuntero) => {
                  cancelarCierre();
                  // Clic con mouse: el panel ya está abierto por hover, así que
                  // el clic solo puede significar "llévame al índice de esta
                  // sección". Con teclado, en cambio, abre y cierra el panel.
                  if (porPuntero) {
                    router.push(item.href);
                    return;
                  }
                  setDesplegado((prev) => (prev === item.label ? null : item.label));
                }}
                registrarDisparador={(el) => {
                  disparadores.current[item.label] = el;
                }}
              />
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 pl-4">
          <div className="hidden sm:block">
            <BotonEnlace href="/contacto" tamano="md">
              Contáctanos
            </BotonEnlace>
          </div>

          <button
            type="button"
            onClick={() => setMovilAbierto((v) => !v)}
            aria-expanded={movilAbierto}
            aria-controls="menu-movil"
            aria-label={movilAbierto ? "Cerrar menú" : "Abrir menú"}
            className={`flex h-11 w-11 items-center justify-center rounded-xs transition-colors lg:hidden ${
              transparente ? "text-white hover:bg-white/12" : "text-steel-900 hover:bg-steel-50"
            }`}
          >
            {movilAbierto ? (
              <X size={22} weight="bold" aria-hidden="true" />
            ) : (
              <List size={22} weight="bold" aria-hidden="true" />
            )}
          </button>
        </div>
      </Contenedor>

      <MenuMovil abierto={movilAbierto} pathname={pathname} />
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Ítem de escritorio, con y sin desplegable                           */
/* ------------------------------------------------------------------ */

function ItemEscritorio({
  item,
  activo,
  abierto,
  transparente,
  onAbrir,
  onCerrar,
  onAlternar,
  registrarDisparador,
}: {
  item: ItemNav;
  activo: boolean;
  abierto: boolean;
  transparente: boolean;
  onAbrir: () => void;
  onCerrar: () => void;
  onAlternar: (porPuntero: boolean) => void;
  registrarDisparador: (el: HTMLButtonElement | null) => void;
}) {
  const tinta = transparente
    ? "text-white/85 hover:text-white"
    : "text-steel-700 hover:text-steel-900";
  const tintaActiva = transparente ? "text-white" : "text-steel-900";

  // Subrayado naranja de 2px para la página en curso. Va en un pseudo-elemento
  // posicionado, no en `border-bottom`, para no mover el alto del ítem.
  const marcaActiva = activo ? (
    <span aria-hidden="true" className="absolute inset-x-3 -bottom-px h-0.5 bg-orange" />
  ) : null;

  if (!item.submenu) {
    return (
      <li className="relative">
        <Link
          href={item.href}
          aria-current={activo ? "page" : undefined}
          className={`relative flex h-[68px] items-center rounded-xs px-3 text-[0.9375rem] font-medium transition-colors duration-200 ${
            activo ? tintaActiva : tinta
          }`}
        >
          {item.label}
          {marcaActiva}
        </Link>
      </li>
    );
  }

  const idPanel = `submenu-${item.label.toLowerCase()}`;

  return (
    <li
      className="relative"
      onPointerEnter={onAbrir}
      onPointerLeave={onCerrar}
      onBlur={(e) => {
        // Cierra cuando el foco sale del ítem completo con Tab, pero no cuando
        // simplemente se mueve entre los enlaces de adentro.
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) onCerrar();
      }}
    >
      <button
        type="button"
        ref={registrarDisparador}
        // Teclado y puntero se separan en dos manejadores distintos, en vez de
        // intentar adivinar de dónde vino el clic. Enter y Espacio abren y
        // cierran el panel; `preventDefault` evita que el navegador sintetice
        // además un `click` y deshaga lo que acabamos de hacer.
        onKeyDown={(e) => {
          if (e.key !== "Enter" && e.key !== " ") return;
          e.preventDefault();
          onAlternar(false);
        }}
        onClick={() => onAlternar(true)}
        aria-expanded={abierto}
        aria-controls={idPanel}
        aria-current={activo ? "page" : undefined}
        className={`relative flex h-[68px] items-center gap-1.5 rounded-xs px-3 text-[0.9375rem] font-medium transition-colors duration-200 ${
          activo ? tintaActiva : tinta
        }`}
      >
        {item.label}
        <CaretDown
          size={12}
          weight="bold"
          aria-hidden="true"
          className={`transition-transform duration-200 ${abierto ? "rotate-180" : ""}`}
        />
        {marcaActiva}
      </button>

      <motion.div
        id={idPanel}
        initial={false}
        animate={abierto ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
        transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
        // `inert` deja el panel cerrado fuera del recorrido de Tab sin sacarlo
        // del DOM, para que la transición pueda animarse en los dos sentidos.
        inert={!abierto}
        className={`absolute left-0 top-full w-max min-w-[19rem] max-w-[26rem] border border-steel-100 bg-white p-2 shadow-e3 ${
          abierto ? "visible" : "invisible"
        }`}
      >
        {item.submenu.descripcion ? (
          <p className="px-3 pb-2 pt-2 text-[0.8125rem] leading-snug text-steel-500">
            {item.submenu.descripcion}
          </p>
        ) : null}

        {item.submenu.destacados?.length ? (
          <ul className="mb-1 border-b border-steel-100 pb-1">
            {item.submenu.destacados.map((e) => (
              <li key={e.href}>
                <EnlacePanel {...e} destacado />
              </li>
            ))}
          </ul>
        ) : null}

        <ul>
          {item.submenu.resto?.map((e) => (
            <li key={e.href}>
              <EnlacePanel {...e} />
            </li>
          ))}
        </ul>

        {item.submenu.indice ? (
          <div className="mt-1 border-t border-steel-100 pt-1">
            <Link
              href={item.submenu.indice.href}
              className="block rounded-xs px-3 py-2 text-[0.8125rem] font-semibold text-orange-ink transition-colors hover:bg-steel-50"
            >
              {item.submenu.indice.label}
            </Link>
          </div>
        ) : null}
      </motion.div>
    </li>
  );
}

function EnlacePanel({
  href,
  label,
  destacado,
}: {
  href: string;
  label: string;
  destacado?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`block rounded-xs px-3 py-2 text-[0.9375rem] leading-snug transition-colors duration-150 hover:bg-steel-50 hover:text-steel-900 ${
        destacado ? "font-medium text-steel-900" : "text-steel-600"
      }`}
    >
      {label}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Menú móvil                                                          */
/* ------------------------------------------------------------------ */

function MenuMovil({ abierto, pathname }: { abierto: boolean; pathname: string }) {
  const [seccion, setSeccion] = useState<string | null>(null);

  /**
   * El panel va `absolute` colgando del header, NO `fixed`.
   *
   * El header usa `backdrop-blur`, y `backdrop-filter` convierte al elemento en
   * bloque contenedor de sus descendientes `position: fixed`. Con el panel en
   * `fixed top-[68px] bottom-0`, esas medidas se resolvían contra el header (68px
   * de alto) en vez de contra la ventana, y el menú quedaba con altura cero: el
   * botón cambiaba de icono y no aparecía nada.
   *
   * Colgado del header con `top-full`, el panel se posiciona bien y además
   * acompaña al navbar pegajoso al hacer scroll. El alto máximo deja el panel
   * dentro de la ventana y con scroll propio si los seis ítems y sus submenús
   * no caben.
   */
  return (
    <div
      id="menu-movil"
      inert={!abierto}
      className={`absolute inset-x-0 top-full lg:hidden ${abierto ? "visible" : "invisible"}`}
    >
      <div
        className={`max-h-[calc(100svh-6.5rem)] overflow-y-auto overscroll-contain border-t border-steel-100 bg-white shadow-e3 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          abierto ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
        }`}
      >
        <Contenedor className="py-4">
          <nav aria-label="Principal, móvil">
            <ul className="divide-y divide-steel-100">
              {navPrincipal.map((item) => {
                const activo = esRutaActiva(pathname, item.href);
                if (!item.submenu) {
                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        aria-current={activo ? "page" : undefined}
                        className={`flex min-h-[52px] items-center text-[1.0625rem] font-medium ${
                          activo ? "text-orange-ink" : "text-steel-900"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                }

                const desplegado = seccion === item.label;
                const enlaces = [
                  ...(item.submenu.destacados ?? []),
                  ...(item.submenu.resto ?? []),
                  ...(item.submenu.indice ? [item.submenu.indice] : []),
                ];

                return (
                  <li key={item.label}>
                    <button
                      type="button"
                      onClick={() => setSeccion(desplegado ? null : item.label)}
                      aria-expanded={desplegado}
                      className={`flex min-h-[52px] w-full items-center justify-between text-left text-[1.0625rem] font-medium ${
                        activo ? "text-orange-ink" : "text-steel-900"
                      }`}
                    >
                      {item.label}
                      <CaretDown
                        size={14}
                        weight="bold"
                        aria-hidden="true"
                        className={`text-steel-400 transition-transform duration-200 ${
                          desplegado ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div className="disclosure" data-open={desplegado}>
                      <div>
                        <ul className="pb-3 pl-1">
                          {enlaces.map((e) => (
                            <li key={e.href}>
                              <Link
                                href={e.href}
                                className="flex min-h-[42px] items-center text-[0.9375rem] text-steel-600"
                              >
                                {e.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <BotonEnlace href="/contacto" tamano="lg" className="mt-6 w-full">
            Contáctanos
          </BotonEnlace>
        </Contenedor>
      </div>
    </div>
  );
}
