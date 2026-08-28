// Specs actualizadas — 2C 2026
// Ahora se exige backend propio (Express + MongoDB + Mongoose) además del frontend en React.
// accent: "magenta" | "cyan" | "violet" — se asigna cíclicamente en Home, pero queda fijo acá
// para que la portada de cada grupo sea siempre la misma.

export const groups = [
    {
        id: "ticketapp",
        numero: 1,
        slug: "ticketapp",
        name: "TicketApp",
        accent: "magenta",
        tagline: "Venta y gestión de entradas para eventos",
        branch: "feature/ticketapp-backend",
        description:
            "Plataforma para publicar eventos y vender entradas online. El público navega eventos disponibles, ve el detalle y reserva entradas. Quien organiza gestiona sus eventos y controla el cupo desde un panel propio.",
        funcionalidades: [
            "Listado público de eventos con imagen, fecha, lugar y precio",
            "Detalle de evento con selector de cantidad de entradas",
            "Reserva de entradas validando cupo disponible en el momento de confirmar",
            "Panel de organizador: alta, edición y baja de eventos",
            "Panel de organizador: listado de reservas por evento",
        ],
        modelos: [
            {
                nombre: "Evento",
                campos: [
                    "titulo: String, requerido",
                    "descripcion: String",
                    "fecha: Date, requerido",
                    "lugar: String, requerido",
                    "precio: Number, requerido",
                    "cupoTotal: Number, requerido",
                    "cupoDisponible: Number (se recalcula con cada reserva)",
                    "imagenUrl: String",
                ],
            },
            {
                nombre: "Reserva",
                campos: [
                    "evento: ObjectId → ref 'Evento', requerido",
                    "nombreComprador: String, requerido",
                    "email: String, requerido",
                    "cantidadEntradas: Number, requerido",
                    "fechaReserva: Date, default Date.now",
                    "estado: String, enum ['confirmada','cancelada'], default 'confirmada'",
                ],
            },
        ],
        endpoints: [
            { metodo: "GET", ruta: "/api/eventos", desc: "Lista todos los eventos" },
            { metodo: "GET", ruta: "/api/eventos/:id", desc: "Detalle de un evento" },
            { metodo: "POST", ruta: "/api/eventos", desc: "Crea un evento (organizador)" },
            { metodo: "PUT", ruta: "/api/eventos/:id", desc: "Edita un evento" },
            { metodo: "DELETE", ruta: "/api/eventos/:id", desc: "Elimina un evento" },
            { metodo: "POST", ruta: "/api/reservas", desc: "Crea una reserva y descuenta cupo" },
            { metodo: "GET", ruta: "/api/reservas/evento/:eventoId", desc: "Lista reservas de un evento" },
            { metodo: "PUT", ruta: "/api/reservas/:id/cancelar", desc: "Cancela reserva y repone cupo" },
        ],
        entregables: [
            "Repositorio backend (Express + Mongoose) con rutas separadas de controladores",
            "Repositorio o carpeta frontend (React) consumiendo la API con fetch/axios",
            "Variables de entorno para la URL del backend (nada de localhost hardcodeado)",
            "README con instrucciones de instalación, variables de entorno y link de deploy",
        ],
        stack: ["React (Vite)", "Node.js + Express", "MongoDB + Mongoose", "Deploy: Render/Railway + Netlify/Vercel + Atlas"],
    },
    {
        id: "serviapp",
        numero: 2,
        slug: "serviapp",
        name: "ServiApp",
        accent: "cyan",
        tagline: "Conectá clientes con profesionales de oficios",
        branch: "feature/serviapp-backend",
        description:
            "Directorio de profesionales de oficios (plomería, electricidad, gasista, etc.) donde clientes buscan por zona y especialidad, y envían solicitudes de trabajo que el profesional gestiona desde su propio panel.",
        funcionalidades: [
            "Buscador de profesionales con filtro por oficio y zona",
            "Ficha de profesional con calificación promedio y disponibilidad",
            "Formulario de solicitud de servicio hacia un profesional puntual",
            "Panel del profesional: ver solicitudes recibidas y cambiar su estado",
            "Estados de solicitud: pendiente → aceptada → completada (o cancelada)",
        ],
        modelos: [
            {
                nombre: "Profesional",
                campos: [
                    "nombre: String, requerido",
                    "oficio: String, requerido",
                    "zona: String, requerido",
                    "descripcion: String",
                    "calificacionPromedio: Number, default 0",
                    "disponible: Boolean, default true",
                ],
            },
            {
                nombre: "Solicitud",
                campos: [
                    "profesional: ObjectId → ref 'Profesional', requerido",
                    "clienteNombre: String, requerido",
                    "clienteContacto: String, requerido",
                    "descripcionProblema: String, requerido",
                    "fecha: Date, default Date.now",
                    "estado: String, enum ['pendiente','aceptada','completada','cancelada'], default 'pendiente'",
                ],
            },
        ],
        endpoints: [
            { metodo: "GET", ruta: "/api/profesionales", desc: "Lista con filtros ?oficio= &zona=" },
            { metodo: "GET", ruta: "/api/profesionales/:id", desc: "Ficha de un profesional" },
            { metodo: "POST", ruta: "/api/profesionales", desc: "Alta de profesional" },
            { metodo: "POST", ruta: "/api/solicitudes", desc: "Crea una solicitud" },
            { metodo: "GET", ruta: "/api/solicitudes/profesional/:id", desc: "Solicitudes de un profesional" },
            { metodo: "PUT", ruta: "/api/solicitudes/:id/estado", desc: "Actualiza el estado de una solicitud" },
        ],
        entregables: [
            "Backend con validación de datos (oficio y zona obligatorios) y manejo de errores",
            "Frontend con filtros que disparen fetch al backend (no filtrado solo en el cliente)",
            "Variables de entorno para la URL del backend",
            "README con instrucciones de instalación, variables de entorno y link de deploy",
        ],
        stack: ["React (Vite)", "Node.js + Express", "MongoDB + Mongoose", "Deploy: Render/Railway + Netlify/Vercel + Atlas"],
    },
    {
        id: "taskboard",
        numero: 3,
        slug: "taskboard",
        name: "TaskBoard",
        accent: "violet",
        tagline: "Tablero Kanban con columnas y tareas persistentes",
        branch: "feature/taskboard-backend",
        description:
            "Tablero estilo Trello con columnas y tareas. A diferencia de la versión con localStorage, ahora el orden de columnas y tareas, y los movimientos entre columnas, se persisten en la base de datos.",
        funcionalidades: [
            "Crear, renombrar y eliminar columnas",
            "Crear tareas dentro de una columna con título, descripción, prioridad y fecha límite",
            "Arrastrar y soltar tareas entre columnas (drag and drop)",
            "El orden de tareas y columnas se guarda en el backend, no solo en el estado local",
            "Modal de detalle de tarea con edición completa",
        ],
        modelos: [
            {
                nombre: "Columna",
                campos: [
                    "nombre: String, requerido",
                    "orden: Number, requerido",
                ],
            },
            {
                nombre: "Tarea",
                campos: [
                    "columna: ObjectId → ref 'Columna', requerido",
                    "titulo: String, requerido",
                    "descripcion: String",
                    "prioridad: String, enum ['baja','media','alta'], default 'media'",
                    "fechaLimite: Date",
                    "orden: Number, requerido",
                ],
            },
        ],
        endpoints: [
            { metodo: "GET", ruta: "/api/columnas", desc: "Lista columnas con sus tareas (populate)" },
            { metodo: "POST", ruta: "/api/columnas", desc: "Crea una columna" },
            { metodo: "PUT", ruta: "/api/columnas/:id", desc: "Renombra/reordena una columna" },
            { metodo: "DELETE", ruta: "/api/columnas/:id", desc: "Elimina columna y sus tareas" },
            { metodo: "POST", ruta: "/api/tareas", desc: "Crea una tarea" },
            { metodo: "PUT", ruta: "/api/tareas/:id", desc: "Edita una tarea" },
            { metodo: "PATCH", ruta: "/api/tareas/:id/mover", desc: "Cambia columna y/o posición de una tarea" },
            { metodo: "DELETE", ruta: "/api/tareas/:id", desc: "Elimina una tarea" },
        ],
        entregables: [
            "Backend con endpoint específico para mover tareas (no reescribir todo el tablero)",
            "Frontend con drag and drop (librería a elección) que llame a /mover al soltar",
            "Manejo de estado optimista o de carga mientras se confirma el movimiento",
            "README con instrucciones de instalación, variables de entorno y link de deploy",
        ],
        stack: ["React (Vite)", "Node.js + Express", "MongoDB + Mongoose", "Deploy: Render/Railway + Netlify/Vercel + Atlas"],
    },
    {
        id: "devmatch",
        numero: 4,
        slug: "devmatch",
        name: "DevMatch",
        accent: "cyan",
        tagline: "Armá equipo para tu proyecto o sumate a uno",
        branch: "feature/devmatch-backend",
        description:
            "Plataforma para armar equipos de desarrollo. Cualquiera puede publicar un proyecto buscando ciertas tecnologías, y otros perfiles se postulan. El autor del proyecto acepta o rechaza postulaciones.",
        funcionalidades: [
            "Crear perfil personal con stack, nivel y disponibilidad",
            "Publicar un proyecto indicando stack buscado y cupos",
            "Explorar proyectos con filtro por tecnología",
            "Postularse a un proyecto con un mensaje breve",
            "Panel del autor: ver postulantes y aceptar/rechazar",
        ],
        modelos: [
            {
                nombre: "Perfil",
                campos: [
                    "nombre: String, requerido",
                    "stack: [String]",
                    "nivel: String, enum ['inicial','intermedio','avanzado']",
                    "disponibilidad: String",
                    "bio: String",
                ],
            },
            {
                nombre: "Proyecto",
                campos: [
                    "titulo: String, requerido",
                    "descripcion: String, requerido",
                    "stackBuscado: [String]",
                    "cupos: Number, requerido",
                    "autor: ObjectId → ref 'Perfil', requerido",
                ],
            },
            {
                nombre: "Postulacion",
                campos: [
                    "proyecto: ObjectId → ref 'Proyecto', requerido",
                    "perfil: ObjectId → ref 'Perfil', requerido",
                    "mensaje: String",
                    "estado: String, enum ['pendiente','aceptada','rechazada'], default 'pendiente'",
                ],
            },
        ],
        endpoints: [
            { metodo: "GET", ruta: "/api/proyectos", desc: "Lista con filtro ?stack=" },
            { metodo: "POST", ruta: "/api/proyectos", desc: "Crea un proyecto" },
            { metodo: "POST", ruta: "/api/perfiles", desc: "Crea un perfil" },
            { metodo: "POST", ruta: "/api/postulaciones", desc: "Postula un perfil a un proyecto" },
            { metodo: "GET", ruta: "/api/postulaciones/proyecto/:id", desc: "Postulantes de un proyecto" },
            { metodo: "PUT", ruta: "/api/postulaciones/:id/estado", desc: "Acepta o rechaza una postulación" },
        ],
        entregables: [
            "Backend con relaciones pobladas (populate) entre proyecto, perfil y postulación",
            "Frontend con filtro por stack conectado a la query del backend",
            "Validación: no permitir postularse dos veces al mismo proyecto con el mismo perfil",
            "README con instrucciones de instalación, variables de entorno y link de deploy",
        ],
        stack: ["React (Vite)", "Node.js + Express", "MongoDB + Mongoose", "Deploy: Render/Railway + Netlify/Vercel + Atlas"],
    },
    {
        id: "agendaapp",
        numero: 5,
        slug: "agendaapp",
        name: "AgendaApp",
        accent: "violet",
        tagline: "Reserva de turnos sin superposición de horarios",
        branch: "feature/agendaapp-backend",
        description:
            "Sistema de turnos para uno o varios recursos (profesionales, canchas, consultorios). El backend es responsable de no permitir dos turnos superpuestos para el mismo recurso.",
        funcionalidades: [
            "Listado de recursos disponibles",
            "Ver horarios disponibles de un recurso para una fecha dada",
            "Reservar un turno validando que no se superponga con uno existente",
            "Panel admin con todos los turnos y posibilidad de cancelarlos",
        ],
        modelos: [
            {
                nombre: "Recurso",
                campos: [
                    "nombre: String, requerido",
                    "especialidad: String",
                    "duracionTurnoMin: Number, default 30",
                ],
            },
            {
                nombre: "Turno",
                campos: [
                    "recurso: ObjectId → ref 'Recurso', requerido",
                    "clienteNombre: String, requerido",
                    "clienteEmail: String, requerido",
                    "fecha: Date, requerido",
                    "hora: String, requerido",
                    "estado: String, enum ['reservado','cancelado'], default 'reservado'",
                ],
            },
        ],
        endpoints: [
            { metodo: "GET", ruta: "/api/recursos", desc: "Lista de recursos" },
            { metodo: "GET", ruta: "/api/recursos/:id/disponibilidad", desc: "Horarios libres para ?fecha=" },
            { metodo: "POST", ruta: "/api/turnos", desc: "Reserva un turno (rechaza si hay superposición)" },
            { metodo: "GET", ruta: "/api/turnos", desc: "Lista de turnos (admin)" },
            { metodo: "PUT", ruta: "/api/turnos/:id/cancelar", desc: "Cancela un turno" },
        ],
        entregables: [
            "Backend con lógica de validación de superposición de horarios (no solo en el frontend)",
            "Frontend con selector de fecha/hora que consulte disponibilidad real antes de reservar",
            "Manejo de errores claro cuando el horario ya no está disponible",
            "README con instrucciones de instalación, variables de entorno y link de deploy",
        ],
        stack: ["React (Vite)", "Node.js + Express", "MongoDB + Mongoose", "Deploy: Render/Railway + Netlify/Vercel + Atlas"],
    },
    {
        id: "chatapp",
        numero: 6,
        slug: "chatapp",
        name: "ChatApp",
        accent: "magenta",
        tagline: "Salas de chat con historial persistente",
        branch: "feature/chatapp-backend",
        description:
            "Chat por salas. Los mensajes quedan guardados en la base de datos, así que el historial persiste al recargar o volver a entrar. El tiempo real puede resolverse con polling o, si el grupo se anima, con Socket.io.",
        funcionalidades: [
            "Listado de salas y creación de sala nueva",
            "Ingresar a una sala y ver el historial de mensajes",
            "Enviar mensajes que quedan guardados en el backend",
            "Actualización de mensajes nuevos (polling cada pocos segundos o WebSockets)",
        ],
        modelos: [
            {
                nombre: "Sala",
                campos: [
                    "nombre: String, requerido",
                    "creadaEn: Date, default Date.now",
                ],
            },
            {
                nombre: "Mensaje",
                campos: [
                    "sala: ObjectId → ref 'Sala', requerido",
                    "autor: String, requerido",
                    "texto: String, requerido",
                    "fecha: Date, default Date.now",
                ],
            },
        ],
        endpoints: [
            { metodo: "GET", ruta: "/api/salas", desc: "Lista de salas" },
            { metodo: "POST", ruta: "/api/salas", desc: "Crea una sala" },
            { metodo: "GET", ruta: "/api/mensajes/:salaId", desc: "Historial de mensajes de una sala" },
            { metodo: "POST", ruta: "/api/mensajes", desc: "Envía un mensaje a una sala" },
        ],
        entregables: [
            "Backend con índice/orden por fecha para traer el historial correctamente",
            "Frontend con scroll automático al último mensaje y estado de 'enviando'",
            "Si usan Socket.io: documentar el evento usado en el README",
            "README con instrucciones de instalación, variables de entorno y link de deploy",
        ],
        stack: ["React (Vite)", "Node.js + Express", "MongoDB + Mongoose", "Opcional: Socket.io", "Deploy: Render/Railway + Netlify/Vercel + Atlas"],
    },
    {
        id: "weatherapp",
        numero: 7,
        slug: "weatherapp",
        name: "WeatherApp",
        accent: "cyan",
        tagline: "Clima con favoritos e historial por usuario",
        branch: "feature/weatherapp-backend",
        description:
            "El backend actúa de intermediario hacia una API externa de clima y además guarda, por usuario, las ciudades favoritas y el historial de búsquedas recientes.",
        funcionalidades: [
            "Buscar el clima actual de una ciudad",
            "Guardar ciudades como favoritas",
            "Ver historial de las últimas búsquedas",
            "Quitar una ciudad de favoritos",
        ],
        modelos: [
            {
                nombre: "CiudadFavorita",
                campos: [
                    "usuario: String, requerido (nombre o id simple, sin login complejo)",
                    "nombreCiudad: String, requerido",
                ],
            },
            {
                nombre: "Busqueda",
                campos: [
                    "usuario: String, requerido",
                    "ciudad: String, requerido",
                    "fecha: Date, default Date.now",
                ],
            },
        ],
        endpoints: [
            { metodo: "GET", ruta: "/api/clima/:ciudad", desc: "Proxea a la API externa y registra la búsqueda" },
            { metodo: "GET", ruta: "/api/favoritos/:usuario", desc: "Favoritos de un usuario" },
            { metodo: "POST", ruta: "/api/favoritos", desc: "Agrega una ciudad a favoritos" },
            { metodo: "DELETE", ruta: "/api/favoritos/:id", desc: "Quita una ciudad de favoritos" },
            { metodo: "GET", ruta: "/api/historial/:usuario", desc: "Últimas búsquedas del usuario" },
        ],
        entregables: [
            "Backend con la API key de clima en variable de entorno (nunca en el frontend)",
            "Frontend que muestre estado de carga y error si la ciudad no existe",
            "Lista de favoritos con opción de quitar sin recargar la página",
            "README con instrucciones de instalación, variables de entorno y link de deploy",
        ],
        stack: ["React (Vite)", "Node.js + Express", "MongoDB + Mongoose", "API externa de clima", "Deploy: Render/Railway + Netlify/Vercel + Atlas"],
    },
    {
        id: "searchapp",
        numero: 8,
        slug: "searchapp",
        name: "SearchApp",
        accent: "violet",
        tagline: "Buscador de recursos de aprendizaje para la comunidad",
        branch: "feature/searchapp-backend",
        description:
            "Buscador curado de recursos de programación (documentación, cursos, videos). Cualquiera puede sugerir un recurso nuevo, que queda pendiente hasta ser aprobado desde un panel de moderación.",
        funcionalidades: [
            "Buscador de recursos por texto, categoría y tags",
            "Formulario para sugerir un recurso nuevo",
            "Panel de moderación: ver pendientes y aprobar o rechazar",
            "Los recursos rechazados o pendientes no aparecen en la búsqueda pública",
        ],
        modelos: [
            {
                nombre: "Recurso",
                campos: [
                    "titulo: String, requerido",
                    "url: String, requerido",
                    "descripcion: String",
                    "categoria: String, requerido",
                    "tags: [String]",
                    "sugeridoPor: String",
                    "aprobado: Boolean, default false",
                ],
            },
        ],
        endpoints: [
            { metodo: "GET", ruta: "/api/recursos", desc: "Búsqueda pública (?q= &categoria= &tag=), solo aprobados" },
            { metodo: "POST", ruta: "/api/recursos", desc: "Sugiere un recurso (queda con aprobado: false)" },
            { metodo: "GET", ruta: "/api/recursos/pendientes", desc: "Lista pendientes de moderación" },
            { metodo: "PUT", ruta: "/api/recursos/:id/aprobar", desc: "Aprueba un recurso" },
            { metodo: "DELETE", ruta: "/api/recursos/:id", desc: "Rechaza/elimina un recurso" },
        ],
        entregables: [
            "Backend con búsqueda por texto (regex o índice de texto de Mongo) y filtros combinables",
            "Frontend con buscador que debounce la escritura antes de pegarle a la API",
            "Panel de moderación separado de la vista pública",
            "README con instrucciones de instalación, variables de entorno y link de deploy",
        ],
        stack: ["React (Vite)", "Node.js + Express", "MongoDB + Mongoose", "Deploy: Render/Railway + Netlify/Vercel + Atlas"],
    },
];

export const evaluacionComun = [
    "Modelos Mongoose bien definidos, con tipos, validaciones y relaciones (ref) donde corresponda",
    "Rutas separadas de controladores (no toda la lógica amontonada en un solo archivo)",
    "Manejo de errores del backend (try/catch, status codes correctos, mensajes claros)",
    "El frontend consume la API real (fetch/axios) y maneja estados de carga y error, no datos hardcodeados",
    "URL del backend en variable de entorno del frontend, no hardcodeada a localhost",
    "Deploy funcionando: backend accesible públicamente y frontend consumiéndolo en producción",
    "README con instrucciones de instalación y variables de entorno necesarias",
];
