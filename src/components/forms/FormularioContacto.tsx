"use client";

import { useId, useRef, useState } from "react";
import { CheckCircle, PaperPlaneTilt, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { Boton } from "@/components/ui/Boton";
import { contactoSchemaDe, erroresPorCampo } from "@/lib/contactoSchema";
import { opcionesOperacionDe } from "@/content/servicios";
import { mailHref, site } from "@/content/site";
import { diccionario } from "@/content/i18n";
import { IDIOMA_POR_DEFECTO, type Idioma } from "@/lib/idioma";
import type { Diccionario } from "@/content/i18n/tipos";

/**
 * F-11 · Formulario de contacto.
 *
 * Cuatro cosas que el brief pide explícitamente y que están resueltas acá:
 *
 * 1. NUNCA PIERDE LO ESCRITO. El estado del formulario vive en React, así que
 *    un envío fallido no vacía nada. Además, si la ruta de envío no está
 *    configurada, el error ofrece un enlace `mailto:` con el mensaje ya
 *    redactado dentro, para que la persona no tenga que volver a escribirlo.
 *
 * 2. ERRORES ANUNCIADOS A LECTORES DE PANTALLA. Cada campo con error lleva
 *    `aria-invalid` y `aria-describedby` apuntando a su mensaje; el resumen de
 *    estado va en una región `aria-live="polite"`. Al fallar, el foco salta al
 *    primer campo con error.
 *
 * 3. VALIDACIÓN AL SALIR DEL CAMPO, NO AL TECLEAR. Marcar en rojo mientras
 *    alguien todavía escribe su correo es hostil. El campo se valida al perder
 *    el foco, y desde ahí sí se corrige en vivo mientras se edita.
 *
 * 4. ANTI-SPAM SIN CAPTCHA. Un campo trampa oculto ("sitioWeb"), fuera del
 *    recorrido de teclado y anunciado como no relevante.
 */

type Estado = "inactivo" | "enviando" | "exito" | "error";

const VACIO = {
  nombre: "",
  empresa: "",
  email: "",
  telefono: "",
  operacion: "",
  mensaje: "",
  sitioWeb: "",
};

export function FormularioContacto({ lang = IDIOMA_POR_DEFECTO }: { lang?: Idioma }) {
  const t = diccionario(lang);
  const f = t.formulario;
  // El esquema se arma por idioma porque sus mensajes son texto visible; la
  // forma de los datos es la misma, así que el servidor valida igual.
  const esquema = contactoSchemaDe(lang);
  const opciones = opcionesOperacionDe(t);
  const idBase = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [valores, setValores] = useState({ ...VACIO });
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [tocados, setTocados] = useState<Record<string, boolean>>({});
  const [estado, setEstado] = useState<Estado>("inactivo");
  const [codigoError, setCodigoError] = useState<string | null>(null);

  const campoId = (n: string) => `${idBase}-${n}`;
  const errorId = (n: string) => `${idBase}-${n}-error`;

  function actualizar(nombre: string, valor: string) {
    setValores((v) => ({ ...v, [nombre]: valor }));
    // Una vez que el campo fue tocado, se revalida en vivo: así el mensaje
    // desaparece en cuanto se corrige, sin esperar a salir del campo otra vez.
    if (tocados[nombre]) validarCampo(nombre, { ...valores, [nombre]: valor });
  }

  function validarCampo(nombre: string, datos: typeof valores) {
    const resultado = esquema.safeParse(datos);
    const mapa = resultado.success ? {} : erroresPorCampo(resultado.error);
    setErrores((prev) => {
      const siguiente = { ...prev };
      if (mapa[nombre]) siguiente[nombre] = mapa[nombre];
      else delete siguiente[nombre];
      return siguiente;
    });
  }

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const resultado = esquema.safeParse(valores);
    if (!resultado.success) {
      const mapa = erroresPorCampo(resultado.error);
      setErrores(mapa);
      setTocados(Object.fromEntries(Object.keys(valores).map((k) => [k, true])));
      setEstado("inactivo");
      const primero = Object.keys(mapa)[0];
      if (primero) {
        formRef.current
          ?.querySelector<HTMLElement>(`[name="${primero}"]`)
          ?.focus({ preventScroll: false });
      }
      return;
    }

    setEstado("enviando");
    setCodigoError(null);

    try {
      // `lang` viaja en la URL y no en el cuerpo: el cuerpo es exactamente lo
      // que valida el esquema, y meterle un campo de más lo haría fallar.
      const respuesta = await fetch(`/api/contacto?lang=${lang}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resultado.data),
      });

      if (respuesta.ok) {
        setEstado("exito");
        setValores({ ...VACIO });
        setErrores({});
        setTocados({});
        return;
      }

      const cuerpo = (await respuesta.json().catch(() => null)) as {
        codigo?: string;
        errores?: Record<string, string>;
      } | null;

      if (cuerpo?.errores) setErrores(cuerpo.errores);
      setCodigoError(cuerpo?.codigo ?? "envio");
      setEstado("error");
    } catch {
      setCodigoError("red");
      setEstado("error");
    }
  }

  /* ---------------- Estado de éxito ---------------- */
  if (estado === "exito") {
    return (
      <div
        role="status"
        className="chamfer flex flex-col items-start gap-4 border border-steel-200 bg-white p-8 sm:p-10"
      >
        <CheckCircle size={30} weight="light" aria-hidden="true" className="text-orange" />
        <h3 className="text-xl font-semibold text-steel-900">{f.exitoTitulo}</h3>
        <p className="measure text-[0.9375rem] leading-relaxed text-steel-600">
          {f.exitoParrafo}
        </p>
        <Boton
          type="button"
          variante="linea"
          onClick={() => setEstado("inactivo")}
          className="mt-2"
        >
          {f.enviarOtra}
        </Boton>
      </div>
    );
  }

  const enviando = estado === "enviando";

  return (
    <form
      ref={formRef}
      onSubmit={enviar}
      noValidate
      className="chamfer border border-steel-200 bg-white p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Campo
          nombre="nombre"
          etiqueta={f.nombre}
          autoComplete="name"
          valores={valores}
          errores={errores}
          tocados={tocados}
          setTocados={setTocados}
          actualizar={actualizar}
          validarCampo={validarCampo}
          campoId={campoId}
          errorId={errorId}
          obligatorio={f.obligatorio}
        />
        <Campo
          nombre="empresa"
          etiqueta={f.empresa}
          autoComplete="organization"
          valores={valores}
          errores={errores}
          tocados={tocados}
          setTocados={setTocados}
          actualizar={actualizar}
          validarCampo={validarCampo}
          campoId={campoId}
          errorId={errorId}
          obligatorio={f.obligatorio}
        />
        <Campo
          nombre="email"
          etiqueta={f.email}
          tipo="email"
          autoComplete="email"
          valores={valores}
          errores={errores}
          tocados={tocados}
          setTocados={setTocados}
          actualizar={actualizar}
          validarCampo={validarCampo}
          campoId={campoId}
          errorId={errorId}
          obligatorio={f.obligatorio}
        />
        <Campo
          nombre="telefono"
          etiqueta={f.telefono}
          tipo="tel"
          autoComplete="tel"
          opcional
          ayuda={f.opcional}
          valores={valores}
          errores={errores}
          tocados={tocados}
          setTocados={setTocados}
          actualizar={actualizar}
          validarCampo={validarCampo}
          campoId={campoId}
          errorId={errorId}
          obligatorio={f.obligatorio}
        />
      </div>

      <div className="mt-5">
        <label htmlFor={campoId("operacion")} className={ETIQUETA}>
          {f.operacion} <Requerido texto={f.obligatorio} />
        </label>
        <select
          id={campoId("operacion")}
          name="operacion"
          value={valores.operacion}
          onChange={(e) => actualizar("operacion", e.target.value)}
          onBlur={() => {
            setTocados((t) => ({ ...t, operacion: true }));
            validarCampo("operacion", valores);
          }}
          aria-invalid={errores.operacion ? true : undefined}
          aria-describedby={errores.operacion ? errorId("operacion") : undefined}
          className={`${CONTROL} ${errores.operacion ? CONTROL_ERROR : ""} ${
            valores.operacion ? "text-steel-900" : "text-steel-500"
          }`}
        >
          <option value="">{f.selecciona}</option>
          {opciones.map((o) => (
            <option key={o.value} value={o.value} className="text-steel-900">
              {o.label}
            </option>
          ))}
        </select>
        <MensajeError id={errorId("operacion")} texto={errores.operacion} />
      </div>

      <div className="mt-5">
        <label htmlFor={campoId("mensaje")} className={ETIQUETA}>
          {f.detalle} <Requerido texto={f.obligatorio} />
        </label>
        <textarea
          id={campoId("mensaje")}
          name="mensaje"
          rows={5}
          value={valores.mensaje}
          onChange={(e) => actualizar("mensaje", e.target.value)}
          onBlur={() => {
            setTocados((t) => ({ ...t, mensaje: true }));
            validarCampo("mensaje", valores);
          }}
          placeholder={f.detallePlaceholder}
          aria-invalid={errores.mensaje ? true : undefined}
          aria-describedby={errores.mensaje ? errorId("mensaje") : undefined}
          className={`${CONTROL} min-h-[8rem] resize-y py-3 ${
            errores.mensaje ? CONTROL_ERROR : ""
          }`}
        />
        <MensajeError id={errorId("mensaje")} texto={errores.mensaje} />
      </div>

      {/* Trampa anti-spam. Fuera del recorrido de teclado y del árbol de
          accesibilidad: para una persona no existe. */}
      <div aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0">
        <label htmlFor={campoId("sitioWeb")}>{f.trampa}</label>
        <input
          id={campoId("sitioWeb")}
          name="sitioWeb"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={valores.sitioWeb}
          onChange={(e) => actualizar("sitioWeb", e.target.value)}
        />
      </div>

      {/* Región de estado. `aria-live="polite"` para que el resultado se
          anuncie sin interrumpir lo que el lector esté leyendo. */}
      <div aria-live="polite" className="mt-5 empty:mt-0">
        {estado === "error" && codigoError ? (
          <div className="flex gap-3 border-l-2 border-orange bg-steel-50 p-4">
            <WarningCircle
              size={18}
              weight="fill"
              aria-hidden="true"
              className="mt-px shrink-0 text-orange-ink"
            />
            <div className="text-[0.875rem] leading-relaxed text-steel-700">
              <p>{mensajeDeError(f, codigoError)}</p>
              <a
                href={enlaceCorreoDirecto(valores, t, opciones)}
                className="mt-2 inline-block font-semibold text-orange-ink underline underline-offset-2"
              >
                {f.enviarPorCorreo.replace("{email}", site.contacto.email)}
              </a>
            </div>
          </div>
        ) : null}

        {Object.keys(errores).length > 0 && estado !== "error" ? (
          <p className="sr-only">
            {f.resumenErrores.replace("{n}", String(Object.keys(errores).length))}
          </p>
        ) : null}
      </div>

      {/* `data-fab-libre`: mientras este control esté en pantalla, el botón
          flotante de WhatsApp se aparta para no taparlo en móvil (F-13). */}
      <Boton
        type="submit"
        tamano="lg"
        disabled={enviando}
        data-fab-libre
        className="mt-6 w-full sm:w-auto"
      >
        {enviando ? (
          <>
            <span
              aria-hidden="true"
              className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-steel-900/25 border-t-steel-900"
            />
            {f.enviando}
          </>
        ) : (
          <>
            {f.enviar}
            <PaperPlaneTilt size={15} weight="fill" aria-hidden="true" />
          </>
        )}
      </Boton>

      {/* La nota lleva el correo como enlace en medio de la frase, así que se
          parte por el marcador en vez de concatenar texto suelto: el orden de
          las palabras alrededor del correo cambia entre idiomas. */}
      <p className="mt-4 text-xs leading-relaxed text-steel-500">
        {f.nota.split("{email}")[0]}
        <a href={mailHref} className="text-orange-ink underline underline-offset-2">
          {site.contacto.email}
        </a>
        {f.nota.split("{email}")[1]}
      </p>
    </form>
  );
}

/* ------------------------------------------------------------------ */

const ETIQUETA = "mb-2 block text-[0.8125rem] font-semibold text-steel-700";

/* Placeholder a steel-500 (4.53:1) y borde a steel-300, ambos sobre blanco:
   el gris claro habitual de los formularios no pasa AA. */
const CONTROL =
  "block h-11 w-full rounded-xs border border-steel-300 bg-white px-3.5 text-[0.9375rem] " +
  "text-steel-900 placeholder:text-steel-500 transition-colors duration-150 " +
  "hover:border-steel-400 focus:border-steel-900 focus:outline-none";

const CONTROL_ERROR = "border-orange-ink";

function Requerido({ texto }: { texto: string }) {
  return (
    <>
      <span aria-hidden="true" className="text-orange-ink">
        *
      </span>
      <span className="sr-only">{texto}</span>
    </>
  );
}

/** El mensaje del código que devolvió la API, con el de envío como respaldo. */
function mensajeDeError(f: Diccionario["formulario"], codigo: string): string {
  const mapa: Record<string, string> = {
    "sin-configurar": f.errores.sinConfigurar,
    envio: f.errores.envio,
    red: f.errores.red,
  };
  return mapa[codigo] ?? f.errores.envio;
}

function MensajeError({ id, texto }: { id: string; texto?: string }) {
  if (!texto) return null;
  return (
    <p id={id} className="mt-2 text-[0.8125rem] font-medium text-orange-ink">
      {texto}
    </p>
  );
}

interface PropsCampo {
  nombre: keyof typeof VACIO;
  etiqueta: string;
  tipo?: string;
  autoComplete?: string;
  opcional?: boolean;
  ayuda?: string;
  valores: typeof VACIO;
  errores: Record<string, string>;
  tocados: Record<string, boolean>;
  setTocados: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  actualizar: (n: string, v: string) => void;
  validarCampo: (n: string, d: typeof VACIO) => void;
  campoId: (n: string) => string;
  errorId: (n: string) => string;
  obligatorio: string;
}

function Campo({
  nombre,
  etiqueta,
  tipo = "text",
  autoComplete,
  opcional,
  ayuda,
  valores,
  errores,
  tocados,
  setTocados,
  actualizar,
  validarCampo,
  campoId,
  errorId,
  obligatorio,
}: PropsCampo) {
  const error = errores[nombre];
  const ayudaId = `${campoId(nombre)}-ayuda`;

  return (
    <div>
      <label htmlFor={campoId(nombre)} className={ETIQUETA}>
        {etiqueta} {opcional ? null : <Requerido texto={obligatorio} />}
      </label>
      <input
        id={campoId(nombre)}
        name={nombre}
        type={tipo}
        autoComplete={autoComplete}
        value={valores[nombre]}
        onChange={(e) => actualizar(nombre, e.target.value)}
        onBlur={() => {
          setTocados({ ...tocados, [nombre]: true });
          validarCampo(nombre, valores);
        }}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId(nombre) : ayuda ? ayudaId : undefined}
        className={`${CONTROL} ${error ? CONTROL_ERROR : ""}`}
      />
      {error ? (
        <MensajeError id={errorId(nombre)} texto={error} />
      ) : ayuda ? (
        <p id={ayudaId} className="mt-2 text-[0.8125rem] text-steel-500">
          {ayuda}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Enlace `mailto:` de respaldo con todo lo escrito ya dentro del cuerpo. Es lo
 * que hace que un fallo de envío no le cueste al usuario volver a redactar.
 */
function enlaceCorreoDirecto(
  v: typeof VACIO,
  t: Diccionario,
  opciones: { value: string; label: string }[],
) {
  const c = t.formulario.correo;
  const operacion = opciones.find((o) => o.value === v.operacion)?.label ?? c.porDefinir;
  const cuerpo = [
    `${c.nombre}: ${v.nombre}`,
    `${c.empresa}: ${v.empresa}`,
    `${c.telefono}: ${v.telefono || c.noIndicado}`,
    `${c.operacion}: ${operacion}`,
    "",
    v.mensaje,
  ].join("\n");
  return `mailto:${site.contacto.email}?subject=${encodeURIComponent(
    `${c.asunto} · ${v.empresa || c.web}`,
  )}&body=${encodeURIComponent(cuerpo)}`;
}
