const searchapp = {
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
        "Login de un único usuario (sin roles ni registro múltiple): hay que iniciar sesión para entrar, aunque la app no sea multiusuario",
        "Dataset de 40+ registros (título, descripción, contenido, categoría, etiquetas, fecha, link) cargado en MongoDB con un script de seed, con al menos 5 categorías distintas",
        "Búsqueda por texto simultánea en título, descripción y etiquetas, disparada al presionar Enter o el botón buscar (no en tiempo real)",
        "Filtros combinables: por categoría, por etiqueta (chips generados dinámicamente desde el dataset) y por rango de fechas",
        "Ordenamiento: por relevancia (título > descripción > etiquetas), por fecha o por título A-Z/Z-A",
        "Botón para limpiar todos los filtros",
        "Resultados en cards (título, categoría, etiquetas, fecha, descripción corta), paginados de a 8 con numeración, con scroll al tope de la página al cambiar de página",
        "El paginado se recalcula siempre desde la página 1 al cambiar cualquier filtro",
        "Modal de vista previa con el contenido completo y el link",
        "Favoritos con una nota personal corta por registro",
        "Historial de las últimas 10 búsquedas como chips clicables, sin duplicados (repetir una búsqueda la mueve al frente)",
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
        { metodo: "POST", ruta: "/api/auth/login", desc: "Valida las credenciales del único usuario" },
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
    stack: ["HTML5 + CSS3 + JavaScript", "Bootstrap"],
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
};

export default searchapp;