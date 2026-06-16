# Gestor de Invitaciones - Guia Completa

Aplicacion web para crear y gestionar invitaciones de eventos (15 anos, bodas, cumpleanos, etc.). SPA sin backend: los datos se almacenan en un archivo JSON estatico.

---

## 1. Arquitectura: como funciona

Este proyecto tiene **dos modos de datos**:

| Modo | Donde se guarda | Para que sirve |
|---|---|---|
| **localStorage** | Navegador (temporal) | Panel de admin: crear, editar, borrar invitaciones |
| **invitaciones.json** | Archivo estatico en `public/` | Produccion: las invitaciones que ven los invitados |

**Flujo completo:**
```
Admin (localStorage) --> Exportar JSON --> Reemplazar public/invitaciones.json --> Build --> Deploy
```

---

## 2. Panel de Admin (/admin)

### 2.1 Acceder
Abri `http://localhost:5175/admin` (en local) o `https://tusitio.com/admin` (en produccion).

### 2.2 Crear una nueva invitacion
1. Toca el boton **"+ Nueva invitacion"**.
2. Completa los campos:

| Campo | Que va | Ejemplo |
|---|---|---|
| **Slug** | Identificador unico para la URL. Solo letras, numeros y guiones. | `emilia-xv` |
| **Tema** | Estilo visual: `classic` (blanco/negro) o `warm` (dorado/champagne) | `warm` |
| **Nombre del evento** | Titulo grande que se muestra en la foto | `SOFIA XV` |
| **Subtitulo** | Texto chico arriba del titulo | `LET'S PARTY` |
| **Foto URL** | Link directo a la imagen principal (ver seccion 3) | `https://.../foto.jpg` |
| **Fecha y hora** | Fecha del evento (formato ISO) | `2027-03-15T20:00` |
| **Horario texto** | Como se muestra el horario | `DE 20:00 A 04:00 HS` |
| **Nombre del salon** | Nombre del lugar | `PALACIO SAN MIGUEL` |
| **Direccion** | Direccion completa | `BELGRANO 1250, SAN MIGUEL` |
| **Link Google Maps** | URL compartir de Maps | `https://maps.app.goo.gl/...` |
| **Frase emotiva** | Texto de la seccion de frase | `Hay momentos irrepetibles...` |
| **Dress code** | Codigo de vestimenta | `ELEGANTE` |
| **Mensaje regalo** | Texto sobre el regalo/alias | `Mi mejor regalo es tu presencia...` |
| **Alias label** | Etiqueta del alias | `MI ALIAS:` |
| **Alias** | Alias de Mercado Pago / transferencia | `SOFIA.XV` |
| **WhatsApp** | Numero de telefono (solo numeros) | `5491161234567` |
| **Mensaje confirmacion** | Plantilla del mensaje de WA | `Hola! Soy *{{nombre}}*...` |
| **Video ID** | ID del video de YouTube para la musica | `dQw4w9WgXcQ` |

3. Toca **"Guardar"**.

La invitacion queda guardada en el `localStorage` de tu navegador. **Solo vos la ves.**

### 2.3 Editar una invitacion existente
En la tabla del admin, toca el icono del **lapiz** (Editar) al lado de la invitacion. Se abre el formulario con los datos cargados. Modifica y guarda.

### 2.4 Previsualizar
Toca el icono del **ojo** (Ver) para abrir una vista previa sin salir del admin.

### 2.5 Eliminar
Toca el icono del **tacho** (Eliminar).

---

## 3. Imagenes: como adjuntar fotos

**Importante:** Este proyecto NO tiene servidor para subir archivos. Las imagenes deben estar **online con un link directo**.

### Opcion A: Google Drive (gratis)
1. Subi la foto a Google Drive.
2. Click derecho > "Compartir" > "Cambiar a cualquiera con el enlace".
3. Copia el link (ej: `https://drive.google.com/file/d/ABC123/view`).
4. Convertilo a link directo con alguna herramienta online (busca "google drive direct link generator").
5. El link directo se ve asi: `https://drive.google.com/uc?export=view&id=ABC123`
6. Pegalo en el campo **Foto URL** del formulario.

