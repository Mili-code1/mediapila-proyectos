const ticketapp = {
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
        "Login con roles diferenciados: admin y usuario, cada uno con una vista completamente distinta",
        "Admin: gestiona el contenido según la idea elegida (eventos, partidos, funciones, viajes, etc.)",
        "Admin: no puede comprar entradas",
        "Usuario: no puede acceder al panel de administración",
        "La restricción de acceso por rol se valida también en el backend, no alcanza con ocultar botones en el frontend",
        "Redirección automática si se intenta acceder por URL a una sección no autorizada",
        "Usuario: ve el listado de ítems disponibles con filtros",
        "Usuario: navega el mapa visual del espacio elegido, con estados libre / bloqueado / vendido",
        "Usuario: selecciona varios lugares a la vez; quedan bloqueados de inmediato en el backend (ya no vía localStorage entre pestañas)",
        "Usuario: carrito con lista de lugares elegidos, subtotal por sección y total acumulado",
        "Usuario: confirma la compra y recibe un número de orden generado por el backend",
        "Usuario: sección 'Mis entradas' con las compras agrupadas por evento/función",
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
    stack: ["HTML5 + CSS3 + JavaScript", "Bootstrap"],
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
            titulo: "Feria de Stands",
            descripcion:
                "El mapa es la planta de una feria (de emprendedores, gastronómica, de diseño) dividida en stands por rubro o categoría, cada uno con su tamaño y precio. Acá quien 'compra' es quien quiere exponer, no quien asiste: el usuario reserva uno o varios stands para su feria, los bloquea y confirma con un número de orden. El admin carga ferias con fecha, rubros habilitados y el mapa de stands disponibles.",
        },
    ],
};

export default ticketapp;