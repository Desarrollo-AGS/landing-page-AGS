import { NextResponse } from "next/server";
import { contactoSchema, erroresPorCampo } from "@/lib/contactoSchema";
import { opcionesOperacion } from "@/content/servicios";
import { site } from "@/content/site";

/**
 * F-11 · Recepción del formulario.
 *
 * El destino de los envíos es servicios@agssoluciones.cl, según el brief. El
 * envío se hace por Resend, que necesita dos variables de entorno:
 *
 *   RESEND_API_KEY      clave de la cuenta
 *   CONTACTO_REMITENTE  remitente verificado del dominio, p. ej.
 *                       "Web AGS <web@agssoluciones.cl>"
 *
 * Si faltan, la ruta NO finge que envió: responde 503 con un código que el
 * formulario traduce en un mensaje con el correo directo, conservando el
 * detalle que la persona ya escribió para que no pierda su texto.
 */

export const runtime = "nodejs";

export async function POST(request: Request) {
  let cuerpo: unknown;
  try {
    cuerpo = await request.json();
  } catch {
    return NextResponse.json({ ok: false, codigo: "json" }, { status: 400 });
  }

  const analisis = contactoSchema.safeParse(cuerpo);
  if (!analisis.success) {
    return NextResponse.json(
      { ok: false, codigo: "validacion", errores: erroresPorCampo(analisis.error) },
      { status: 422 },
    );
  }

  const datos = analisis.data;

  // Honeypot relleno: se responde 200 a propósito. Devolver un error le indica
  // al bot qué campo evitar en el siguiente intento.
  if (datos.sitioWeb) return NextResponse.json({ ok: true });

  const clave = process.env.RESEND_API_KEY;
  const remitente = process.env.CONTACTO_REMITENTE;
  if (!clave || !remitente) {
    console.error(
      "[contacto] Falta RESEND_API_KEY o CONTACTO_REMITENTE. La solicitud no se envió.",
    );
    return NextResponse.json({ ok: false, codigo: "sin-configurar" }, { status: 503 });
  }

  const operacion =
    opcionesOperacion.find((o) => o.value === datos.operacion)?.label ?? datos.operacion;

  const texto = [
    `Nombre:    ${datos.nombre}`,
    `Empresa:   ${datos.empresa}`,
    `Correo:    ${datos.email}`,
    `Teléfono:  ${datos.telefono || "no indicado"}`,
    `Operación: ${operacion}`,
    "",
    "Detalle de la faena:",
    datos.mensaje,
  ].join("\n");

  try {
    const respuesta = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${clave}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: remitente,
        to: [site.contacto.email],
        // Responder al correo lleva directo a quien escribió, no al remitente
        // técnico del sitio.
        reply_to: datos.email,
        subject: `Solicitud web · ${operacion} · ${datos.empresa}`,
        text: texto,
      }),
    });

    if (!respuesta.ok) {
      console.error("[contacto] Resend respondió", respuesta.status, await respuesta.text());
      return NextResponse.json({ ok: false, codigo: "envio" }, { status: 502 });
    }
  } catch (error) {
    console.error("[contacto] Error de red al enviar", error);
    return NextResponse.json({ ok: false, codigo: "envio" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
