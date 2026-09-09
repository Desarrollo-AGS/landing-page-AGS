# AGS Soluciones · sitio corporativo

Sitio multipágina de AGS Soluciones Industriales Aéreas, construido sobre el
brief `BRIEF-WEB-AGS.md` (v1.0, 9 de septiembre de 2026).

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Motion · Phosphor Icons.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de producción
npm run verificar  # desborde horizontal, accesibilidad y teclado (requiere dev corriendo)
```

---

## 1. Lo primero que hay que saber

### Los datos de contacto viven en UN solo archivo

`src/content/site.ts`. Teléfono, correo, dirección, redes y el enlace de
WhatsApp con su mensaje precargado salen todos de ahí. **No hay ningún dato de
contacto escrito dentro de un componente.** Si AGS cambia de número, se cambia
en ese archivo y se propaga a la barra superior, el footer, el botón flotante,
la página de contacto y los datos estructurados.

El número antiguo `+56 9 8199 2658` quedó obsoleto y no aparece en ninguna parte.

### Nada se publica con datos inventados

Tres bloques del sitio están deliberadamente incompletos, porque el contenido
real lo tiene que entregar AGS. Ninguno de ellos rellena con información
plausible: cada uno declara en pantalla que está pendiente.

| Dónde | Qué muestra hoy |
|---|---|
| `/nosotros/certificaciones` | La norma vigente (DAN 151, Edición 4) como contexto, y un aviso de "listado en preparación" con el canal para pedir la documentación. La tabla se llena editando `src/content/certificaciones.ts`. |
| `/software` y sus fichas | Marco de reserva con la proporción final de la captura. No hay una interfaz falsa dibujada con divs. |
| `/comunidad` | Las dos iniciativas con su texto; el bloque de fotos declara por qué no hay imágenes (autorización de menores en el caso del colegio AIS). |

En `/nosotros`, misión, visión e historia se maquetaron con el texto que hoy
publica AGS. Lo que **no** está verificado lleva una marca visible en pantalla:
se controla con el campo `verificado` en `src/content/nosotros.ts`. Cuando
llegue el texto definitivo, se cambia a `true` y el aviso desaparece solo.

---

## 2. Marca

El sistema de diseño está tomado del **Manual de Normas Gráficas AGS v. 2024**
(archivo `Manual de Normas Graficas_AGS.pdf` en `AGS-TEST1-landingPAge/`).

| Rol | Valor | Origen |
|---|---|---|
| Primario | `#FF5500` | Pantone Orange 021 C, manual 2.1 |
| Secundario | `#00263E` | Pantone 2965 C, manual 2.1 |
| Complementario | `#888B8D` | Pantone Cool Gray 8 C, manual 2.1 |
| Tipografía | Inter (Inter Tight en display) | Manual 3.1 |

Las versiones anteriores del sitio usaban `#0E2A47` como navy: era una
aproximación hecha sin acceso al manual. Acá se corrigió al valor oficial.

**Contraste del CTA.** El naranja de marca con texto blanco da 3,21:1 y reprueba
AA. En vez de oscurecer el color corporativo, el botón conserva el `#FF5500`
exacto y usa tinta navy: 4,86:1, aprueba AA, y es además el par de la señalética
industrial. Para texto naranja sobre blanco se usa `#C63F00` (5,11:1), definido
como `--color-orange-ink`.

**Forma.** Un solo sistema de radios: 2px en todo el sitio. El logotipo AGS es
completamente angular, así que redondear controles a 12-16px lo contradice. El
chaflán a 45° (`.chamfer`) es el eco del corte del logotipo y se reserva para
marcos de imagen y fichas de dato, nunca para controles.

Los archivos del logotipo se sirven tal cual, sin filtros CSS: solo se elige
entre la versión positiva y la negativa según el fondo.

---

## 3. Estructura

```
src/
  app/                      rutas (App Router)
    api/contacto/           recepción del formulario
    nosotros/               quiénes somos, misión, visión, historia
      certificaciones/      permisos, normas y certificaciones
    servicios/[slug]/       7 fichas
    software/[slug]/        SmartField y SmartLayout
    casos/  comunidad/  noticias/[slug]/  contacto/
    opengraph-image.tsx     imagen de compartido, generada en build
    sitemap.ts  robots.ts  not-found.tsx
  components/
    layout/                 barra superior, navbar, footer, botón WhatsApp
    home/                   secciones de la portada
    forms/                  formulario de contacto
    ui/                     botones, contenedor, fichas, revelado
    brand/                  logotipo y dron ambiental
  content/                  DATOS: site, servicios, casos, clientes, software,
                            comunidad, nosotros, certificaciones, noticias
  lib/                      navegación, SEO, esquema de validación
content/noticias/           artículos en markdown
scripts/verificar.mjs       chequeos automáticos
```

**El contenido está separado del layout.** Agregar un servicio, un caso, un
producto o una iniciativa de comunidad es agregar un objeto a un arreglo en
`src/content/`. La navegación, el footer, el sitemap y las páginas de detalle se
actualizan solos.

---

## 4. Publicar una noticia

1. Copia `content/noticias/_PLANTILLA.md` y renómbralo con el slug de la URL.
2. Completa el front matter y escribe el cuerpo en Markdown.
3. Deja la imagen de portada en `public/noticias/`.
4. Despliega.

