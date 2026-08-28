# mediapila / drive

Hub de proyectos para el 2C 2026. Landing con un mosaico por grupo (TicketApp, ServiApp,
TaskBoard, DevMatch, AgendaApp, ChatApp, WeatherApp, SearchApp); cada uno lleva a una página
tipo README con la especificación completa (descripción, modelo de datos, endpoints
requeridos, entregables y criterios de evaluación).

Es un proyecto 100% frontend (no necesita backend propio): las specs viven en
`src/data/groups.js`.

## Correr en local

```bash
npm install
npm run dev
```

## Editar las specs

Todo el contenido de cada grupo está en un solo archivo: `src/data/groups.js`.
Cada grupo es un objeto con `descripcion`, `funcionalidades`, `modelos`, `endpoints`,
`entregables` y `stack`. Los criterios de evaluación comunes a todos los grupos están en
`evaluacionComun`, al final del mismo archivo. No hace falta tocar nada más para actualizar
texto, agregar un endpoint o sumar un modelo.

## Deploy (Vercel)

1. Subí esta carpeta a un repo de GitHub.
2. En vercel.com -> New Project -> importá el repo.
3. Framework preset: Vite. Build command: `npm run build`. Output: `dist`.
4. Deploy. Vercel te da un link público — es ese el que compartís con los grupos.

## Deploy (Netlify)

1. Subí esta carpeta a un repo de GitHub (o arrastrá la carpeta `dist` ya buildeada a
   app.netlify.com/drop para probar rápido sin repo).
2. Si conectás el repo: build command `npm run build`, publish directory `dist`.
3. Importante: como usa rutas de React Router (`/grupo/ticketapp`, etc.), agregá un
   archivo `public/_redirects` con esta línea para que no tire 404 al refrescar una
   sub-página:
   ```
   /*    /index.html   200
   ```

## Stack

React 19 + Vite + Tailwind CSS v4 + React Router.
