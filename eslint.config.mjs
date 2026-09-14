<<<<<<< HEAD
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
=======
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  eslintConfigPrettier,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
>>>>>>> d182303865c38616bb5da603164608a3e4eb865b