No hay nada más que hacer: el índice, el bloque de la portada, el sitemap y las
etiquetas Open Graph se generan a partir de los archivos. Los archivos que
empiezan con guión bajo no se publican.

El índice se comporta bien con cero, una y veinte noticias, y el bloque de la
portada no se renderiza mientras no haya ninguna.

---

## 5. Formulario de contacto

Los envíos van a `servicios@agssoluciones.cl` a través de Resend. Requiere dos
variables de entorno (ver `.env.example`):

```
RESEND_API_KEY=
CONTACTO_REMITENTE="Web AGS <web@agssoluciones.cl>"
```

Si faltan, la ruta **no finge que envió**: responde 503 y el formulario muestra
un enlace `mailto:` con todo lo que la persona escribió ya redactado dentro, para
que no pierda su texto.

Protección anti-spam por campo trampa (honeypot), sin captcha visual. La
validación corre con el mismo esquema en cliente y servidor
(`src/lib/contactoSchema.ts`).

---

## 6. Rendimiento, accesibilidad y SEO

**Video del hero.** WebM 4,0 MB y MP4 4,9 MB, ambos bajo el techo de 8 MB del
brief. El elemento se monta después de `load` y de que el hilo principal quede
ocioso, así que la descarga nunca compite con el LCP.

No se carga en tres situaciones, y las tres están medidas, no supuestas:

- **`prefers-reduced-motion`** activo.
- **Conexión declarada como lenta** (`saveData`, o `effectiveType` 2g/3g).
- **Viewport bajo 768px.** Al montarse tarde, el `<video>` pinta su póster y se
  convierte en un candidato LCP nuevo: en perfil móvil (4G lento + CPU x4) el
  LCP saltaba de 1,2 s a 3,8 s, más casi 4 MB de datos móviles. En pantallas
  chicas el hero se queda en el póster, que es la misma imagen.

Medido sobre el build de producción:

| | LCP | CLS | Transferido |
|---|---|---|---|
| Móvil 390px, 4G lento (1,6 Mbps), CPU x4 | 1,22 s | 0,028 | 331 KB |
| Escritorio 1440px, 10 Mbps | 0,51 s | 0,028 | 4,4 MB (con video) |

Hay un control accesible de pausa, y su etiqueta se sincroniza con lo que el
video hace de verdad: si el navegador bloquea la reproducción automática, el
botón aparece en "reproducir" en vez de mentir.

**Movimiento.** El dron del hero, la marquesina de logos y los revelados al
scroll respetan `prefers-reduced-motion`. La franja de clientes no muestra una
marquesina detenida: cambia a grilla estática, igual que en móvil.

**Accesibilidad.** Salto al contenido como primer tabulador, foco visible en
todo el sitio, desplegables operables con Enter y Escape, errores de formulario
anunciados con `aria-live`, y textos alternativos que describen la imagen y no
el nombre del archivo. Todos los pares de color en uso se verificaron contra
WCAG AA.

**SEO.** Title, description, canonical y Open Graph por página. Datos
estructurados de organización con dirección y teléfono reales. `sitemap.xml` y
`robots.txt` generados desde los mismos datos que renderizan las páginas.
Las URLs `/casos-exito/*` del sitio WordPress redirigen a `/casos`.

`npm run verificar` comprueba, sobre las once páginas, que no haya scroll
horizontal entre 320 y 1920 px, que la accesibilidad básica esté correcta y que
los desplegables respondan al teclado.

---

## 7. Pendientes de AGS

Nada de esto bloquea el desarrollo, pero sí la publicación de la sección
correspondiente.

| # | Pendiente | Afecta |
|---|---|---|
| 1 | Lista de permisos, normas y certificaciones vigentes, con entidad emisora y vigencia | `/nosotros/certificaciones` |
| 2 | Textos definitivos de misión, visión e historia | `/nosotros` |
| 3 | Video corporativo e imagen póster propios del hero | Portada |
| 4 | Fotografías de comunidad y sus textos | `/comunidad` |
| 5 | Autorización escrita de uso de imágenes con menores del colegio AIS | `/comunidad` |
| 6 | Logo oficial de Aster y confirmación de autorización de uso | Footer |
| 7 | Capturas de SmartField y SmartLayout | `/software` |
| 8 | Fotografía por servicio (hoy solo hay material de la faena de limpieza) | `/servicios/*` |
| 9 | Archivos a color de Acciona, Ingeteam y Puerto Angamos | Franja de clientes |
| 10 | Definir qué se rescata de `ags-test2-landing.netlify.app` | — |

Sobre el punto 9: esas tres marcas estaban entregadas solo en versión blanca
(para fondos oscuros) y eran invisibles sobre la franja clara. Se generó la
versión positiva invirtiendo la tinta y conservando el alfa, así que la silueta
es idéntica. Con los archivos a color oficiales, pasarían a color en el hover
como las otras cinco.

---

## 8. Video corporativo

El video que se usa hoy en el hero y en el bloque de faena es material real de
AGS: una operación de limpieza de fachada en faena minera activa. Sirve como
provisional y cumple el peso, pero el brief pide un video corporativo propio
(pendiente 3). Cuando llegue, se reemplazan los archivos en `public/videos/` y
el póster en `public/images/`, sin tocar código.
