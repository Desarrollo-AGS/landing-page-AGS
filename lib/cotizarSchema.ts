import { z } from "zod";
import { servicios } from "@/data/servicios";

/**
 * Fuente única de validación para el formulario de cotización (ticket 5.2) —
 * la usan tanto el cliente (react-hook-form + zodResolver) como el servidor
 * (app/api/cotizar/route.ts), para no duplicar reglas que puedan desincronizarse.
 * Obligatorios: nombre, empresa, correo, teléfono, servicio (según el ticket).
 */
export const cotizarSchema = z.object({
  nombre: z.string().trim().min(2, "Ingresa tu nombre completo."),
  empresa: z.string().trim().min(2, "Ingresa el nombre de tu empresa."),
  correo: z.string().trim().min(1, "Ingresa tu correo.").email("Ingresa un correo válido."),
  telefono: z.string().trim().min(6, "Ingresa un teléfono válido."),
  servicioSlug: z
    .string()
    .min(1, "Selecciona un servicio.")
    .refine(
      (slug) => servicios.some((servicio) => servicio.slug === slug),
      "Selecciona un servicio válido.",
    ),
  ubicacion: z.string().trim().max(200).optional().or(z.literal("")),
  mensaje: z.string().trim().max(2000).optional().or(z.literal("")),
});

export type CotizarFormValues = z.infer<typeof cotizarSchema>;
