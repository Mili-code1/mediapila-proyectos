// Specs actualizadas — 2C 2026
// Ahora se exige backend propio (Express + MongoDB + Mongoose). El frontend es HTML/CSS/JS
// vanilla, no React. No se pide deploy: la entrega es el repositorio de GitHub.
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
            "Aplicación web de venta de entradas con un mapa visual de espacios (butacas, sectores o lugares) que muestra el estado de cada lugar en tiempo real: libre, bloqueado o vendido. Tiene sistema de roles (admin y usuario) con vistas y permisos distintos, carrito de compra con subtotal por sección y total acumulado, y confirmación de compra con número de orden generado automáticamente. El grupo elige UNA de las ideas de más abajo y desarrolla el proyecto sobre esa temática.",
        funcionalidades: [
            "Login con roles diferenciados: admin y usuario, cada uno con una vista distinta",
            "El admin gestiona el contenido (eventos, funciones, partidos, viajes, según la idea elegida); el usuario no puede acceder al panel de administración",
            "Redirección automática si se intenta entrar a una sección no autorizada por URL",
            "Mapa visual del espacio elegido, generado dinámicamente, con estados: libre / bloqueado / vendido",
            "Selección múltiple de lugares con bloqueo inmediato apenas se eligen",
            "Carrito con lista de lugares elegidos, subtotal por sección y total acumulado",
            "Confirmación de compra con número de orden generado por el backend",
            "Sección 'Mis entradas' con las compras agrupadas por evento/función",
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
            "Repositorio de GitHub público con el proyecto completo",
            "Variables de entorno para el backend (.env no subido al repo, con el connection string de MongoDB, puerto, etc.)",
            "README con instrucciones de instalación y cómo levantar el proyecto",
        ],
        stack: ["HTML5 + CSS3 + JavaScript (vanilla)", "Node.js + Express", "MongoDB + Mongoose"],
        ideas: [
            {
                id: "idea_01",
                titulo: "Teatro o Cine",
                descripcion:
                    "El mapa refleja la sala real con platea, pullman y palcos, cada sección con su propio precio. El usuario navega el mapa visual, selecciona sus lugares, los bloquea y completa la compra generando un número de orden único.",
            },
            {
                id: "idea_02",
                titulo: "Estadio de Fútbol",
                descripcion:
                    "El mapa representa las tribunas divididas en sectores (Norte, Sur, Platea, Palco) con precios diferenciados. El admin carga partidos con fecha, rival y disponibilidad por sector; al seleccionar un asiento queda bloqueado de inmediato.",
            },
            {
                id: "idea_03",
                titulo: "Festival de Música",
                descripcion:
                    "Sin butacas numeradas: el mapa tiene zonas (Campo General, VIP, Palco) con capacidad limitada por zona. El admin arma el lineup con artistas, escenarios y horarios; el usuario elige zona, ve el porcentaje de ocupación y arma un carrito con entradas para varios días.",
            },
            {
                id: "idea_04",
                titulo: "Micro de Larga Distancia",
                descripcion:
                    "El mapa es el interior del colectivo con asientos numerados, diferenciando Cama, Semi Cama y Ejecutivo. El admin carga viajes con origen, destino, empresa y horario; el usuario elige su asiento exacto y obtiene un número de pasaje generado automáticamente.",
            },
            {
                id: "idea_05",
                titulo: "Cine Drive-In",
                descripcion:
                    "El mapa muestra filas de espacios para autos, diferenciando lugares para vehículos chicos y grandes. El admin crea funciones con película, horario y precio por tipo de espacio; el sistema bloquea el lugar al instante y emite confirmación con número de reserva.",
            },
        ],
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
            "Plataforma que conecta profesionales (oferentes) con clientes. Cada oferente carga uno o más servicios con precio y categoría, y define su disponibilidad semanal. El cliente busca con filtros combinables, solicita un servicio y solo puede dejar una reseña cuando el oferente marca esa solicitud como completada; el contacto directo (WhatsApp) se habilita recién cuando la solicitud pasa a estado aceptada. El grupo elige UNA de las ideas de más abajo y desarrolla el proyecto sobre esa temática.",
        funcionalidades: [
            "Registro con elección de rol: Oferente o Cliente (no modificable después)",
            "El oferente no puede solicitar servicios; el cliente no puede gestionar servicios propios",
            "Redirección automática si se intenta acceder por URL a una sección del otro rol",
            "Oferente: carga uno o más servicios (nombre, descripción, precio, categoría) y su disponibilidad semanal",
            "Oferente: panel con sus servicios, solicitudes recibidas y sus reseñas",
            "Cliente: buscador de servicios con filtros combinables (categoría, rango de precio, estrellas mínimas, disponibilidad)",
            "Cliente: solicita un servicio indicando descripción, día/franja horaria y mensaje",
            "Gestión de solicitudes por parte del oferente: pendiente → aceptada / rechazada → completada",
            "Reseña de 1 a 5 estrellas + comentario, habilitada solo si existe una solicitud completada entre ese cliente y ese oferente, y única por par cliente-oferente",
            "El contacto (WhatsApp) del oferente solo se muestra al cliente cuando la solicitud está en estado aceptada",
        ],
        modelos: [
            {
                nombre: "Profesional",
                campos: [
                    "nombre: String, requerido",
                    "zona: String, requerido",
                    "contacto: String, requerido (para WhatsApp)",
                    "disponibilidadSemanal: [String] (días/franjas)",
                    "calificacionPromedio: Number, default 0",
                ],
            },
            {
                nombre: "Servicio",
                campos: [
                    "profesional: ObjectId → ref 'Profesional', requerido",
                    "nombre: String, requerido",
                    "descripcion: String",
                    "precio: Number, requerido",
                    "categoria: String, requerido",
                ],
            },
            {
                nombre: "Solicitud",
                campos: [
                    "servicio: ObjectId → ref 'Servicio', requerido",
                    "profesional: ObjectId → ref 'Profesional', requerido",
                    "clienteNombre: String, requerido",
                    "descripcion: String, requerido",
                    "diaFranja: String",
                    "fecha: Date, default Date.now",
                    "estado: String, enum ['pendiente','aceptada','rechazada','completada'], default 'pendiente'",
                ],
            },
            {
                nombre: "Reseña",
                campos: [
                    "solicitud: ObjectId → ref 'Solicitud', requerido (debe estar en estado 'completada')",
                    "profesional: ObjectId → ref 'Profesional', requerido",
                    "clienteNombre: String, requerido",
                    "puntaje: Number, requerido, min 1, max 5",
                    "comentario: String",
                    "fecha: Date, default Date.now",
                ],
            },
        ],
        endpoints: [
            { metodo: "GET", ruta: "/api/profesionales", desc: "Lista con filtros ?zona= &disponibilidad=" },
            { metodo: "GET", ruta: "/api/profesionales/:id", desc: "Ficha de un profesional con sus servicios y reseñas" },
            { metodo: "POST", ruta: "/api/profesionales", desc: "Alta de profesional (registro como oferente)" },
            { metodo: "GET", ruta: "/api/servicios", desc: "Búsqueda con filtros ?categoria= &precioMax= &estrellasMin=" },
            { metodo: "POST", ruta: "/api/servicios", desc: "El oferente carga un servicio nuevo" },
            { metodo: "POST", ruta: "/api/solicitudes", desc: "El cliente solicita un servicio" },
            { metodo: "GET", ruta: "/api/solicitudes/profesional/:id", desc: "Solicitudes recibidas por un profesional" },
            { metodo: "PUT", ruta: "/api/solicitudes/:id/estado", desc: "Cambia el estado de una solicitud" },
            { metodo: "POST", ruta: "/api/resenas", desc: "Crea una reseña (valida solicitud completada y unicidad del par)" },
            { metodo: "GET", ruta: "/api/resenas/profesional/:id", desc: "Reseñas de un profesional" },
        ],
        entregables: [
            "Repositorio de GitHub público con el proyecto completo",
            "Variables de entorno para el backend (.env no subido al repo, con el connection string de MongoDB, puerto, etc.)",
            "README con instrucciones de instalación y cómo levantar el proyecto",
        ],
        stack: ["HTML5 + CSS3 + JavaScript (vanilla)", "Node.js + Express", "MongoDB + Mongoose"],
        ideas: [
            {
                id: "idea_01",
                titulo: "Clases Particulares",
                descripcion:
                    "Docentes cargan materias, nivel educativo (primaria, secundaria, universitario), modalidad (presencial/virtual) y precio por hora. Les estudiantes buscan por materia y nivel, reservan una franja horaria y dejan reseña solo cuando la clase fue marcada como completada por el docente.",
            },
            {
                id: "idea_02",
                titulo: "Servicios del Hogar",
                descripcion:
                    "Plomeros, electricistas, pintores y cerrajeros cargan especialidades, zona de cobertura y disponibilidad semanal. El cliente busca por categoría y ciudad, describe el problema y solicita el servicio; el WhatsApp del profesional aparece solo cuando la solicitud está aceptada.",
            },
            {
                id: "idea_03",
                titulo: "Freelancers Creativos",
                descripcion:
                    "Diseñadores, fotógrafos, redactores e ilustradores cargan especialidad, portfolio en la descripción, precio estimado y tiempo de entrega. El cliente solicita un trabajo con un brief breve; las reseñas se habilitan cuando el profesional marca el trabajo como entregado.",
            },
            {
                id: "idea_04",
                titulo: "Cuidado de Mascotas",
                descripcion:
                    "Paseadores, veterinarios a domicilio y cuidadores indican tipo de animal, servicio, precio y disponibilidad horaria semanal. El cliente reserva con descripción de la mascota; el contacto por WhatsApp se activa solo cuando la solicitud fue aceptada.",
            },
            {
                id: "idea_05",
                titulo: "Coaches y Consultores",
                descripcion:
                    "Nutricionistas, entrenadores personales y coaches de vida cargan especialidades, precio por sesión y disponibilidad. El cliente describe su objetivo al reservar; la reseña se habilita solo cuando el profesional marcó la sesión como completada, y es única por par cliente-profesional.",
            },
        ],
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
            "Gestor de tableros y tareas tipo Trello, sin roles: un solo usuario gestiona todo. Cada tablero tiene sus propias columnas y tareas, con detalle enriquecido (descripción, prioridad, etiqueta y fecha límite) y hay un buscador global que encuentra tareas en cualquier tablero. El grupo elige UNA de las ideas de más abajo y desarrolla el proyecto sobre esa temática.",
        funcionalidades: [
            "Vista general con todos los tableros: nombre, color/imagen de fondo y cantidad de tareas",
            "Crear tableros desde cero; renombrar y eliminar con confirmación",
            "Columnas con nombre editable: agregar, renombrar y eliminar (con confirmación si tiene tareas, sin dejar tareas huérfanas)",
            "Tarjeta de tarea con título, etiqueta de color, fecha límite con indicador visual e ícono si tiene descripción",
            "Modal de detalle de tarea: título, descripción, fecha límite, prioridad (baja/media/alta) y etiqueta",
            "Mover tareas entre columnas con botones de flecha (no hace falta drag and drop)",
            "Buscador global por título o descripción que recorre todos los tableros y muestra a qué tablero y columna pertenece cada resultado",
            "Indicador de fecha (vencida / vence hoy o mañana) calculado en el frontend comparando con la fecha actual",
        ],
        modelos: [
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
        stack: ["HTML5 + CSS3 + JavaScript (vanilla)", "Node.js + Express", "MongoDB + Mongoose"],
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
    },
    {
        id: "devmatch",
        numero: 4,
        slug: "devmatch",
        name: "DevMatch",
        accent: "cyan",
        tagline: "Red social de matching con compatibilidad por perfil",
        branch: "feature/devmatch-backend",
        description:
            "Red social con matching bidireccional: un perfil envía una solicitud a otro, y el match queda confirmado recién cuando la otra parte la acepta. El feed muestra perfiles ordenados por un puntaje de compatibilidad calculado según los atributos propios de la idea elegida (géneros musicales, stack técnico, materias en común, etc.). El onboarding es obligatorio antes de poder ver el feed. El grupo elige UNA de las ideas de más abajo y desarrolla el proyecto sobre esa temática.",
        funcionalidades: [
            "Registro con nombre, usuario único, email y foto (URL)",
            "Onboarding obligatorio que bloquea el acceso al feed hasta completarse",
            "Redirección automática si se intenta acceder al feed sin completar el onboarding",
            "Feed de perfiles ordenado por compatibilidad, con barra de progreso visual del puntaje",
            "Enviar una solicitud de match a otro perfil",
            "Ver las solicitudes recibidas y poder aceptarlas o rechazarlas",
            "El rechazo no se notifica al otro perfil (privacidad)",
            "Listado de matches activos (confirmados por ambas partes)",
            "Logout disponible desde cualquier vista autenticada",
        ],
        modelos: [
            {
                nombre: "Perfil",
                campos: [
                    "nombre: String, requerido",
                    "usuario: String, requerido, unique",
                    "email: String, requerido",
                    "fotoUrl: String",
                    "onboardingCompleto: Boolean, default false",
                    "atributos: Object (específicos de la idea elegida: instrumento, géneros, stack, materias, etc.)",
                ],
            },
            {
                nombre: "Match",
                campos: [
                    "perfilOrigen: ObjectId → ref 'Perfil', requerido (quien envía la solicitud)",
                    "perfilDestino: ObjectId → ref 'Perfil', requerido (quien la recibe)",
                    "estado: String, enum ['pendiente','confirmado','rechazado'], default 'pendiente'",
                    "fecha: Date, default Date.now",
                ],
            },
        ],
        endpoints: [
            { metodo: "GET", ruta: "/api/perfiles", desc: "Feed ?perfilId= ordenado por compatibilidad con ese perfil" },
            { metodo: "GET", ruta: "/api/perfiles/:id", desc: "Ficha de un perfil" },
            { metodo: "POST", ruta: "/api/perfiles", desc: "Registro de un perfil nuevo" },
            { metodo: "PUT", ruta: "/api/perfiles/:id/onboarding", desc: "Completa el onboarding con los atributos de la idea" },
            { metodo: "POST", ruta: "/api/matches", desc: "Envía una solicitud de match a otro perfil" },
            { metodo: "GET", ruta: "/api/matches/recibidos/:perfilId", desc: "Solicitudes pendientes recibidas por un perfil" },
            { metodo: "PUT", ruta: "/api/matches/:id/estado", desc: "Acepta o rechaza una solicitud de match" },
            { metodo: "GET", ruta: "/api/matches/activos/:perfilId", desc: "Matches confirmados de un perfil" },
        ],
        entregables: [
            "Repositorio de GitHub público con el proyecto completo",
            "Variables de entorno para el backend (.env no subido al repo, con el connection string de MongoDB, puerto, etc.)",
            "README con instrucciones de instalación y cómo levantar el proyecto",
        ],
        stack: ["HTML5 + CSS3 + JavaScript (vanilla)", "Node.js + Express", "MongoDB + Mongoose"],
        ideas: [
            {
                id: "idea_01",
                titulo: "Matching de Músiques",
                descripcion:
                    "Perfiles con instrumento principal, géneros musicales, nivel de experiencia y disponibilidad horaria. El algoritmo calcula compatibilidad por géneros en común (peso mayor) más disponibilidad y nivel. Con match mutuo confirmado se habilita el historial de colaboraciones.",
            },
            {
                id: "idea_02",
                titulo: "Matching para Hackathons",
                descripcion:
                    "Devs buscando compañeres para un evento específico. Atributos: stack técnico, rol buscado (frontend, backend, diseño, PM, data), días disponibles y nivel. El algoritmo prioriza complementariedad de roles por sobre similitud, para armar equipos balanceados.",
            },
            {
                id: "idea_03",
                titulo: "Compañeres de Estudio",
                descripcion:
                    "Estudiantes que buscan con quién preparar parciales o proyectos. Atributos: materias en curso, estilo (presencial/virtual, grupal/individual) y horarios disponibles. El algoritmo pondera materias en común como peso principal; el onboarding es obligatorio antes de ver el feed.",
            },
            {
                id: "idea_04",
                titulo: "Socios para Emprender",
                descripcion:
                    "Perfiles con área de expertise, rol que ocupan (técnico, comercial, diseño, operaciones), tipo de proyecto buscado y dedicación horaria. El algoritmo busca complementariedad, no identidad. El matching tiene sus tres estados: pendiente, confirmado y rechazado en privado.",
            },
            {
                id: "idea_05",
                titulo: "Compañeres de Viaje",
                descripcion:
                    "Viajeros buscando compañía para un destino próximo. Atributos: destino, estilo de viaje (mochilero, hotel, organizado), presupuesto y fechas disponibles. La compatibilidad se basa en destino y fechas como factores de mayor peso.",
            },
        ],
    },
    {
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
            "Crear tareas con título, descripción, fecha/hora de vencimiento, prioridad (baja/media/alta/urgente) y una o varias etiquetas personalizadas (nombre + color)",
            "Definir recurrencia por tarea: sin recurrencia / diaria / semanal / mensual",
            "Agregar subtareas con checkbox, mostrando barra de progreso (ej: 2/4 completadas)",
            "Vista Calendario mensual con chips por día indicando tareas existentes",
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
        stack: ["HTML5 + CSS3 + JavaScript (vanilla)", "Node.js + Express", "MongoDB + Mongoose"],
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
    },
    {
        id: "chatapp",
        numero: 6,
        slug: "chatapp",
        name: "ChatApp",
        accent: "magenta",
        tagline: "Chat con contactos que responden por palabra clave",
        branch: "feature/chatapp-backend",
        description:
            "Chat con contactos precargados que responden automáticamente por palabras clave, con estados de mensaje tipo WhatsApp (enviado, entregado, leído), reacciones, timestamps inteligentes y un perfil propio editable. Un solo usuario hardcodeado, sin roles ni registro. El grupo elige UNA de las ideas de más abajo y desarrolla el proyecto sobre esa temática.",
        funcionalidades: [
            "Login con 8+ contactos precargados (foto, nombre, descripción, estado); un único usuario hardcodeado, sin registro",
            "Perfil propio editable: foto, nombre, descripción y estado (disponible / ocupado / no molestar)",
            "Lista de chats con foto, nombre, último mensaje, hora y badge de no leídos, reordenada dinámicamente al llegar un mensaje nuevo",
            "Estados de mensaje: Enviado → Entregado → Leído",
            "Timestamps inteligentes (hora / 'Ayer HH:MM' / fecha completa) calculados en el frontend a partir de la fecha real",
            "Indicador 'escribiendo...' mientras se genera la respuesta automática del contacto",
            "Respuestas automáticas por palabras clave propias de cada contacto, como función reutilizable que recibe el contacto y el mensaje",
            "Reacciones a mensajes con 5 emojis",
            "Eliminar un mensaje lo reemplaza por 'Mensaje eliminado' sin borrarlo de la base",
            "Los mensajes no leídos se marcan como leídos al abrir el chat",
        ],
        modelos: [
            {
                nombre: "Perfil",
                campos: [
                    "nombre: String, requerido",
                    "fotoUrl: String",
                    "descripcion: String",
                    "estado: String, enum ['disponible','ocupado','no molestar'], default 'disponible'",
                ],
            },
            {
                nombre: "Contacto",
                campos: [
                    "nombre: String, requerido",
                    "fotoUrl: String",
                    "descripcion: String",
                    "estado: String, enum ['disponible','ocupado','no molestar'], default 'disponible'",
                    "palabrasClave: [{ palabra: String, respuesta: String }]",
                ],
            },
            {
                nombre: "Mensaje",
                campos: [
                    "contacto: ObjectId → ref 'Contacto', requerido",
                    "autor: String, enum ['usuario','contacto'], requerido",
                    "texto: String, requerido",
                    "estado: String, enum ['enviado','entregado','leido'], default 'enviado'",
                    "reaccion: String (emoji, opcional)",
                    "eliminado: Boolean, default false",
                    "fecha: Date, default Date.now",
                ],
            },
        ],
        endpoints: [
            { metodo: "GET", ruta: "/api/perfil", desc: "Datos del usuario único" },
            { metodo: "PUT", ruta: "/api/perfil", desc: "Edita el perfil propio" },
            { metodo: "GET", ruta: "/api/contactos", desc: "Lista de contactos con último mensaje y no leídos" },
            { metodo: "GET", ruta: "/api/mensajes/:contactoId", desc: "Historial de mensajes con un contacto" },
            { metodo: "POST", ruta: "/api/mensajes", desc: "Envía un mensaje y dispara la respuesta automática" },
            { metodo: "PUT", ruta: "/api/mensajes/:id/estado", desc: "Actualiza el estado de un mensaje" },
            { metodo: "PUT", ruta: "/api/mensajes/leer/:contactoId", desc: "Marca como leídos todos los mensajes de ese contacto" },
            { metodo: "PUT", ruta: "/api/mensajes/:id/reaccion", desc: "Agrega o cambia la reacción de un mensaje" },
            { metodo: "DELETE", ruta: "/api/mensajes/:id", desc: "Elimina un mensaje (soft delete: 'Mensaje eliminado')" },
        ],
        entregables: [
            "Repositorio de GitHub público con el proyecto completo",
            "Variables de entorno para el backend (.env no subido al repo, con el connection string de MongoDB, puerto, etc.)",
            "README con instrucciones de instalación y cómo levantar el proyecto",
        ],
        stack: ["HTML5 + CSS3 + JavaScript", "Node.js + Express", "MongoDB + Mongoose"],
        ideas: [
            {
                id: "idea_01",
                titulo: "Personajes Históricos",
                descripcion:
                    "Los contactos son figuras como Einstein, Sor Juana, Darwin, Tesla o Frida Kahlo. Cada une tiene palabras clave propias de su área y época, y responde con frases en su estilo particular. El indicador 'escribiendo...' antes de que Darwin conteste sobre evolución es la cereza del postre.",
            },
            {
                id: "idea_02",
                titulo: "Asistentes por Área",
                descripcion:
                    "Cada contacto es un asistente especializado: cocina, viajes, finanzas, fitness y películas, con personalidades distintas, palabras clave de su dominio y respuestas con humor. La función de respuesta automática es reutilizable: recibe el contacto y el mensaje y devuelve la respuesta correcta.",
            },
            {
                id: "idea_03",
                titulo: "Personajes de Fandom",
                descripcion:
                    "Los contactos son personajes de una serie, juego o universo elegido por el grupo. Las respuestas automáticas son frases icónicas o referencias del universo. Diseñar los perfiles, fotos y palabras clave es parte del trabajo.",
            },
            {
                id: "idea_04",
                titulo: "Equipo de Soporte Técnico",
                descripcion:
                    "Cada contacto es un especialista: Desarrolladora Frontend, Backend Lead, DBA, Diseñadora UX y DevOps. Las palabras clave son términos técnicos de cada área y las respuestas simulan un canal de soporte real.",
            },
            {
                id: "idea_05",
                titulo: "Círculo Social de un Personaje",
                descripcion:
                    "Se inventa un personaje ficticio y sus contactos son su círculo: la mamá, la mejor amiga, la jefa, el vecino, la pareja. Cada une tiene un registro de habla distinto y palabras clave propias de su relación.",
            },
        ],
    },
    {
        id: "dataapp",
        numero: 7,
        slug: "dataapp",
        name: "DataApp",
        accent: "cyan",
        tagline: "Consumo de una API externa con favoritos e historial",
        branch: "feature/dataapp-backend",
        description:
            "Aplicación que consume una API externa (clima, sismos, tipo de cambio, astronomía o noticias, según la idea elegida) a través de un backend propio que oculta la API key y guarda favoritos e historial de búsquedas. La búsqueda dispara una sola llamada a la API externa; cambiar de unidad o modo de visualización se resuelve con los datos ya obtenidos, sin repetir la llamada. El grupo elige UNA de las ideas de más abajo y desarrolla el proyecto sobre esa temática.",
        funcionalidades: [
            "Búsqueda de un término (ciudad, moneda, fecha, región, etc.) que el frontend envía al backend",
            "El backend llama a la API externa y guarda la API key en variable de entorno; nunca se expone en el código del frontend",
            "Manejo de errores visible en la UI (nunca solo en consola): término no encontrado, permiso denegado, límite de la API agotado",
            "Todas las llamadas (frontend→backend y backend→API externa) con async/await y try/catch",
            "Toggle entre unidades o modos de visualización sin repetir la llamada a la API: la conversión se calcula en el frontend con los datos ya obtenidos",
            "Fondo o estilo visual que cambia dinámicamente según el dato principal devuelto por la búsqueda",
            "Guardar búsquedas como favoritas, accesibles desde cualquier parte de la app",
            "Historial de las últimas búsquedas sin duplicados: repetir una búsqueda existente la mueve al frente",
            "Si la idea elegida lo permite: geolocalización, pidiendo permiso y cargando datos de la ubicación actual",
        ],
        modelos: [
            {
                nombre: "Busqueda",
                campos: [
                    "termino: String, requerido",
                    "fecha: Date, default Date.now (se actualiza al repetir el término, sin crear duplicados)",
                ],
            },
            {
                nombre: "Favorito",
                campos: [
                    "termino: String, requerido",
                    "datos: Object (resumen opcional del resultado guardado)",
                    "fecha: Date, default Date.now",
                ],
            },
        ],
        endpoints: [
            { metodo: "GET", ruta: "/api/datos/:termino", desc: "Llama a la API externa, devuelve los datos y registra la búsqueda" },
            { metodo: "GET", ruta: "/api/historial", desc: "Últimas búsquedas sin duplicados, más reciente primero" },
            { metodo: "GET", ruta: "/api/favoritos", desc: "Lista de favoritos" },
            { metodo: "POST", ruta: "/api/favoritos", desc: "Agrega un término a favoritos" },
            { metodo: "DELETE", ruta: "/api/favoritos/:id", desc: "Quita un favorito" },
        ],
        entregables: [
            "Repositorio de GitHub público con el proyecto completo",
            "Variables de entorno para el backend (.env no subido al repo, con la API key externa, connection string de MongoDB, puerto, etc.)",
            "README con instrucciones de instalación y cómo levantar el proyecto",
        ],
        stack: ["HTML5 + CSS3 + JavaScript", "Node.js + Express", "MongoDB + Mongoose", "API externa (según la idea elegida)"],
        ideas: [
            {
                id: "idea_01",
                titulo: "Calidad del Aire",
                descripcion:
                    "Consume la API de contaminación de OpenWeatherMap. Muestra índice AQI, PM2.5, PM10 y ozono con recomendaciones según el nivel de riesgo. Ciudades favoritas, historial sin duplicados y fondo dinámico según el nivel de contaminación del día.",
            },
            {
                id: "idea_02",
                titulo: "Sismos en Tiempo Real",
                descripcion:
                    "Consume la API pública de USGS, gratuita y sin clave. Muestra los últimos sismos con magnitud, profundidad, región y tiempo transcurrido. Filtros por magnitud mínima y rango de fechas, con alerta visual para sismos mayores a 5.0.",
            },
            {
                id: "idea_03",
                titulo: "Tipo de Cambio",
                descripcion:
                    "Consume ExchangeRate-API en su plan gratuito. El usuario elige moneda base y ve la conversión a múltiples monedas con variación del día; la conversión a otras unidades se hace en el frontend sin repetir la llamada. Favoritas, historial y gráfico de últimos 7 días.",
            },
            {
                id: "idea_04",
                titulo: "Astronomía NASA",
                descripcion:
                    "Consume la API APOD de la NASA, gratuita con clave. Muestra la imagen o video astronómico del día con título y descripción científica. Búsqueda por fecha y favoritas persistidas; el fondo cambia según si la imagen es nebulosa, planeta, galaxia o sistema solar.",
            },
            {
                id: "idea_05",
                titulo: "Noticias por Categoría",
                descripcion:
                    "Consume NewsAPI o GNews en su plan gratuito. El usuario busca por palabra clave o filtra por categoría (tecnología, ciencia, deportes, cultura). Historial de búsquedas como chips clicables, fuentes favoritas y manejo visible de errores si se agota el límite gratuito.",
            },
        ],
    },
    {
        id: "searchapp",
        numero: 8,
        slug: "searchapp",
        name: "SearchApp",
        accent: "violet",
        tagline: "Buscador con dataset propio, filtros y favoritos",
        branch: "feature/searchapp-backend",
        description:
            "Buscador sobre un dataset propio de 40+ registros, con filtros combinables (categoría, etiqueta, rango de fechas), ordenamiento por relevancia o fecha, paginado y favoritos con nota personal. El dataset ya no vive en un archivo JS como módulo ES6: ahora se carga en MongoDB mediante un script de seed y se consulta a través del backend. El grupo elige UNA de las ideas de más abajo y desarrolla el proyecto sobre esa temática.",
        funcionalidades: [
            "Dataset de 40+ registros (título, descripción, contenido, categoría, etiquetas, fecha, link) cargado en MongoDB con un script de seed, con al menos 5 categorías distintas",
            "Búsqueda por texto simultánea en título, descripción y etiquetas, disparada al presionar Enter o el botón buscar (no en tiempo real)",
            "Filtros combinables: por categoría, por etiqueta (chips generados dinámicamente desde el dataset) y por rango de fechas",
            "Ordenamiento: por relevancia (título > descripción > etiquetas), por fecha o por título A-Z/Z-A",
            "Botón para limpiar todos los filtros",
            "Resultados en cards (título, categoría, etiquetas, fecha, descripción corta), paginados de a 8 con numeración, recalculando siempre desde la página 1 al cambiar filtros",
            "Modal de vista previa con el contenido completo y el link",
            "Favoritos con una nota personal corta por registro",
            "Historial de las últimas 10 búsquedas como chips clicables, sin duplicados (repetir una búsqueda la mueve al frente)",
        ],
        modelos: [
            {
                nombre: "Registro",
                campos: [
                    "titulo: String, requerido",
                    "descripcion: String, requerido",
                    "contenido: String (texto completo para el modal)",
                    "categoria: String, requerido",
                    "etiquetas: [String]",
                    "fecha: Date, requerido",
                    "link: String",
                ],
            },
            {
                nombre: "Favorito",
                campos: [
                    "registro: ObjectId → ref 'Registro', requerido",
                    "nota: String (nota personal corta)",
                    "fecha: Date, default Date.now",
                ],
            },
            {
                nombre: "Busqueda",
                campos: [
                    "termino: String, requerido",
                    "fecha: Date, default Date.now (se actualiza al repetir el término; se conservan las últimas 10)",
                ],
            },
        ],
        endpoints: [
            { metodo: "GET", ruta: "/api/registros", desc: "?q= &categoria= &etiqueta= &desde= &hasta= &orden= &pagina=, 8 por página" },
            { metodo: "GET", ruta: "/api/registros/:id", desc: "Detalle completo para el modal" },
            { metodo: "GET", ruta: "/api/categorias", desc: "Categorías distintas del dataset" },
            { metodo: "GET", ruta: "/api/etiquetas", desc: "Etiquetas distintas del dataset (para los chips)" },
            { metodo: "GET", ruta: "/api/favoritos", desc: "Lista de favoritos con su nota" },
            { metodo: "POST", ruta: "/api/favoritos", desc: "Agrega un registro a favoritos con nota personal" },
            { metodo: "DELETE", ruta: "/api/favoritos/:id", desc: "Quita un favorito" },
            { metodo: "GET", ruta: "/api/historial", desc: "Últimas 10 búsquedas, sin duplicados" },
            { metodo: "POST", ruta: "/api/historial", desc: "Registra una búsqueda (la mueve al frente si ya existía)" },
        ],
        entregables: [
            "Repositorio de GitHub público con el proyecto completo",
            "Script de seed para cargar los 40+ registros iniciales en MongoDB",
            "Variables de entorno para el backend (.env no subido al repo, con el connection string de MongoDB, puerto, etc.)",
            "README con instrucciones de instalación, cómo correr el seed y cómo levantar el proyecto",
        ],
        stack: ["HTML5 + CSS3 + JavaScript", "Node.js + Express", "MongoDB + Mongoose"],
        ideas: [
            {
                id: "idea_01",
                titulo: "Recetas de Cocina",
                descripcion:
                    "40+ recetas con título, descripción, ingredientes clave como etiquetas y categoría (entrada, principal, postre, bebida). El modal muestra la receta completa con el link. Filtros por categoría, etiqueta y tiempo de preparación.",
            },
            {
                id: "idea_02",
                titulo: "Películas o Series",
                descripcion:
                    "40+ registros con título, sinopsis, género, director, año, plataforma y valoración. Las etiquetas son datos clave como director, década y plataforma. El ordenamiento por relevancia prioriza coincidencias en el título sobre la sinopsis.",
            },
            {
                id: "idea_03",
                titulo: "Juegos de Mesa",
                descripcion:
                    "40+ juegos con nombre, descripción, mecánica, categoría (estrategia, familiar, cooperativo, party) y etiquetas por cantidad de jugadores y duración. Los filtros por rango tienen sentido real acá: juegos para 2 a 4 jugadores de menos de 60 minutos.",
            },
            {
                id: "idea_04",
                titulo: "Lugares en Argentina",
                descripcion:
                    "40+ destinos con nombre, descripción, provincia, tipo de atracción (naturaleza, ciudad, gastronomía) y etiquetas por actividad (trekking, playa, museos). El buscador trabaja sobre nombre y descripción; filtros por provincia y tipo de atracción.",
            },
            {
                id: "idea_05",
                titulo: "Recursos para Desarrolladores",
                descripcion:
                    "40+ herramientas con nombre, descripción, categoría (editor, librería, framework, servicio, curso) y etiquetas por lenguaje o tecnología. Los chips de etiqueta permiten filtrar todo lo disponible para un lenguaje específico.",
            },
        ],
    },
];


export const evaluacionComun = [
    "Rutas separadas de controladores (no toda la lógica amontonada en un solo archivo)",
    "Manejo de errores del backend (try/catch, status codes correctos, mensajes claros)",
    "El frontend (HTML/CSS/JS) consume la API real con fetch, sin datos hardcodeados",
    "Variables de entorno en el backend (.env no subido al repo) y URL del backend configurable en el frontend, nunca hardcodeada",
    "Repositorio de GitHub público, ordenado, con README claro con instrucciones de instalación",
    "El proyecto final respeta la idea elegida por el grupo de la lista de ideas",
];