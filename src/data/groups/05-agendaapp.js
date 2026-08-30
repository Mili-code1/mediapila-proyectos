const agendaapp = {
    id: "agendaapp",
    numero: 5,
    slug: "agendaapp",
    name: "AgendaApp",
    accent: "violet",
    tagline: "Tareas recurrentes con calendario y panel de productividad",
    branch: "feature/agendaapp-backend",
    description:
        "Gestor de tareas recurrentes con vista de calendario y vista de lista. Cada tarea puede tener subtareas, varias etiquetas personalizadas y una recurrencia (diaria, semanal o mensual); al completarse una tarea recurrente se genera automáticamente la siguiente ocurrencia. Un panel de productividad calcula racha de días activos, porcentaje de completitud y qué etiqueta tiene más pendientes. Sin roles: un solo usuario. El grupo elige UNA de las ideas de más abajo y desarrolla el proyecto sobre esa temática.",
    funcionalidades: [
        "Login de un único usuario (sin roles ni registro múltiple): hay que iniciar sesión para entrar, aunque la app no sea multiusuario",
        "Crear tareas con título, descripción, fecha/hora de vencimiento, prioridad (baja/media/alta/urgente) y una o varias etiquetas personalizadas (nombre + color)",
        "Definir recurrencia por tarea: sin recurrencia / diaria / semanal / mensual",
        "Agregar subtareas con checkbox, mostrando barra de progreso (ej: 2/4 completadas)",
        "Vista Calendario mensual con chips por día indicando tareas existentes; clic en un chip abre el detalle de esa tarea",
        "Vista Lista con filtros combinados por estado, etiqueta y prioridad, aplicados sobre el mismo array",
        "Al completar una tarea recurrente, el backend genera automáticamente la siguiente ocurrencia",
        "Panel de productividad: completadas hoy / esta semana / este mes, porcentaje de completitud general, racha de días con al menos una tarea completada, etiqueta con más pendientes y un gráfico de barras de los últimos 7 días",
    ],
    modelos: [
        {
            nombre: "Etiqueta",
            campos: [
                "nombre: String, requerido",
                "color: String, requerido",
            ],
        },
        {
            nombre: "Tarea",
            campos: [
                "titulo: String, requerido",
                "descripcion: String",
                "fechaVencimiento: Date, requerido",
                "prioridad: String, enum ['baja','media','alta','urgente'], default 'media'",
                "etiquetas: [ObjectId] → ref 'Etiqueta'",
                "recurrencia: String, enum ['ninguna','diaria','semanal','mensual'], default 'ninguna'",
                "subtareas: [{ titulo: String, completada: Boolean default false }]",
                "completada: Boolean, default false",
                "fechaCompletada: Date",
            ],
        },
    ],
    endpoints: [
        { metodo: "GET", ruta: "/api/tareas", desc: "Lista con filtros ?estado= &etiqueta= &prioridad= &desde= &hasta=" },
        { metodo: "POST", ruta: "/api/tareas", desc: "Crea una tarea" },
        { metodo: "PUT", ruta: "/api/tareas/:id", desc: "Edita una tarea" },
        { metodo: "PUT", ruta: "/api/tareas/:id/completar", desc: "Marca completada y genera la siguiente ocurrencia si es recurrente" },
        { metodo: "PATCH", ruta: "/api/tareas/:id/subtareas/:subtareaId", desc: "Marca/desmarca una subtarea" },
        { metodo: "DELETE", ruta: "/api/tareas/:id", desc: "Elimina una tarea" },
        { metodo: "GET", ruta: "/api/etiquetas", desc: "Lista de etiquetas" },
        { metodo: "POST", ruta: "/api/etiquetas", desc: "Crea una etiqueta (nombre + color)" },
        { metodo: "GET", ruta: "/api/estadisticas", desc: "Datos del panel: racha, % completitud, etiqueta con más pendientes, últimos 7 días" },
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
            titulo: "Agenda de Entrenamiento",
            descripcion:
                "Las tareas son rutinas con subtareas por ejercicio (series, reps, peso objetivo). La recurrencia semanal es central: lunes y miércoles pecho, martes y jueves piernas. El panel muestra racha de días entrenados, volumen semanal y el gráfico de barras con divs.",
        },
        {
            id: "idea_02",
            titulo: "Seguimiento de Hábitos",
            descripcion:
                "Cada tarea es un hábito con recurrencia diaria o semanal: meditar, leer 20 minutos, no pantallas antes de dormir. El calendario colorea los días según cumplimiento. La racha es el dato central del panel: completar y romper una racha tiene impacto visual inmediato.",
        },
        {
            id: "idea_03",
            titulo: "Planificador de Estudios",
            descripcion:
                "Tareas con etiqueta de materia, subtareas por subtema y fecha límite atada a parciales o entregas. Recurrencia semanal para repasos. El panel muestra qué materias tienen más pendientes, el porcentaje de avance general y la racha de días con estudio.",
        },
        {
            id: "idea_04",
            titulo: "Agenda de Medicación",
            descripcion:
                "Tomas de medicamentos o turnos médicos con recurrencia diaria o por días específicos de la semana. El calendario muestra los días con tomas cumplidas o saltadas. El panel alerta sobre rachas rotas y calcula el porcentaje de adherencia al tratamiento.",
        },
        {
            id: "idea_05",
            titulo: "Planificador de Contenido",
            descripcion:
                "Para creadores digitales. Las tareas son publicaciones con subtareas (guion, grabación, edición, thumbnail, publicación), etiquetas por plataforma y recurrencia semanal. El panel muestra cuánto contenido se publicó por plataforma en el período.",
        },
    ],
};

export default agendaapp;