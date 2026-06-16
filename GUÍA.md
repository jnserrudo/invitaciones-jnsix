# Guia Completa: Gestor de Invitaciones

## Indice
1. [Arquitectura de Componentes](#1-arquitectura-de-componentes)
2. [Personalizar Componentes](#2-personalizar-componentes)
3. [Cargar y Editar Invitaciones](#3-cargar-y-editar-invitaciones)
4. [Exportar JSON para Produccion](#4-exportar-json-para-produccion)
5. [Desplegar en Render](#5-desplegar-en-render)
6. [Compartir Invitaciones](#6-compartir-invitaciones)
7. [Troubleshooting](#7-troubleshooting)

---

## 1. Arquitectura de Componentes

Todo el flujo de una invitacion se renderiza con **componentes React**. No hay HTML estatico; cada seccion es un componente independiente que recibe datos y tema.

### Arbol de componentes

```
InvitacionPage (/invitacion/:slug)
├── StartScreen          <-- Pantalla "Toca para abrir"
├── MusicPlayer          <-- YouTube background music
├── Hero                 <-- Foto + titulo + subtitulo
├── Countdown            <-- Cuenta regresiva animada
├── FechaHora            <-- Fecha y horario del evento
├── Ubicacion            <-- Salon, direccion, boton Maps
├── Frase                <-- Texto emotivo
├── DressCode            <-- Codigo de vestimenta
├── Regalo               <-- Mensaje de regalo + alias
├── Confirmar            <-- Formulario -> WhatsApp
└── Footer               <-- Mensaje de cierre
```

### Datos que fluyen

1. **JSON estatico** (`public/invitaciones.json`) → contiene todas las invitaciones de produccion
2. **InvitacionPage** lee el slug de la URL, busca la invitacion en el JSON
3. **getTheme(config)** determina el tema (classic o warm)
4. Cada componente recibe `config` (datos) y `theme` (colores/fuentes)

### Componentes globales vs datos del JSON

**IMPORTANTE:** Hay dos tipos de componentes:

| Tipo | Componentes | Comportamiento |
|------|-------------|----------------|
| **Globales** | `StartScreen`, `MusicPlayer`, `Footer` | Mismo código para TODAS las invitaciones. Si modificás el .jsx, el cambio se ve en todas. |
| **Personalizables** | `Hero`, `FechaHora`, `Ubicacion`, `Frase`, `DressCode`, `Regalo`, `Confirmar` | Usan datos del JSON. Cada invitación puede tener valores diferentes. |

**Ejemplo:**
- Si cambias el texto en `StartScreen.jsx` de "Invitación Especial" a "Bienvenido", **todas** las invitaciones (Emilia, Sofia, etc.) van a mostrar "Bienvenido".
- Si cambias el `nombreEvento` en el JSON de Emilia de "EMILIA XV" a "EMILIA 15", **solo** la invitación de Emilia cambia.

### Temas disponibles

| Campo | Classic (Negro/Blanco) | Warm (Dorado/Champagne) |
|-------|------------------------|------------------------|
| `bgAccent` | `bg-black` | `bg-warm-brown` |
| `bgMain` | `bg-white` | `bg-warm-cream` |
| `textPrimary` | `text-black` | `text-warm-brown` |
| `textSecondary` | `text-gray-600` | `text-warm-dark` |
| `textOnAccent` | `text-white` | `text-white` |
| `fontHeading` | `font-cinzel` | `font-playfair` |
| `fontUi` | `font-inter` | `font-montserrat` |
| `border` | `border-gray-200` | `border-warm-gold/30` |

### Flujo visual

```
Usuario abre /invitacion/emilia-xv
        |
        v
InvitacionPage carga config desde JSON
        |
        v
theme = getTheme(config)  --> classic o warm
        |
        v
StartScreen aparece (fondo segun tema)
Usuario toca
        |
        v
MusicPlayer inicia + todos los componentes se renderizan con theme
```

---

## 2. Personalizar Componentes

### 2.1 Donde estan los componentes

```
src/components/Invitacion/
├── StartScreen.jsx
├── MusicPlayer.jsx
├── Hero.jsx
├── Countdown.jsx
├── FechaHora.jsx
├── Ubicacion.jsx
├── Frase.jsx
├── DressCode.jsx
├── Regalo.jsx
├── Confirmar.jsx
└── Footer.jsx
```

### 2.2 Como modificar un componente

**Ejemplo: Cambiar el texto de StartScreen**

```jsx
// src/components/Invitacion/StartScreen.jsx
<motion.p className={`${theme.fontHeading} ...`}>
  Te invitamos a participar   <-- Cambia este texto
</motion.p>
```

**Ejemplo: Agregar una nueva seccion**

1. Crear `src/components/Invitacion/MiSeccion.jsx`
2. Importarlo en `src/pages/InvitacionPage.jsx`
3. Agregarlo en el `<main>`:
```jsx
import MiSeccion from '../components/Invitacion/MiSeccion.jsx'
// ...
<MiSeccion config={config} theme={theme} />
```

### 2.3 Como cambiar colores de un tema

Editar `src/themes/config.js`:
```js
const themes = {
  classic: {
    bgAccent: 'bg-black',
    bgMain: 'bg-white',
    // ...
  },
  warm: {
    bgAccent: 'bg-warm-brown',
    // ...
  }
}
```

Las clases de color deben estar definidas en `tailwind.config.js` o usar colores de Tailwind directamente.

---

## 3. Cargar y Editar Invitaciones

### 3.1 Abrir el panel de admin

URL local: `http://localhost:5175/admin`
URL en Render: `https://tu-sitio.onrender.com/admin`

### 3.2 Ver invitaciones existentes

Las invitaciones que ves vienen del **localStorage** del navegador. Al cargar por primera vez, si el localStorage esta vacio, se copian automaticamente desde `public/invitaciones.json`.

### 3.3 Si no ves todas las invitaciones

Toca el boton **↻ Re-cargar desde invitaciones.json** (icono ambar en el header). Esto:
1. Lee el archivo `public/invitaciones.json`
2. Sobrescribe el localStorage con esos datos
3. Refresca la lista

### 3.4 Crear una nueva invitacion

1. Toca **+ Nueva**
2. Completa los campos:

| Campo | Que es | Ejemplo |
|-------|--------|---------|
| `slug` | Identificador unico para la URL | `sofia-xv` → URL: `/invitacion/sofia-xv` |
| `theme` | Tema visual | `classic` o `warm` |
| `nombreEvento` | Titulo principal | `Sofia` |
| `subtitulo` | Subtitulo | `MIS 15 AÑOS` |
| `fotoUrl` | URL directa de la imagen | `https://i.imgur.com/abc123.jpg` |
| `fechaHora` | Fecha ISO para countdown | `2025-12-15T21:30:00` |
| `horarioTexto` | Texto libre de horario | `DE 21:30 A 05:30 HS` |
| `nombreSalon` | Nombre del salon | `Salon Gran Coral` |
| `direccion` | Direccion | `Av. Libertador 1234` |
| `mapsUrl` | Link de Google Maps | `https://maps.google.com/...` |
| `frase` | Texto emotivo | `Una noche que jamas olvidare...` |
| `dressCode` | Codigo de vestimenta | `ELEGANTE` |
| `mensajeRegalo` | Mensaje sobre regalos | `Tu presencia es mi mejor regalo...` |
| `alias` | Alias para transferencia | `sofia.quince.2025` |
| `whatsapp` | Numero para confirmar | `5491122334455` |
| `mensajeConfirmacion` | Texto pre-llenado de WA | `Hola! Confirmo mi asistencia...` |
| `videoId` | ID de YouTube para musica | `dQw4w9WgXcQ` |

3. Toca **Guardar**

### 3.5 Editar una invitacion existente

1. En la lista del admin, toca el **lapiz** al lado de la invitacion
2. Modifica los campos
3. Guarda

### 3.6 Previsualizar

Toca el **ojo** para ver como queda la invitacion en un modal. Toca la X para cerrar.

### 3.7 Eliminar

Toca el **tacho** y confirma.

---

## 4. Exportar JSON para Produccion

### 4.1 Por que exportar?

El admin guarda en **localStorage** (solo tu navegador). Para que otros vean las invitaciones, necesitas generar el archivo `invitaciones.json` estatico.

### 4.2 Pasos

1. En el admin, toca el boton verde **↓ Exportar para deploy**
2. Se descarga un archivo `invitaciones.json`
3. Copialo y pegalo en `public/invitaciones.json` (sobrescribi el existente)
4. Listo. Ahora el build va a incluir todas las invitaciones.

### 4.3 Backup

- Toca **↓ Backup JSON** para descargar una copia de seguridad
- Toca **↑ Importar** para restaurar un backup

---

## 5. Desplegar en Render

### 5.1 Requisitos previos

- Cuenta en [render.com](https://render.com) (gratis)
- Tu codigo en GitHub/GitLab/Bitbucket (opcional pero recomendado)

### 5.2 Opcion A: Deploy desde GitHub (Recomendado)

1. Subi tu proyecto a GitHub
2. Entra a Render → **New +** → **Static Site**
3. Conecta tu repositorio
4. Configura:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
5. Toca **Create Static Site**
6. Render te da una URL tipo: `https://invitaciones-abc123.onrender.com`

Cada vez que hagas `git push`, Render recompila automaticamente.

### 5.3 Opcion B: Deploy manual (subir dist/)

1. Localmente, corré:
```bash
npm run build
```
2. Se genera la carpeta `dist/`
3. En Render → New → Static Site → **Upload folder**
4. Subi la carpeta `dist/`

### 5.4 IMPORTANTE: Re-emplazar JSON antes de deploy

Siempre antes de deployar:
1. Admin → Exportar para deploy
2. Copiar `invitaciones.json` a `public/`
3. `npm run build`
4. Deploy

---

## 6. Compartir Invitaciones

### 6.1 URL de cada invitacion

```
https://tu-sitio.onrender.com/invitacion/emilia-xv
https://tu-sitio.onrender.com/invitacion/sofia-xv
https://tu-sitio.onrender.com/invitacion/cumple-martin
```

### 6.2 Compartir por WhatsApp

Simplemente copia el link y mandalo. Al tocar, el invitado ve:
1. Pantalla "Toca para abrir"
2. Toca → musica + toda la invitacion

---

## 7. Troubleshooting

### "Veo en blanco o no se ven los cambios"
- No abras `index.html` directamente. Usa `http://localhost:5175/...`
- El servidor Vite debe estar corriendo (`npm run dev`)

### "No veo a Sofia en el admin"
- Toca el boton **↻ Re-cargar desde invitaciones.json**

### "Cambie un componente y no se ve"
- F5 en el navegador
- Si es en el preview del admin, cierra y vuelve a abrir el ojo

### "La foto no se ve"
- Asegurate de usar una **URL directa** que termine en `.jpg`, `.png`, etc.
- Imgur: click derecho en la imagen → "Copiar direccion de imagen"
- No uses Google Drive links sin convertirlos a directos

### "La musica no suena"
- El navegador bloquea audio automatico. Por eso existe StartScreen: el usuario debe tocar primero.
- Asegurate que el `videoId` de YouTube sea correcto

### "Build falla"
```bash
npm run build
```
Si hay errores, lee el mensaje. Tipicos:
- Falta cerrar una etiqueta JSX
- Variable no declarada
- Import faltante
