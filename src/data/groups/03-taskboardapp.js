const taskboard = {
    id: "taskboard",
    numero: 3,
    slug: "taskboard",
    name: "TaskBoard",
    accent: "violet",
    tagline: "Tablero Kanban con columnas y tareas persistentes",
    branch: "feature/taskboard-backend",
    description:
        "Gestor de tableros y tareas tipo Trello, sin roles: un solo usuario gestiona todo. Cada tablero tiene sus propias columnas y tareas, con detalle enriquecido (descripción, prioridad, etiqueta y fecha límite) y hay un buscador global que encuentra tareas en cualquier tablero. El grupo elige UNA de las ideas de más abajo y desarrolla el proyecto sobre esa temática.",
    funcionalidades: [
        "Login de un único usuario (sin roles ni registro múltiple): hay que iniciar sesión para entrar, aunque la app no sea multiusuario",
        "Vista general con todos los tableros: nombre, color/imagen de fondo y cantidad de tareas",
        "Crear tableros desde cero; renombrar y eliminar con confirmación",
        "Columnas con nombre editable: agregar, renombrar y eliminar (con confirmación si tiene tareas, sin dejar tareas huérfanas)",
        "Crear tareas nuevas dentro de una columna",
        "Tarjeta de tarea con título, etiqueta de color, fecha límite con indicador visual e ícono si tiene descripción",
        "Modal de detalle de tarea: título, descripción, fecha límite, prioridad (baja/media/alta), etiqueta y estado (según la columna en la que está)",
        "Mover tareas entre columnas con botones de flecha (no hace falta drag and drop)",
        "Buscador global por título o descripción que recorre todos los tableros y muestra a qué tablero y columna pertenece cada resultado",
        "Indicador de fecha (vencida / vence hoy o mañana) calculado en el frontend comparando con la fecha actual",
    ],
    modelos: [
        {
            nombre: "Usuario",
            campos: [
                "email: String, requerido, unique",
                "password: String, requerido (hasheada)",
            ],
        },
        {
            nombre: "Tablero",
            campos: [
                "nombre: String, requerido",
                "color: String (color o imagen de fondo)",
            ],
        },
        {
            nombre: "Columna",
            campos: [
                "tablero: ObjectId → ref 'Tablero', requerido",
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
                "etiqueta: String (nombre o color de la etiqueta)",
                "prioridad: String, enum ['baja','media','alta'], default 'media'",
                "fechaLimite: Date",
                "orden: Number, requerido",
            ],
        },
    ],
    endpoints: [
        { metodo: "POST", ruta: "/api/auth/login", desc: "Valida las credenciales del único usuario" },
        { metodo: "GET", ruta: "/api/tableros", desc: "Lista tableros con cantidad de tareas" },
        { metodo: "POST", ruta: "/api/tableros", desc: "Crea un tablero" },
        { metodo: "PUT", ruta: "/api/tableros/:id", desc: "Renombra/cambia el color de un tablero" },
        { metodo: "DELETE", ruta: "/api/tableros/:id", desc: "Elimina un tablero con sus columnas y tareas" },
        { metodo: "GET", ruta: "/api/tableros/:id/columnas", desc: "Columnas de un tablero con sus tareas (populate)" },
        { metodo: "POST", ruta: "/api/columnas", desc: "Crea una columna en un tablero" },
        { metodo: "PUT", ruta: "/api/columnas/:id", desc: "Renombra/reordena una columna" },
        { metodo: "DELETE", ruta: "/api/columnas/:id", desc: "Elimina columna y sus tareas, sin dejar datos huérfanos" },
        { metodo: "POST", ruta: "/api/tareas", desc: "Crea una tarea" },
        { metodo: "PUT", ruta: "/api/tareas/:id", desc: "Edita el detalle de una tarea" },
        { metodo: "PATCH", ruta: "/api/tareas/:id/mover", desc: "Cambia la columna de una tarea (botones de flecha)" },
        { metodo: "DELETE", ruta: "/api/tareas/:id", desc: "Elimina una tarea" },
        { metodo: "GET", ruta: "/api/tareas/buscar", desc: "Buscador global ?q= por título o descripción en todos los tableros" },
    ],
    entregables: [
        "Repositorio de GitHub público con el proyecto completo",
        "Variables de entorno para el backend (.env no subido al repo, con el connection string de MongoDB, puerto, etc.)",
        "README con instrucciones de instalación y cómo levantar el proyecto",
    ],
    stack: ["HTML5 + CSS3 + JavaScript", "Bootstrap"],
    ideas: [
        {
            id: "idea_01",
            titulo: "Proyectos de Diseño",
            descripcion:
                "Tableros por proyecto, columnas como Brief / En proceso / Revisión del cliente / Aprobado. Etiquetas por tipo de pieza (logo, banner, redes, UI). La prioridad refleja la urgencia del cliente y los indicadores de fecha señalan los deadlines de entrega acordados.",
        },
        {
            id: "idea_02",
            titulo: "Organización de una Redacción",
            descripcion:
                "Tableros por sección temática (tecnología, cultura, deportes), columnas como Idea / Redactando / En edición / Publicado. Etiquetas por formato (nota, entrevista, crónica, opinión). El buscador global encuentra cualquier nota en proceso a través de todos los tableros a la vez.",
        },
        {
            id: "idea_03",
            titulo: "Seguimiento de Bugs y Features",
            descripcion:
                "Tableros por proyecto de software, columnas Reportado / En análisis / En desarrollo / Testing / Resuelto. Etiquetas por tipo (bug, feature, mejora UX, deuda técnica). La prioridad va de crítica a baja y el indicador de fecha señala compromisos de entrega pactados.",
        },
        {
            id: "idea_04",
            titulo: "Planificación de Eventos",
            descripcion:
                "Tableros por evento (cumpleaños, casamiento, congreso), columnas Por confirmar / En gestión / Confirmado / Listo. Las tareas representan proveedores, locaciones, catering e invitados, con fechas límite reales que activan los indicadores de vence hoy, mañana o vencida.",
        },
        {
            id: "idea_05",
            titulo: "Gestión de Contenido para Redes",
            descripcion:
                "Tableros por plataforma (Instagram, TikTok, YouTube), columnas Ideas / Guionando / Producción / Programado / Publicado. Etiquetas por formato (reel, story, carrusel, video). El buscador global localiza cualquier contenido a través de todos los tableros a la vez.",
        },
    ],
};

export default taskboard;