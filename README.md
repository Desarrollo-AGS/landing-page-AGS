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
    brand/                  logotipo, y el dron acompañante (ver sección 7)
    brochure/               librito del brochure (ver sección 8)
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

**Movimiento.** El dron acompañante, la marquesina de logos y los revelados al
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

## 7. El dron acompañante

El modelo 3D lo usan dos coreografías. **El inicio usa la de guion** (sección
8): el dron recorre las secciones y escanea sus componentes. La del
acompañante —un dron que navega por el margen derecho y, al llegar al titular
de cada sección, hace dos pasadas de inspección sobre el texto— sigue en
`DronAcompanante.tsx`, sin montarse hoy en ninguna página. Lo que sigue sobre
el modelo, la marca y el haz vale para las dos.

**El modelo es el real.** Es el DJI Matrice 400 exportado del CAD oficial de
DJI. El archivo venía en 1,29 MB con 113k triángulos; acá se simplificó al 30%
y se recomprimió con meshopt hasta **505 KB**, conservando la jerarquía de
nodos porque los cuatro rotores se animan por separado.

**Lleva el logotipo de AGS en los dos costados**, uno a cada lado del
fuselaje, como el equipo real (ver `AGS-36.jpg`). No va ni en el morro ni en la
cola. No es una textura del modelo: el `.glb` viene del CAD sin coordenadas UV,
así que son dos planos texturizados con `public/models/ags-marca.png` pegados a
la carcasa.

**Cuidado con el eje.** Los costados son las caras **+Z y -Z**, no +X y -X: el
pod es un bloque alargado a lo largo de X, así que +X y -X son el morro y la
cola. Dónde se pegan no está escrito a mano: se lanza un rayo desde fuera hacia
cada costado y la calcomanía se coloca en el primer impacto válido, filtrando
por subárbol (los brazos comparten material con la carcasa), por material
(descarta tren de aterrizaje y discos de hélice) y por normal (el pod está
facetado y el primer triángulo suele ser un chaflán).

**El haz sale del morro, y el morro mira lo que escanea.** El morro es el
extremo **+X**. El emisor va bajo la panza en ese extremo, centrado entre los
costados, como opera el equipo real, y su altura se mide al cargar con un rayo
hacia arriba contra la carcasa. En crucero el dron va en tres cuartos mirando a
la derecha; al fijar un titular gira hasta apuntar el morro al texto y lo baja
un poco mientras dura la pasada del sensor.

### Cómo está construido

| Archivo | Qué hace |
|---|---|
| `components/brand/DronAcompanante.tsx` | Solo decide si se monta. Nada más. |
| `components/brand/dron/condiciones.ts` | Cuándo se puede montar (movimiento, conexión, WebGL) y la espera a `load` + ocio. |
| `components/brand/dron/escena.ts` | Escena Three.js: modelo, materiales, luz de estudio, rotores, marcas y baliza del sensor. |
| `components/brand/dron/vuelo.ts` | El piloto: muelle, alabeo, cabeceo y rumbo. Compartido con la narrativa. |
| `components/brand/dron/haz.ts` | Cono, retícula y barrido del sensor, en SVG. Compartido con la narrativa. |
| `components/brand/dron/coreografia.ts` | A dónde va el acompañante: titulares y crucero, y el enganche al scroll. |

GSAP se ocupa de la coreografía —entrada, encendido del sensor, la línea de
tiempo del barrido, y ScrollTrigger para saber en qué sección va el lector— y
un muelle en el ticker se ocupa del vuelo.

El vuelo **no** es un tween: un tween a una posición fija se rompe apenas la
página se mueve, porque el titular objetivo se desplaza bajo el dron mientras
se scrollea. Cada cuadro se recalcula el destino y el dron persigue ese punto
con un muelle críticamente amortiguado. El alabeo y el cabeceo salen de la
velocidad del propio dron y de la del scroll, no de una animación aparte.

**El bucle no lee layout.** La medida del titular se toma en coordenadas de
documento al entrar en la etapa, y la posición en pantalla sale de restar el
scroll, que se lee una sola vez por cuadro antes de escribir nada.

### Agregar o quitar paradas

