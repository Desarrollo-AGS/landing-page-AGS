/**
 * Verificación automática del sitio: desborde horizontal, accesibilidad básica
 * y navegación por teclado. Cubre los criterios transversales del brief que se
 * pueden comprobar sin abrir el navegador a mano.
 *
 *   npm run dev        (en otra terminal)
 *   npm run verificar
 *
 * Usa el Chrome instalado en el sistema, no descarga un navegador propio.
 * Si Chrome está en otra ruta, pásala en la variable CHROME_PATH.
 */

import puppeteer from "puppeteer-core";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const CHROME =
  process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const RUTAS = [
  "/",
  "/servicios",
  "/servicios/inspecciones-fotovoltaicas",
  "/nosotros",
  "/nosotros/certificaciones",
  "/software",
  "/software/smartfield",
  "/casos",
  "/comunidad",
  "/noticias",
  "/contacto",
];

// El brief pide probar entre 320 y 1920 px sin scroll horizontal.
const ANCHOS = [320, 390, 768, 1024, 1440, 1920];

const fallos = [];
const anotar = (msg) => fallos.push(msg);

const navegador = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars"],
});
const pagina = await navegador.newPage();

/* ---------------------------------------------------------------- */
/* 1. Sin desborde horizontal en ningún ancho                        */
/* ---------------------------------------------------------------- */
console.log("· Desborde horizontal (320-1920 px)");
for (const ruta of RUTAS) {
  for (const ancho of ANCHOS) {
    await pagina.setViewport({ width: ancho, height: 900 });
    await pagina.goto(BASE + ruta, { waitUntil: "networkidle2", timeout: 45000 });
    await new Promise((r) => setTimeout(r, 300));
    const exceso = await pagina.evaluate(() => {
      const de = document.documentElement;
      return de.scrollWidth - de.clientWidth;
    });
    if (exceso > 1) anotar(`desborde de ${exceso}px en ${ruta} a ${ancho}px`);
  }
}

/* ---------------------------------------------------------------- */
/* 2. Accesibilidad básica                                           */
/* ---------------------------------------------------------------- */
console.log("· Accesibilidad");
await pagina.setViewport({ width: 1280, height: 900 });
for (const ruta of RUTAS) {
  await pagina.goto(BASE + ruta, { waitUntil: "networkidle2" });
  const problemas = await pagina.evaluate(() => {
    const f = [];
    document.querySelectorAll("img").forEach((i) => {
      if (!i.hasAttribute("alt")) f.push(`imagen sin alt: ${i.src.split("/").pop()}`);
      else if (i.alt && /\.(webp|png|jpe?g|svg)$/i.test(i.alt))
        f.push(`el alt es un nombre de archivo: ${i.alt}`);
    });
    document.querySelectorAll("button, a").forEach((el) => {
      const texto = (el.textContent || "").trim();
      const etiqueta = el.getAttribute("aria-label") || el.getAttribute("title");
      if (!texto && !etiqueta)
        f.push(`${el.tagName} sin nombre accesible: ${String(el.className).slice(0, 40)}`);
    });
    const h1 = document.querySelectorAll("h1").length;
    if (h1 !== 1) f.push(`la página tiene ${h1} elementos h1`);
    const niveles = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map(
      (h) => +h.tagName[1],
    );
    for (let i = 1; i < niveles.length; i++)
      if (niveles[i] - niveles[i - 1] > 1)
        f.push(`salto de encabezado h${niveles[i - 1]} a h${niveles[i]}`);
    if (!document.documentElement.lang) f.push("falta el atributo lang");
    if (!document.title) f.push("falta el title");
    if (!document.querySelector('meta[name="description"]')?.content)
      f.push("falta la meta description");
    document.querySelectorAll("input:not([type=hidden]), select, textarea").forEach((el) => {
      const conLabel = el.id && document.querySelector(`label[for="${CSS.escape(el.id)}"]`);
      if (!conLabel && !el.getAttribute("aria-label"))
        f.push(`campo de formulario sin etiqueta: ${el.name || el.id}`);
    });
    return [...new Set(f)];
  });
  problemas.forEach((p) => anotar(`${ruta}: ${p}`));
}

/* ---------------------------------------------------------------- */
/* 3. Los desplegables del navbar responden al teclado (F-02)        */
/* ---------------------------------------------------------------- */
console.log("· Teclado en el navbar");
await pagina.goto(BASE + "/casos", { waitUntil: "networkidle2" });
const activo = () =>
  pagina.evaluate(() => ({
    texto: (document.activeElement.textContent || "").trim(),
    expandido: document.activeElement.getAttribute("aria-expanded"),
  }));

let llegoAlDisparador = false;
for (let i = 0; i < 16 && !llegoAlDisparador; i++) {
  await pagina.keyboard.press("Tab");
  llegoAlDisparador = (await activo()).texto.startsWith("Servicios");
}
if (!llegoAlDisparador) anotar("no se llega al menú Servicios con Tab");
else {
  await pagina.keyboard.press("Enter");
  await new Promise((r) => setTimeout(r, 250));
  if ((await activo()).expandido !== "true") anotar("Enter no abre el submenú Servicios");
  await pagina.keyboard.press("Tab");
  const dentro = (await activo()).texto;
  if (!dentro) anotar("Tab no entra a los enlaces del submenú");
  await pagina.keyboard.press("Escape");
  await new Promise((r) => setTimeout(r, 250));
  const tras = await activo();
  if (!tras.texto.startsWith("Servicios")) anotar("Escape no devuelve el foco al disparador");
  if (tras.expandido !== "false") anotar("Escape no cierra el submenú");
}

await navegador.close();

console.log("");
if (fallos.length === 0) {
  console.log("✓ Sin hallazgos.");
} else {
  console.log(`✗ ${fallos.length} hallazgo(s):`);
  fallos.forEach((f) => console.log("  - " + f));
  process.exitCode = 1;
}
