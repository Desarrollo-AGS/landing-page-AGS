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
    ];
  },
};

export default nextConfig;