El dron inspecciona cualquier elemento con `data-dron-objetivo`. Hoy son los
seis titulares de sección de la portada. Para sumar una parada se le pone el
atributo al titular; para quitarla, se le saca. No hay una lista de posiciones
que mantener en ningún lado.

### Cuándo NO se monta

Ni Three.js ni GSAP entran en el bundle inicial: se importan de forma dinámica
y solo después de `load` y de que el hilo principal quede ocioso. Se descarta
por completo si hay `prefers-reduced-motion`, si el viewport está bajo 1024px,
si la conexión se declara medida o lenta, o si no hay WebGL. En móvil el modelo
no se descarga y el LCP no se mueve.

---

## 8. Coreografía del inicio y brochure

### El inicio: el dron recorre las secciones

Sobre las secciones de siempre corre una capa GSAP con el dron 3D como
protagonista. **No cambia textos ni orden**: cada sección lleva
`data-dron-escena` y el dron sigue un guion de poses por sección.

El recorrido es uno solo, de arriba abajo, y cada sección es un paso:

| # | Sección | Paso del dron | GSAP |
|---|---|---|---|
| 1 | Navbar | Aparece sobre el botón "Contáctanos", del ancho del botón, y lo escanea con barrido horizontal mirando a la izquierda. | — |
| 2 | Hero + franja de clientes | Sale en curva por encima del antetítulo hacia el costado izquierdo, y sigue bajando por la canaleta durante la franja de logos. El tramo se reparte entre las dos secciones a propósito: el banner mide una pantalla, y metiendo el viaje entero ahí el dron cruzaba la ventana de un tirón. | Al salir, el titular se aparta y el video se acerca. |
| 3 | Servicios | Fotogrametría sobre la foto fija: 12 waypoints en serpentina, con huella, destello y nube de puntos. El último disparo cae junto con el último servicio de la lista, y ahí se cierra la malla. | Parallax de la foto fija. |
| 4 | Faena | Se retira: el video queda solo. | La banda se fija bajo el navbar y se abre a sangre. |
| 5 | Casos | Vuelve y se sostiene sobre las cifras, escaneándolas. Cuando se van, baja por el costado derecho mirando a la izquierda. Las fichas NO se escanean. | Conteo de las cifras. |
| 6 | Software | Aterriza en el hueco entre las dos tarjetas: las hélices se frenan con el scroll hasta parar, y queda apoyado ahí mientras se sigue bajando al footer. | — |

**El scroll mueve el destino, no el dron.** Es la decisión que da el carácter.
Escribir la posición directa desde el progreso —un `scrub` sobre el canvas—
deja el dron pegado a la rueda del mouse: rígido, teletransportado, y cualquier
tirón del scroll se le nota. Acá el scroll mueve un destino y el dron lo
persigue con el muelle de `vuelo.ts`, así que llega y se asienta, alabea con su
propia velocidad y flota aunque nadie scrollee. Es la misma física del
acompañante de la sección 7, con otro guion.

El progreso del scroll sí decide **a dónde** va, qué escanea, cuánto mide y con
qué régimen giran los rotores: por eso al subir la coreografía se deshace en el
mismo orden, y por eso las hélices se detienen al aterrizar.

Aun con el muelle, cada sección **empieza donde terminó la anterior** (ver los
tramos de entrada en `accionesInicio.ts`): así el empalme se siente como un
tramo de vuelo y no como un salto que el muelle tiene que tapar.

| Archivo | Qué hace |
|---|---|
| `components/brand/DronNarrativo.tsx` | Monta UN canvas para toda la página y elige el guion por nombre. |
| `components/brand/dron/guionInicio.ts` | Las poses del dron en cada sección. |
| `components/brand/dron/accionesInicio.ts` | La operación de cada sección y sus efectos (fotogrametría, térmica, datos). |
| `components/brand/dron/coreografiaNarrativa.ts` | El motor: lee el guion, vuela con el piloto y dirige el sensor. |
| `components/home/animacionesInicio.ts` | La capa GSAP, bajo `gsap.matchMedia`. |
| `components/home/DirectorInicio.tsx` | Carga GSAP después de `load`, sin competir con el LCP. |

