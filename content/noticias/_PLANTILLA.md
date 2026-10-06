---
titulo: "Título de la noticia, tal como se lee en la tarjeta y en la pestaña"

# El tag distingue qué es cada entrada dentro de la misma sección. Hoy hay
# dos: "noticia" (el valor por defecto, se puede omitir) y "comunidad". Para
# agregar uno nuevo, basta con declararlo acá y poner su etiqueta visible en
# `noticias.tags` de los dos diccionarios de `src/content/i18n/`.
tag: "noticia"

# OPCIONAL. Sin fecha, la tarjeta no muestra ninguna y la entrada se ordena
# después de las fechadas. Es lo correcto para una iniciativa en curso, que no
# es un hecho de un día: mejor sin fecha que con una inventada.
fecha: "2026-09-09"
resumen: "Dos líneas que resumen la noticia. Es lo que se muestra en la tarjeta del índice y lo que LinkedIn usa como descripción al compartir el enlace."
portada: "/noticias/nombre-de-la-imagen.webp"
portadaAlt: "Descripción real de lo que se ve en la imagen, no el nombre del archivo."
autor: "AGS Soluciones"

# OPCIONAL — varias fotos. Con dos o más se arma un mosaico; con una sola,
# la portada se muestra a lo ancho como siempre. La primera es la que manda.
# Si no se declara, la portada hace de galería.
galeria:
  - src: "/noticias/nombre-de-la-imagen.webp"
    alt: "Descripción real de lo que se ve."
  # `encaje: "contener"` para lo que NO es una fotografía —un logotipo, una
  # captura de pantalla—: entra entero en el marco en vez de recortarse.
  - src: "/noticias/un-logotipo.webp"
    alt: "Descripción real de lo que se ve."
    encaje: "contener"

# OPCIONAL — la publicación original, cuando la noticia salió primero en otra
# parte. Aparece al final del artículo, después del cuerpo.
fuente:
  medio: "LinkedIn"
  autor: "Quién lo publicó, si no fue AGS"
  url: "https://..."
---

Para publicar una noticia:

1. Copia este archivo dentro de `content/noticias/`.
2. Renómbralo con el slug que quieras en la URL. `nueva-planta-taltal.md` queda
   publicado en `/noticias/nueva-planta-taltal`.
3. Completa el bloque de arriba (el "front matter", entre las dos líneas de
   guiones) y escribe el cuerpo del artículo acá abajo.
4. Deja las imágenes en `public/noticias/`, en WebP. Las fotos de cámara pesan
   decenas de MB: conviene convertirlas antes (`cwebp -q 80`, a 2000px de
   ancho basta de sobra).
5. Despliega. No hay nada más que hacer: el índice, el bloque del home, el
   sitemap y las etiquetas Open Graph se actualizan solos.

Los archivos cuyo nombre empieza con guión bajo, como este, no se publican.

## Para publicarla también en inglés

Crea un segundo archivo con el mismo slug y `.en.md`:
`nueva-planta-taltal.en.md`. Solo necesita declarar **lo que cambia** —título,
resumen, textos alternativos y el cuerpo—; la fecha, las imágenes y la fuente
se toman del archivo en español.

Sin ese archivo la noticia igual se ve en `/en/noticias`, pero en español y con
un aviso que lo dice, y el sitemap publica solo la URL en español para no
ofrecerle a Google dos direcciones con el mismo texto.

## Los subtítulos se escriben así

El cuerpo admite **negrita**, [enlaces](https://agssoluciones.cl), listas y
citas. Formato Markdown estándar.

- Un punto de una lista
- Otro punto

> Una cita destacada, si el artículo la necesita.

Si la nota viene de una publicación de redes, conviene dejar **cada frase en su
propio párrafo**, como estaba en el original: la primera se compone más grande,
a modo de entradilla.