### Opcion B: Imgur (gratis, mas facil)
1. Andá a [imgur.com](https://imgur.com).
2. Subi la foto (sin crear cuenta).
3. Click derecho en la imagen > "Copiar direccion de imagen".
4. Pegalo en el campo **Foto URL**.

### Opcion C: Cloudinary (recomendado para produccion)
1. Crea cuenta gratis en [cloudinary.com](https://cloudinary.com).
2. Subi la imagen.
3. Copia la URL de entrega (delivery URL).
4. Pegala en el campo **Foto URL**.

**Tip:** Si la foto no carga, fijate que el link termine en `.jpg`, `.png`, `.webp`, o sea una URL directa de imagen (no una pagina web).

---

## 4. Temas disponibles

Cada invitacion puede tener su propio tema visual.

| Tema | Colores | Fuentes | Para que evento |
|---|---|---|---|
| **classic** | Negro / Blanco / Gris | Cinzel + Cormorant + Inter | 15 anos, bodas elegantes |
| **warm** | Champagne / Dorado / Marron | Playfair Display + Cormorant + Montserrat | 15 anos, bodas calidas |

Cambialo en el campo **Tema** del formulario de admin.

---

## 5. Musica de fondo

El campo **Video ID** acepta el ID de un video de YouTube. Por ejemplo:
- URL completa: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- Video ID: `dQw4w9WgXcQ`

La musica se reproduce automaticamente despues de que el invitado toca "Ingresar" en la pantalla inicial.

**Para encontrar musica sin copyright:**
- YouTube Audio Library
- Busca "no copyright music" en YouTube

---

## 6. Exportar para produccion (Deploy)

Cuando termines de crear/editar invitaciones en el admin, tenes que **exportar los datos al archivo estatico**.

### Paso 1: Exportar JSON
En el panel de admin, toca el boton verde **"Exportar para deploy"**. Se descarga un archivo `invitaciones.json`.

### Paso 2: Reemplazar el archivo
1. Copia el archivo descargado.
2. Pegalo en `c:\jnserrudo\nahuel_dev\Invitaciones\gestor-invitaciones-web\public\invitaciones.json` (sobrescribi el existente).

### Paso 3: Build
```bash
cd c:\jnserrudo\nahuel_dev\Invitaciones\gestor-invitaciones-web
npm run build
```

Esto genera la carpeta `dist/` con la aplicacion lista para subir.

---

## 7. Deploy en Render

### Opcion A: Manual (Drag & Drop)
1. Andá a [render.com](https://render.com) e inicia sesion.
2. Click en **"New"** > **"Static Site"**.
3. Nombre: `invitaciones`.
4. Build command: (dejar vacio, ya esta buildeado).
5. Publish directory: `dist`.
6. Subi el contenido de la carpeta `dist/` (como zip o con Git).
7. Toca **"Create Static Site"**.

### Opcion B: Con Git (recomendado)
1. Subi este proyecto a un repo de GitHub.
2. En Render: **New** > **Static Site** > conecta tu repo de GitHub.
3. Build command: `npm install && npm run build`
4. Publish directory: `dist`
5. Toca **"Create Static Site"**.

**Cada vez que hagas cambios:**
1. Exporta el JSON desde el admin.
2. Reemplaza `public/invitaciones.json`.
3. Hace `git commit` y `git push`.
4. Render se redeploya automaticamente.

### URL de tu sitio
Render te da una URL tipo:
```
https://invitaciones-abc123.onrender.com
```

Las invitaciones se acceden asi:
```
https://invitaciones-abc123.onrender.com/invitacion/emilia-xv
https://invitaciones-abc123.onrender.com/invitacion/sofia-xv
https://invitaciones-abc123.onrender.com/admin
```

---

## 8. Compartir el enlace

Una vez deployado, simplemente comparti el link directo de la invitacion:

```
https://invitaciones-abc123.onrender.com/invitacion/sofia-xv
```

Los invitados abren el link en su celular, tocan "Ingresar", y ven toda la invitacion con musica, animaciones, y pueden confirmar por WhatsApp.

**Para compartir por WhatsApp / Instagram:**
- Copia el link directo de la invitacion.
- Pegalo en el mensaje o la bio.

---

## 9. Backup y recuperacion

### Exportar backup
En el admin, toca el boton **"Exportar backup"**. Se descarga un JSON con fecha incluida.

### Importar backup
En el admin, toca **"Importar"**, selecciona un archivo `.json` de backup, y toca **"Cargar"**. Se restauran todas las invitaciones.

**Recomendacion:** Exporta backup cada vez que hagas cambios importantes.

---

## 10. Scripts utiles

```bash
# Modo desarrollo (hot reload)
npm run dev

# Build de produccion (genera dist/)
npm run build

# Previsualizar el build local
npm run preview
```

---

## 11. Estructura del proyecto

```
gestor-invitaciones-web/
  public/
    invitaciones.json          <-- Aca van los datos de produccion
  src/
    pages/
      AdminPage.jsx            <-- Panel de admin
      InvitacionPage.jsx       <-- Pagina de invitacion
    components/
      Invitacion/
        Hero.jsx               <-- Foto principal
        Countdown.jsx          <-- Contador regresivo
        FechaHora.jsx          <-- Fecha y horario
        Ubicacion.jsx          <-- Salon y maps
        Frase.jsx              <-- Frase emotiva
        DressCode.jsx          <-- Codigo de vestimenta
        Regalo.jsx             <-- Alias / regalo
        Confirmar.jsx          <-- Confirmar por WhatsApp
        Footer.jsx             <-- Pie de pagina
        MusicPlayer.jsx        <-- Musica de fondo
        StartScreen.jsx        <-- Pantalla de inicio
    themes/
      config.js                <-- Configuracion de temas
    data/
      storage.js               <-- Funciones de localStorage
  dist/                         <-- Carpeta generada por el build (para subir a Render)
```

---

## 12. Stack tecnico

- **React 19** + **Vite 8**
- **Tailwind CSS v4**
- **react-router-dom** (rutas SPA)
- **framer-motion** (animaciones)
- **date-fns** (formateo de fechas)
- **lucide-react** (iconos)
- YouTube IFrame API (musica)

---

## 13. Solucion de problemas

| Problema | Solucion |
|---|---|
| La foto no se ve | Verifica que sea una URL directa (termina en .jpg/.png) |
| La musica no suena | Verifica que el Video ID sea correcto y el video no tenga restricciones |
| No encuentro una invitacion | Fijate que el `slug` coincida exactamente en la URL |
| Cambios del admin no se ven online | Recorda: exportar JSON -> reemplazar en public/ -> build -> deploy |
| Render no encuentra rutas | En Render, configura un **redirect/catch-all** a `index.html` |

---

Hecho con para eventos inolvidables.
