"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { buttonClassName } from "@/components/ui/Button";
import { servicios } from "@/data/servicios";
import { cotizarSchema, type CotizarFormValues } from "@/lib/cotizarSchema";

const inputClass =
  "mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-brand-stone-900 outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange";
const labelClass = "text-sm font-medium text-brand-navy";
const errorClass = "mt-1 text-xs text-red-600";

const defaultValues: CotizarFormValues = {
  nombre: "",
  empresa: "",
  correo: "",
  telefono: "",
  servicioSlug: "",
  ubicacion: "",
  mensaje: "",
};

interface CtaFinalProps {
  /** "h1" para /cotizar (página propia, ticket 5.3); "h2" (default) cuando va embebido en Home. */
  headingLevel?: "h1" | "h2";
  title?: string;
  description?: string;
}

export default function CtaFinal({
  headingLevel = "h2",
  title = "Cotiza tu proyecto",
  description = "Cuéntanos el alcance de tu proyecto y te enviamos una propuesta a medida.",
}: CtaFinalProps) {
  const Heading = headingLevel;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CotizarFormValues>({
    resolver: zodResolver(cotizarSchema),
    defaultValues,
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function onSubmit(data: CotizarFormValues) {
    setStatus("idle");

    try {
      const response = await fetch("/api/cotizar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("request_failed");
      }

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="cotizar" className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="text-center">
        <Heading className="font-display text-3xl font-semibold tracking-tight text-brand-navy sm:text-4xl">
          {title}
        </Heading>
        <p className="mt-4 text-base text-brand-stone-900/70">{description}</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mt-10 grid gap-6 rounded-xl border border-neutral-200 bg-brand-sand-50 p-6 sm:grid-cols-2 sm:p-8"
      >
        <div>
          <label htmlFor="nombre" className={labelClass}>
            Nombre *
          </label>
          <input
            id="nombre"
            type="text"
            autoComplete="name"
            className={inputClass}
            aria-invalid={errors.nombre ? "true" : "false"}
            {...register("nombre")}
          />
          {errors.nombre && <p className={errorClass}>{errors.nombre.message}</p>}
        </div>

        <div>
          <label htmlFor="empresa" className={labelClass}>
            Empresa *
          </label>
          <input
            id="empresa"
            type="text"
            autoComplete="organization"
            className={inputClass}
            aria-invalid={errors.empresa ? "true" : "false"}
            {...register("empresa")}
          />
          {errors.empresa && <p className={errorClass}>{errors.empresa.message}</p>}
        </div>

        <div>
          <label htmlFor="correo" className={labelClass}>
            Correo *
          </label>
          <input
            id="correo"
            type="email"
            autoComplete="email"
            className={inputClass}
            aria-invalid={errors.correo ? "true" : "false"}
            {...register("correo")}
          />
          {errors.correo && <p className={errorClass}>{errors.correo.message}</p>}
        </div>

        <div>
          <label htmlFor="telefono" className={labelClass}>
            Teléfono *
          </label>
          <input
            id="telefono"
            type="tel"
            autoComplete="tel"
            className={inputClass}
            aria-invalid={errors.telefono ? "true" : "false"}
            {...register("telefono")}
          />
          {errors.telefono && <p className={errorClass}>{errors.telefono.message}</p>}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="servicioSlug" className={labelClass}>
            Tipo de servicio *
          </label>
          <select
            id="servicioSlug"
            className={inputClass}
            defaultValue=""
            aria-invalid={errors.servicioSlug ? "true" : "false"}
            {...register("servicioSlug")}
          >
            <option value="" disabled>
              Selecciona un servicio
            </option>
            {servicios.map((servicio) => (
              <option key={servicio.slug} value={servicio.slug}>
                {servicio.titulo}
              </option>
            ))}
          </select>
          {errors.servicioSlug && <p className={errorClass}>{errors.servicioSlug.message}</p>}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="ubicacion" className={labelClass}>
            Ubicación del proyecto
          </label>
          <input id="ubicacion" type="text" className={inputClass} {...register("ubicacion")} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="mensaje" className={labelClass}>
            Mensaje
          </label>
          <textarea id="mensaje" rows={4} className={inputClass} {...register("mensaje")} />
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={buttonClassName(
              "primary",
              "w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto",
            )}
          >
            {isSubmitting ? "Enviando…" : "Enviar cotización"}
          </button>
        </div>

        {status === "success" && (
          <p
            role="status"
            className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 sm:col-span-2"
          >
            ¡Gracias! Recibimos tu solicitud y te contactaremos a la brevedad.
          </p>
        )}
        {status === "error" && (
          <p
            role="alert"
            className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 sm:col-span-2"
          >
            Ocurrió un error al enviar tu solicitud. Intenta nuevamente o escríbenos directamente a{" "}
            <a href="mailto:servicios@agssoluciones.cl" className="underline">
              servicios@agssoluciones.cl
            </a>
            .
          </p>
        )}
      </form>
    </section>
  );
}