**Qué escanea.** Un elemento con `data-dron-haz` es objetivo del sensor: hoy,
las cifras de casos (el dron las escanea) y las tarjetas de software (le sirven
de referencia para aterrizar). El objetivo apuntado lleva `data-dron-escaneando`
mientras dura, que en `globals.css` le da la veladura naranja.

**Naturalidad.** El dron nunca está clavado: el modelo tiene su propia
flotación (`crearEscena` acepta `flotacion: 0` para apagarla, hoy sin uso) y el
destino lleva una deriva suave que se aquieta mientras captura y se apaga
cuando ya aterrizó.

**Una acción nueva.** Se agrega un objeto con `cuadro` (corrige pose, sensor
y objetivo) y, si dibuja efectos, `dibujar`, y se registra en
`accionesInicio` con el nombre de la escena. Solo corre mientras su sección
está activa.

**Sincronía.** La banda de faena se fija con un ScrollTrigger de id
`dron-faena`, y la coreografía lee ese progreso: el dron y la apertura de la
banda no pueden desfasarse. Si se cambia su duración, se revisa su guion.

**Cuándo no corre.** Con movimiento reducido no se arma nada: la portada queda
exactamente como sin animaciones. Bajo 1024px el dron no se monta (ver sección
7), pero sí la capa GSAP, que es liviana.

### El brochure: librito

`/nosotros/brochure` muestra el PDF `Brochure AGS 26'` como un librito que se
hojea (StPageFlip, paquete `page-flip`): arrastrando la esquina, con clic, con
las flechas del teclado, con los botones o desde las miniaturas. A doble página
desde ~960px de ancho de libro; en pantallas chicas, a una.

Las páginas del PDF son horizontales y a doble página el texto chico queda al
límite, así que hay **pantalla completa** y **Ampliar**, que abre las páginas
visibles a todo el ancho con la imagen de 2400px.

| Archivo | Qué hace |
|---|---|
| `public/brochure/pagina-NN.webp` y `-1200.webp` | Páginas del PDF, a 2400px y 1200px. |
| `content/brochure.ts` | Lista de páginas con título y texto alternativo, y datos de la contratapa. |
| `components/brochure/Librito.tsx` | El visor: hojeo, controles, miniaturas, pantalla completa y ampliación. |
| `types/page-flip.d.ts` | Tipos de la librería, que no trae los suyos. |

**Para actualizar el brochure** se reemplazan los archivos de
`public/brochure/` con los mismos nombres. La página 8 del PDF viene en blanco:
la contratapa es HTML y toma correo, teléfono y dirección de `site.ts`.

```bash
pdftoppm -f 1 -l 7 -scale-to-x 2400 -scale-to-y 1350 -png brochure.pdf p
cwebp -q 82 p-1.png -o public/brochure/pagina-01.webp
cwebp -q 80 -resize 1200 0 p-1.png -o public/brochure/pagina-01-1200.webp
```

---

## 9. Pendientes de AGS

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
| 11 | Año de fundación: el PDF del brochure (pág. 2) dice 2015, el sitio publica 2016 | `/nosotros`, `/nosotros/brochure` |
| 12 | Respaldo de "Certificación AOC de la DGAC y pilotos RPA autorizados" (PDF, pág. 6) | `/nosotros/certificaciones`, `/nosotros/brochure` |
| 13 | Decidir si Smart Inspections (PDF, pág. 5) se publica junto a SmartField y SmartLayout | `/software`, `/nosotros/brochure` |
| 14 | PDF del brochure corregido: la pág. 7 trae el teléfono obsoleto +56 9 8199 2658 | `/nosotros/brochure` |

Sobre el punto 9: esas tres marcas estaban entregadas solo en versión blanca
(para fondos oscuros) y eran invisibles sobre la franja clara. Se generó la
versión positiva invirtiendo la tinta y conservando el alfa, así que la silueta
es idéntica. Con los archivos a color oficiales, pasarían a color en el hover
como las otras cinco.

---

## 10. Video corporativo

El video que se usa hoy en el hero y en el bloque de faena es material real de
AGS: una operación de limpieza de fachada en faena minera activa. Sirve como
provisional y cumple el peso, pero el brief pide un video corporativo propio
(pendiente 3). Cuando llegue, se reemplazan los archivos en `public/videos/` y
el póster en `public/images/`, sin tocar código.
