# landing-page-AGS

Landing page de AGS Soluciones — "Servicios de Drones en Antofagasta". Next.js 16 (App Router), TypeScript, Tailwind CSS v4.

Especificación completa del proyecto en [`md/spec_landing_nextjs_ags_soluciones.md`](./md/spec_landing_nextjs_ags_soluciones.md).

## Desarrollo

```bash
npm run dev      # servidor de desarrollo (http://localhost:3000)
npm run build    # build de producción
npm run lint     # ESLint
npm run format   # Prettier (--write)
```

## Estado

**Sprint 0 — Fundación técnica y de marca:** completo.

- Proyecto Next.js con App Router, TypeScript, Tailwind CSS v4 y estructura de carpetas base (`app/`, `components/`, `data/`, `lib/`).
- Paleta de marca real extraída de `assets/logo-ags-color.svg` y `assets/logo-ags.svg` (naranja `#FF5500`), documentada en `tailwind.config.mts`.
- Imágenes reales optimizadas a WebP en `public/images/` (logos de clientes, imagen de "Nosotros", favicon multi-resolución en `app/`).
- Datos base tipados en `data/servicios.ts`, `data/casosExito.ts`, `data/clientes.ts`, `data/faq.ts`, con contenido real extraído de agssoluciones.cl.

Próximo: Sprint 1 — Layout base (Header, Footer, Navegación).
