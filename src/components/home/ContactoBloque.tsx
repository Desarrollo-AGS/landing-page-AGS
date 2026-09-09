import { EnvelopeSimple, MapPin, Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { Contenedor } from "@/components/ui/Contenedor";
import { FormularioContacto } from "@/components/forms/FormularioContacto";
import { Revelar } from "@/components/ui/Revelar";
import { mailHref, site, telHref, whatsappHref } from "@/content/site";

/**
 * Bloque de contacto. Se usa tal cual en el home y en /contacto, para que la
 * conversión no dependa de en qué página cayó la persona.
 *
 * Columna izquierda: los canales directos, para quien no quiere llenar un
 * formulario. Columna derecha: el formulario, para quien prefiere dejar el
 * detalle por escrito. Las dos opciones conviven en vez de competir.
 */
export function ContactoBloque({ conTitulo = true }: { conTitulo?: boolean }) {
  return (
    <section id="contacto" className="bg-white py-20 sm:py-24 lg:py-28">
      <Contenedor>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
          <Revelar>
            <div>
              {conTitulo ? (
                <>
                  <span className="rule-accent mb-6" aria-hidden="true" />
                  <h2 className="text-d3 text-steel-900 sm:text-d2">
                    Cuéntanos qué hay que inspeccionar
                  </h2>
                </>
              ) : null}
              <p className="measure mt-5 text-[1.0625rem] leading-relaxed text-steel-600">
                Revisamos el caso y enviamos propuesta técnica y comercial. Si la operación lo
                requiere, coordinamos una visita a faena.
              </p>

              <ul className="mt-10 space-y-1 border-t border-steel-100">
                <li>
                  <a
                    href={telHref}
                    className="group flex items-center gap-4 border-b border-steel-100 py-5 transition-colors hover:bg-steel-50"
                  >
                    <Phone
                      size={19}
                      weight="light"
                      aria-hidden="true"
                      className="shrink-0 text-orange"
                    />
                    <span>
                      <span className="num block text-[1.0625rem] font-medium text-steel-900">
                        {site.contacto.telefono}
                      </span>
                      <span className="text-[0.8125rem] text-steel-500">Llamar directo</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 border-b border-steel-100 py-5 transition-colors hover:bg-steel-50"
                  >
                    <WhatsappLogo
                      size={19}
                      weight="light"
                      aria-hidden="true"
                      className="shrink-0 text-orange"
                    />
                    <span>
                      <span className="block text-[1.0625rem] font-medium text-steel-900">
                        WhatsApp
                      </span>
                      <span className="text-[0.8125rem] text-steel-500">
                        Se abre con el mensaje ya escrito
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={mailHref}
                    className="group flex items-center gap-4 border-b border-steel-100 py-5 transition-colors hover:bg-steel-50"
                  >
                    <EnvelopeSimple
                      size={19}
                      weight="light"
                      aria-hidden="true"
                      className="shrink-0 text-orange"
                    />
                    <span>
                      <span className="block text-[1.0625rem] font-medium text-steel-900">
                        {site.contacto.email}
                      </span>
                      <span className="text-[0.8125rem] text-steel-500">
                        Respuesta en horario hábil
                      </span>
                    </span>
                  </a>
                </li>
                <li className="flex items-start gap-4 border-b border-steel-100 py-5">
                  <MapPin
                    size={19}
                    weight="light"
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-orange"
                  />
                  <address className="not-italic">
                    <span className="block text-[1.0625rem] font-medium leading-snug text-steel-900">
                      {site.contacto.direccion.calle}, {site.contacto.direccion.detalle}
                    </span>
                    <span className="text-[0.8125rem] text-steel-500">
                      {site.contacto.direccion.ciudad}, {site.contacto.direccion.region}
                    </span>
                  </address>
                </li>
              </ul>
            </div>
          </Revelar>

          <Revelar delay={0.08}>
            <FormularioContacto />
          </Revelar>
        </div>
      </Contenedor>
    </section>
  );
}
