import { z } from "zod";
import { opcionesOperacion } from "@/content/servicios";

/**
 * F-11 · Validación del formulario de contacto.
 *
 * El MISMO esquema corre en el cliente (mensajes junto a cada campo) y en el
 * servidor (la ruta de API no confía en el navegador). Una sola definición
 * evita que las dos validaciones se desalineen con el tiempo.
 */

const operaciones = opcionesOperacion.map((o) => o.value) as [string, ...string[]];

export const contactoSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "Indícanos tu nombre.")
    .max(120, "El nombre es demasiado largo."),

  empresa: z
    .string()
    .trim()
    .min(2, "Indícanos tu empresa.")
    .max(160, "El nombre de la empresa es demasiado largo."),

  email: z
    .string()
    .trim()
    .min(1, "Necesitamos un correo para responderte.")
    .email("Revisa el formato del correo."),

  // Opcional de verdad: vacío es válido. Si viene con contenido, se exige un
  // formato de teléfono razonable, sin obligar a un formato chileno exacto
  // porque también escriben desde Perú y Argentina.
  telefono: z
    .string()
    .trim()
    .max(32, "El teléfono es demasiado largo.")
    .refine((v) => v === "" || /^[+()\d\s.-]{7,}$/.test(v), "Revisa el formato del teléfono.")
    .optional()
    .default(""),

  operacion: z.enum(operaciones, { message: "Selecciona la operación requerida." }),

  mensaje: z
    .string()
    .trim()
    .min(20, "Cuéntanos al menos lo básico de la faena: dónde y qué hay que revisar.")
    .max(4000, "El detalle es demasiado largo. Resúmelo y lo conversamos por correo."),

  /**
   * Honeypot. Campo invisible para la persona y obligatoriamente vacío: los
   * bots que rellenan todo el formulario lo completan y quedan descartados.
   * Se prefiere esto a un captcha visual, que carga trabajo al usuario real.
   */
  sitioWeb: z.string().max(0, "Solicitud rechazada.").optional().default(""),
});

export type DatosContacto = z.infer<typeof contactoSchema>;

/** Convierte los errores de Zod a un mapa campo → primer mensaje. */
export function erroresPorCampo(error: z.ZodError): Record<string, string> {
  const salida: Record<string, string> = {};
  for (const issue of error.issues) {
    const campo = String(issue.path[0] ?? "");
    if (campo && !salida[campo]) salida[campo] = issue.message;
  }
  return salida;
}
