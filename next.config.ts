import type { NextConfig } from "next";

/**
 * Redirects 301 desde URLs del sitio WordPress actual (ticket 6.4).
 *
 * Los 7 mapeos de /servicio/[slug-antiguo]/ se verificaron uno por uno contra el
 * sitio en vivo (HTTP 200/301 real probado con curl, no adivinados) — los slugs
 * antiguos usan el patrón WordPress completo ("inspeccion-de-lineas-electricas"),
 * distinto de los slugs nuevos, más cortos.
 *
 * /casos-exito/[slug]/ NO necesita redirect: los slugs son idénticos entre el sitio
 * viejo y el nuevo (verificado tres veces — ticket 4.3, 6.3 y 6.4 — contra la
 * página de listado y el sitemap XML real del sitio) — la página ya existe en la
 * misma URL, no cambió de estructura.
 *
 * No hace falta declarar variantes "con slash final" (`/servicios/`, `/proyectos/`):
 * con `trailingSlash: false` (default), Next.js ya normaliza esas URLs a la versión
 * sin slash ANTES de evaluar `redirects()` — declarar ambas es código muerto que
 * nunca se dispara (verificado: `/servicios/` sí llega a destino, pero via un salto
 * extra por esa normalización interna, no por una regla explícita acá).
 */
const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Listado de servicios con anclas (#inspeccion-de-lineas-electricas, etc. en
      // el sitio viejo) — no tiene equivalente 1:1 en el sitio nuevo (no existe una
      // página agregadora /servicios/), redirige al preview de servicios en Home.
      {
        source: "/servicios",
        destination: "/#servicios",
        permanent: true,
      },

      // /servicio/[slug-antiguo]/ -> /servicios/[slug-nuevo]
      {
        source: "/servicio/produccion-audiovisual",
        destination: "/servicios/produccion-audiovisual",
        permanent: true,
      },
      {
        source: "/servicio/control-de-distribucion-de-riego-en-pilas-de-lixiviacion",
        destination: "/servicios/control-riego-pilas-lixiviacion",
        permanent: true,
      },
      {
        source: "/servicio/inspeccion-de-lineas-electricas",
        destination: "/servicios/inspeccion-lineas-electricas",
        permanent: true,
      },
      {
        source: "/servicio/inspeccion-de-instalaciones-industriales",
        destination: "/servicios/inspeccion-instalaciones-industriales",
        permanent: true,
      },
      {
        source: "/servicio/inspecciones-fotovoltaicas-para-cada-etapa-del-proyecto",
        destination: "/servicios/inspecciones-fotovoltaicas",
        permanent: true,
      },
      {
        source: "/servicio/topografia-con-drones-aerofotogrametria",
        destination: "/servicios/topografia-aerofotogrametria",
        permanent: true,
      },
      {
        source: "/servicio/limpieza-de-fachadas-y-maquinarias-con-drones",
        destination: "/servicios/limpieza-fachadas-maquinarias",
        permanent: true,
      },

      // /proyectos/ — URL real e indexada según el sitemap XML del sitio actual
      // (aunque hoy devuelve error 500 en el sitio viejo, ya roto). Mapeo de mejor
      // esfuerzo a Casos de Éxito por nombre/contexto — no hay forma de confirmar
      // su contenido original (la página está caída); validar con el cliente antes
      // de publicar si corresponde a otra sección.
      {
        source: "/proyectos",
        destination: "/#casos-exito",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
