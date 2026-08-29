# mediapila / drive

Hub de proyectos para el 2C 2026. Landing con un mosaico por grupo (TicketApp, ServiApp,
TaskBoard, DevMatch, AgendaApp, ChatApp, DataApp, SearchApp); cada uno lleva a una página
tipo README con la especificación completa (descripción, modelo de datos, endpoints
requeridos, ideas de desarrollo, entregables y criterios de evaluación).

## Correr en local

```bash
pnpm install
pnpm run dev
```

## Editar las specs

El contenido de cada grupo vive en su propio archivo, dentro de `src/data/groups/`:

- `01-ticketapp.js`
- `02-serviapp.js`
- `03-taskboard.js`
- `04-devmatch.js`
- `05-agendaapp.js`
- `06-chatapp.js`
- `07-dataapp.js`
- `08-searchapp.js`

Cada uno exporta un objeto con `description`, `funcionalidades`, `modelos`, `endpoints`,
`ideas`, `entregables` y `stack`. Para actualizar texto, agregar un endpoint o sumar un
modelo de un grupo puntual, se edita solo ese archivo — no hace falta tocar nada más.

Los criterios de evaluación comunes a los 8 grupos están en `evaluacionComun.js`, dentro de
la misma carpeta. `index.js` junta los 8 archivos en un solo array (`groups`) y no necesita
editarse salvo que cambie el orden o se agregue/saque un grupo entero.

## Stack

React 19 + Vite + Tailwind CSS v4 + React Router. Gestor de paquetes: pnpm.
