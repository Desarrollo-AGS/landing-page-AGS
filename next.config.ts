import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Hay otros package-lock.json en carpetas hermanas del escritorio. Sin esto,
  // Turbopack elige la raíz equivocada y avisa en cada build.
  turbopack: { root: import.meta.dirname },
  images: {
    // AVIF primero: pesa ~30% menos que WebP en fotografía de terreno (cielo y
    // estructura metálica, mucho degradado suave). WebP queda como respaldo.
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Las URLs de casos del sitio WordPress actual están indexadas. No se pierden.
      { source: "/casos-exito", destination: "/casos", permanent: true },
      { source: "/casos-exito/:slug", destination: "/casos", permanent: true },

      // /servicios NO se redirige: la página existe y es la que linkean el
      // navbar, el footer y el sitemap. El redirect que había acá mandaba al
      // ancla del inicio porque en su momento no había índice de servicios;
      // hoy sí, y mantenerlo dejaba la página inalcanzable en español
      // mientras /en/servicios sí abría.

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

      // /proyectos/ — URL indexada del sitio viejo (hoy devuelve 500).
      {
        source: "/proyectos",
        destination: "/#casos-exito",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
