const chatapp = {
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
};

export default chatapp;