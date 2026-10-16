// Punto de entrada para Setup Node.js App (CloudLinux / Passenger).
// Las noticias leen archivos relativos al directorio del proyecto.
process.chdir(__dirname);
process.env.NODE_ENV = process.env.NODE_ENV || "production";

const passenger = global.PhusionPassenger;
if (passenger) passenger.configure({ autoInstall: false });

const { createServer } = require("node:http");
const next = require("next");

const app = next({ dev: false, dir: __dirname });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res).catch((error) => {
      console.error("[AGS] Error al atender la solicitud:", error);
      if (!res.headersSent) {
        res.statusCode = 500;
        res.end("Error interno del servidor");
      } else {
        res.destroy();
      }
    });
  });

  server.on("error", (error) => {
    console.error("[AGS] No se pudo iniciar el servidor:", error);
    process.exit(1);
  });

  // Passenger asigna el socket. PORT solo se usa al ejecutar fuera de cPanel.
  if (passenger) {
    server.listen("passenger");
  } else {
    server.listen(Number(process.env.PORT || 3000), "127.0.0.1");
  }
}).catch((error) => {
  console.error("[AGS] No se pudo cargar Next.js. Revisa la compilación:", error);
  process.exit(1);
});
