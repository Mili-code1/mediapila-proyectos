const serviapp = {
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
        {
            metodo: "GET",
            ruta: "/api/profesionales",
            desc: "Lista con filtros ?zona= &disponibilidad=",
        },
        {
            metodo: "GET",
            ruta: "/api/profesionales/:id",
            desc: "Ficha de un profesional con sus servicios y reseñas",
        },
        {
            metodo: "POST",
            ruta: "/api/profesionales",
            desc: "Alta de profesional (registro como oferente)",
        },
        {
            metodo: "GET",
            ruta: "/api/servicios",
            desc: "Búsqueda con filtros ?categoria= &precioMax= &estrellasMin=",
        },
        {
            metodo: "POST",
            ruta: "/api/servicios",
            desc: "El oferente carga un servicio nuevo",
        },
        {
            metodo: "POST",
            ruta: "/api/solicitudes",
            desc: "El cliente solicita un servicio",
        },
        {
            metodo: "GET",
            ruta: "/api/solicitudes/profesional/:id",
            desc: "Solicitudes recibidas por un profesional",
        },
        {
            metodo: "PUT",
            ruta: "/api/solicitudes/:id/estado",
            desc: "Cambia el estado de una solicitud",
        },
        {
            metodo: "POST",
            ruta: "/api/resenas",
            desc: "Crea una reseña (valida solicitud completada y unicidad del par)",
        },
        {
            metodo: "GET",
            ruta: "/api/resenas/profesional/:id",
            desc: "Reseñas de un profesional",
        },
    ],
    entregables: [
        "Repositorio de GitHub público con el proyecto completo",
        "Variables de entorno para el backend (.env no subido al repo, con el connection string de MongoDB, puerto, etc.)",
        "README con instrucciones de instalación y cómo levantar el proyecto",
    ],
    stack: [
        "HTML5 + CSS3 + JavaScript",
        "Node.js + Express",
        "MongoDB + Mongoose",
    ],
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
};

export default serviapp;
