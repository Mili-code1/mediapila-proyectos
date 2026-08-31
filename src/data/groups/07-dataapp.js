const dataapp = {
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
        "Login de un único usuario (sin roles ni registro múltiple): hay que iniciar sesión para entrar, aunque la app no sea multiusuario",
        "Búsqueda de un término (ciudad, moneda, fecha, región, etc.) que el frontend envía al backend",
        "El backend llama a la API externa y guarda la API key en variable de entorno; nunca se expone en el código del frontend",
        "Manejo de errores visible en la UI (nunca solo en consola): término no encontrado, permiso denegado, límite de la API agotado",
        "Todas las llamadas (frontend→backend y backend→API externa) con async/await y try/catch",
        "Toggle entre unidades o modos de visualización sin repetir la llamada a la API: la conversión se calcula en el frontend con los datos ya obtenidos",
        "Fondo o estilo visual que cambia dinámicamente según el dato principal devuelto por la búsqueda",
        "Indicadores visuales según el valor devuelto (niveles, rangos, estados) — por ejemplo un semáforo de riesgo, una alerta, o una escala de colores",
        "Guardar búsquedas como favoritas, accesibles desde cualquier parte de la app",
        "Historial de las últimas búsquedas sin duplicados: repetir una búsqueda existente la mueve al frente",
        "Si la idea elegida lo permite: geolocalización, pidiendo permiso y cargando datos de la ubicación actual",
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
        { metodo: "POST", ruta: "/api/auth/login", desc: "Valida las credenciales del único usuario" },
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
    stack: ["HTML5 + CSS3 + JavaScript", "Bootstrap", "API externa (según la idea elegida)"],
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
};

export default dataapp;