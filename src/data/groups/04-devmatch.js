const devmatch = {
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
        "Login validado contra el backend (no perfiles precargados en localStorage)",
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
    stack: ["HTML5 + CSS3 + JavaScript", "Bootstrap"],
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
};

export default devmatch;