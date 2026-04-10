# Estructura del Proyecto Blog Simple

```
Blog-Simple-soft-2/
├── src/                                    # Código fuente
│   ├── app.js                             # Configuración de Express
│   ├── server.js                          # Punto de entrada
│   ├── config/
│   │   └── database.js                    # Configuración de la BD
│   ├── controllers/
│   │   └── postsController.js             # Lógica de negocio
│   ├── middleware/
│   │   └── errorHandler.js                # Manejo de errores
│   ├── models/
│   │   └── Post.js                        # Modelo de Post
│   ├── routes/
│   │   └── posts.js                       # Definición de rutas
│   └── utils/
│       └── fileStorage.js                 # Utilidades de almacenamiento
├── data/                                   # Datos
│   └── posts.json                         # Base de datos (JSON)
├── public/                                 # Archivos estáticos
│   └── index.html                         # Página principal
├── database.js                            # Servidor legacy (heredado)
├── examples.js                            # Ejemplos de uso
├── package.json                           # Dependencias del proyecto
├── .env                                   # Variables de entorno (desarrollo)
├── .env.example                           # Plantilla de env
├── .gitignore                             # Archivos a ignorar
└── readme.md                              # Documentación
```

## 📂 Descripción de carpetas

### `src/`
- **app.js**: Configuración principal de Express, middleware y rutas
- **server.js**: Punto de entrada del servidor (ejecutar con `npm start`)

### `src/config/`
- **database.js**: Gestión de configuración de la BD (rutas de archivos)

### `src/controllers/`
- **postsController.js**: Funciones para manejar cada endpoint de la API

### `src/middleware/`
- **errorHandler.js**: Manejo centralizado de errores del servidor

### `src/models/`
- **Post.js**: Clase Post con validaciones y métodos

### `src/routes/`
- **posts.js**: Definición de rutas HTTP de la API

### `src/utils/`
- **fileStorage.js**: Funciones para leer/escribir en archivos JSON

### `data/`
- **posts.json**: Almacenamiento de posts (se crea automáticamente)

### `public/`
- **index.html**: Página web que documenta la API

## 🚀 Cómo iniciar

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor
npm start

# En desarrollo con reinicio automático:
npm run dev

# 3. Abrir en navegador
http://localhost:3000
```

## 📡 API Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/posts` | Obtener todos los posts |
| GET | `/api/posts/:id` | Obtener post por ID |
| POST | `/api/posts` | Crear nuevo post |
| PUT | `/api/posts/:id` | Actualizar post |
| DELETE | `/api/posts/:id` | Eliminar post |

## 📝 Flujo de una solicitud

```
Cliente (Postman/Browser)
    ↓
Express App (src/app.js)
    ↓
Route Handler (src/routes/posts.js)
    ↓
Controller (src/controllers/postsController.js)
    ↓
Model/Validation (src/models/Post.js)
    ↓
Storage (src/utils/fileStorage.js)
    ↓
File System (data/posts.json)
```

## 🔧 Variables de entorno

Copiar `.env.example` a `.env` y configurar según sea necesario:

```
PORT=3000           # Puerto del servidor
HOST=localhost      # Host
NODE_ENV=development # Ambiente
```
