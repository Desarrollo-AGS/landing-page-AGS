import { NextResponse } from "next/server";
import { cotizarSchema } from "@/lib/cotizarSchema";

/**
 * Placeholder de envío (ticket 5.2): valida la solicitud con la misma fuente de
 * verdad que el formulario (cotizarSchema) y la registra en el log del servidor.
 *
 * El destino real (email a servicios@agssoluciones.cl, CRM, etc.) queda pendiente
 * de una decisión explícita de AGS Soluciones — ver blocker "Endpoint/CRM de
 * destino del formulario" en el spec (Sprint 5). Reemplazar el bloque marcado TODO
 * por la integración real no requiere tocar el formulario ni la validación.
 */
export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Solicitud inválida." }, { status: 400 });
  }

  const result = cotizarSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Datos inválidos.",
        issues: result.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  // TODO(ticket 5.2): reemplazar por el envío real a email/CRM en cuanto AGS
  // confirme el destino. Por ahora solo queda registrado en el log del servidor.
  console.log("[cotizar] Nueva solicitud de cotización:", result.data);

  return NextResponse.json({ ok: true });
}
