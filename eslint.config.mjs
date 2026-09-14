import next from "eslint-config-next";

/**
 * Next 16 quitó el comando `next lint`, así que la configuración vive acá y se
 * corre con la CLI de ESLint (`npm run lint`). `eslint-config-next` v16 ya
 * publica configuración plana, sin necesidad de `FlatCompat`.
 */
const config = [
  { ignores: [".next/**", "node_modules/**", "out/**", "next-env.d.ts"] },
  ...next,
  {
    rules: {
      // El proyecto usa `console.warn` a propósito para avisos de integración
      // (carga del modelo del dron, envío del formulario). Un `console.log`
      // suelto sí es un descuido.
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
];

export default config;
