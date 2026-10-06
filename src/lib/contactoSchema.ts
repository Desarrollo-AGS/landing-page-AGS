import { z } from "zod";
import { opcionesOperacion } from "@/content/servicios";
import { diccionario } from "@/content/i18n";
import { IDIOMA_POR_DEFECTO, type Idioma } from "@/lib/idioma";

/**
 * F-11 · Validación del formulario de contacto.
 *
 * El MISMO esquema corre en el cliente (mensajes junto a cada campo) y en el
 * servidor (la ruta de API no confía en el navegador). Una sola definición
 * evita que las dos validaciones se desalineen con el tiempo.
 *
 * Los mensajes salen del diccionario, así que el esquema se construye por
 * idioma. Lo que NO cambia es la forma de los datos: mismos campos, mismos
 * `value` de operación y mismos límites en los dos idiomas, para que el
 * servidor valide igual sin importar en qué versión se llenó el formulario.
 */

const operaciones = opcionesOperacion.map((o) => o.value) as [string, ...string[]];

export function contactoSchemaDe(lang: Idioma = IDIOMA_POR_DEFECTO) {
  const m = diccionario(lang).formulario.validacion;
  return z.object({
    nombre: z.string().trim().min(2, m.nombre).max(120, m.nombreLargo),

    empresa: z.string().trim().min(2, m.empresa).max(160, m.empresaLarga),

    email: z.string().trim().min(1, m.email).email(m.emailFormato),

    // Opcional de verdad: vacío es válido. Si viene con contenido, se exige un
    // formato de teléfono razonable, sin obligar a un formato chileno exacto
    // porque también escriben desde Perú y Argentina.
    telefono: z
      .string()
      .trim()
      .max(32, m.telefonoLargo)
      .refine((v) => v === "" || /^[+()\d\s.-]{7,}$/.test(v), m.telefonoFormato)
      .optional()
      .default(""),

    operacion: z.enum(operaciones, { message: m.operacion }),

    mensaje: z.string().trim().min(20, m.mensajeCorto).max(4000, m.mensajeLargo),

    /**
     * Honeypot. Campo invisible para la persona y obligatoriamente vacío: los
     * bots que rellenan todo el formulario lo completan y quedan descartados.
     * Se prefiere esto a un captcha visual, que carga trabajo al usuario real.
     */
    sitioWeb: z.string().max(0, m.rechazada).optional().default(""),
  });
}

/** El esquema en español, que es el idioma por defecto del sitio. */
export const contactoSchema = contactoSchemaDe();

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
