# 📝 Blog Simple - Documentación Completa

## 🎯 ¿Qué hace el proyecto?

**Blog Simple** es una aplicación web full-stack que permite crear, editar, listar y eliminar publicaciones (posts) de blog. Es un proyecto educativo desarrollado por el **Grupo 3 DINAMITA** que demuestra conceptos fundamentales de desarrollo web con **Node.js**, **Express**, **SQLite** y **JavaScript vanilla** en el frontend.

---

## 🏗️ Arquitectura del Proyecto

```
Blog-Simple-soft-2/
├── 📄 server.js                 # Punto de entrada principal
├── 📄 package.json              # Dependencias del proyecto
├── 📄 index.html                # Interfaz principal (DEPRECATED)
├── 📄 frontend.js               # Lógica del cliente (versión actual)
├── 📄 database.js               # Configuración de BD (DEPRECATED)
│
├── 📁 src/
│   ├── 📁 backend/
│   │   ├── 📄 app.js                    # Aplicación Express configurada
│   │   ├── 📁 config/
│   │   │   └── 📄 database.js           # Inicialización de SQLite
│   │   ├── 📁 controllers/
│   │   │   └── 📄 postsController.js    # Lógica CRUD de posts
│   │   ├── 📁 middleware/
│   │   ├── 📁 routes/
│   │   │   └── 📄 posts.js              # Rutas API /api/posts
│   │
│   └── 📁 frontend/
│       ├── 📁 assets/
│       │   └── 📁 css/
│       │       └── 📄 styles.css        # Estilos de la aplicación
│       ├── 📁 js/
│       │   └── 📄 app.js                # JavaScript frontend (versión mejorada)
│       └── 📁 pages/
│           └── 📄 index.html            # Página principal mejorada
│
└── 📁 docs/
    ├── 📄 ARCHITECTURE.md
    ├── 📄 INSTALLATION.md
    ├── 📄 MIGRATION.md
    └── 📄 SECURITY.md
```

---

## 🚀 Cómo Funciona

### 1️⃣ **Inicio del Servidor**

Cuando ejecutas `npm start`, ocurre lo siguiente:

```
server.js (puerto 3000)
   ↓
src/backend/app.js
   ├── Middleware: CORS + express.json()
   ├── Rutas estáticas: Frontend desde src/frontend/pages/
   ├── Rutas API: /api/posts
   └── Inicializa BD desde src/backend/config/database.js
```

**Base de Datos (SQLite)**:
```sql
CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,                  ✨ Campo obligatorio
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### 2️⃣ **Frontend - Interfaz de Usuario**

La página se carga en `http://localhost:3000/` y muestra:

```
┌─────────────────────────────────┐
│  📝 Blog                        │
├─────────────────────────────────┤
│ ┌──── FORMULARIO ──────────────┐│
│ │ Nombre de usuario: [_______]  ││
│ │ Título: [________________]    ││
│ │ Contenido: [_______________]  ││
│ │          [💾 Guardar Post]    ││
│ └──────────────────────────────┘│
├─────────────────────────────────┤
│ 📰 Lista de Publicaciones       │
├─────────────────────────────────┤
│ Titulo del Post                 │
│ 17/04/2026 • Juan Pérez        │ ✨ Formato personalizado
│ Contenido del post...           │
│ [✏️ Editar] [🗑️ Eliminar]      │
└─────────────────────────────────┘
```

---

## 📡 API REST - Endpoints

La aplicación expone una API REST en `/api/posts`:

### **GET** `/api/posts`
Obtiene todas las publicaciones ordenadas por fecha (más recientes primero).

**Respuesta:**
```json
[
  {
    "id": 1,
    "title": "Mi primer post",
    "content": "Contenido aquí...",
    "author": "Juan Pérez",
    "createdAt": "2026-04-17T10:30:00Z",
    "updatedAt": "2026-04-17T10:30:00Z"
  }
]
```

### **POST** `/api/posts`
Crea una nueva publicación.

**Request:**
```json
{
  "title": "Nuevo post",
  "content": "Contenido del post",
  "author": "Tu nombre"
}
```

**Validación:** Todos los campos (title, content, author) son obligatorios.

### **PUT** `/api/posts/:id`
Actualiza una publicación existente.

**Request:**
```json
{
  "title": "Título actualizado",
  "content": "Contenido actualizado",
  "author": "Nombre actualizado"
}
```

### **DELETE** `/api/posts/:id`
Elimina una publicación por su ID.

---

## 🔄 Flujo de Datos

### 📝 Crear un Post

```
Usuario escribe en formulario
          ↓
Click en "Guardar Post"
          ↓
JavaScript captura datos
(title, content, author)
          ↓
POST a http://localhost:3000/api/posts
          ↓
Backend valida datos
          ↓
Inserta en SQLite
          ↓
Retorna { id, title, content, author }
          ↓
Frontend recarga lista de posts
          ↓
Limpia formulario y muestra nuevo post
```

### ✏️ Editar un Post

```
Usuario hace click en "Editar"
          ↓
JavaScript obtiene id, title, content, author
          ↓
Llena formulario con datos actuales
          ↓
Usuario modifica campos
          ↓
Click en "Guardar Post"
          ↓
PUT a http://localhost:3000/api/posts/:id
          ↓
Backend actualiza en SQLite
          ↓
Frontend recarga lista
```

### 🗑️ Eliminar un Post

```
Usuario hace click en "Eliminar"
          ↓
DELETE a http://localhost:3000/api/posts/:id
          ↓
Backend elimina de SQLite
          ↓
Frontend recarga lista
```

---

## 🛠️ Tecnologías Utilizadas

| Componente | Tecnología | Versión |
|-----------|-----------|---------|
| **Runtime** | Node.js | - |
| **Backend Framework** | Express | ^5.2.1 |
| **Base de Datos** | SQLite3 | ^6.0.1 |
| **ORM/Query Builder** | sqlite (npm) | ^5.1.1 |
| **CORS** | cors | ^2.8.6 |
| **Frontend** | JavaScript Vanilla | ES6+ |
| **Estilos** | CSS3 | - |

---

## 📋 Características Principales

✅ **CRUD Completo**: Crear, Leer, Actualizar, Eliminar posts

✅ **Campo de Autor Obligatorio**: Cada publicación debe tener un nombre de usuario

✅ **Fecha Automática**: Se registra automáticamente fecha de creación y actualización

✅ **Interfaz Responsiva**: Diseño moderno con colores gradientes

✅ **Validación de Datos**: Campos obligatorios validados en frontend y backend

✅ **Escapado de HTML**: Previene inyecciones XSS

✅ **Manejo de Errores**: Mensajes claros al usuario

✅ **API REST**: Endpoints bien estructurados

---

## 🚦 Instalación y Ejecución

### Requisitos
- Node.js (v16+)
- npm o yarn

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/DANIElPEZ/Blog-Simple-soft-2.git
cd Blog-Simple-soft-2
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar el servidor**
```bash
npm start
```

4. **Acceder a la aplicación**
```
http://localhost:3000
```

---

## 🔨 Comandos Disponibles

```bash
npm start      # Inicia el servidor en modo producción
npm run dev    # Inicia el servidor con auto-reload (node --watch)
npm test       # Ejecuta pruebas (no configurado aún)
```

---

## 📊 Base de Datos

### Campos de la Tabla `posts`

| Campo | Tipo | Descripción | Ejemplo |
|-------|------|-------------|---------|
| `id` | INTEGER PK | ID único auto-incrementado | 1 |
| `title` | TEXT NOT NULL | Título del post | "Mi primer post" |
| `content` | TEXT NOT NULL | Contenido del post | "Hola mundo..." |
| `author` | TEXT NOT NULL | Nombre del usuario ✨ | "Juan Pérez" |
| `createdAt` | DATETIME | Fecha de creación | 2026-04-17 10:30:00 |
| `updatedAt` | DATETIME | Fecha de última edición | 2026-04-17 11:00:00 |

---

## 🎨 Detalles de Visualización

### Formato de Fecha
- **Locales**: es-ES (España)
- **Formato**: DD/MM/YYYY (ej: 17/04/2026)

### Formato de Publicación
```
Título del Post
17/04/2026 • Nombre del Usuario
Contenido completo del post...
[✏️ Editar] [🗑️ Eliminar]
```

---

## 🔐 Seguridad

- ✅ **CORS Habilitado**: Permite peticiones desde el mismo origen
- ✅ **Escapado de HTML**: Previene XSS
- ✅ **Validación en Backend**: No confía solo en validación del cliente
- ✅ **Content-Type**: Validación de tipos de contenido

### Recomendaciones Futuras
- Implementar autenticación de usuarios
- Agregar validación de longitud de campos
- Rate limiting en la API
- HTTPS en producción

---

## 📁 Estructura de Archivos Clave

### `server.js`
Punto de entrada que inicia la aplicación Express.

### `src/backend/app.js`
Configura Express con middleware y rutas.

### `src/backend/config/database.js`
Abre conexión SQLite e inicializa tabla de posts.

### `src/backend/controllers/postsController.js`
Lógica CRUD: getAll(), create(), update(), delete()

### `src/backend/routes/posts.js`
Define las 4 rutas REST (GET, POST, PUT, DELETE)

### `src/frontend/js/app.js`
JavaScript del cliente que:
- Captura eventos del formulario
- Realiza peticiones HTTP a la API
- Actualiza el DOM con posts
- Maneja edición y eliminación

### `src/frontend/assets/css/styles.css`
Estilos CSS con diseño gradiente moderno.

---

## 🐛 Troubleshooting

### Error: "Cannot find module 'express'"
```bash
npm install
```

### Error: "Port 3000 already in use"
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :3000
kill -9 <PID>
```

### Base de datos corrupta
```bash
# Eliminar base de datos
rm blog.db

# Reiniciar servidor (recrea la DB)
npm start
```

---

## 📝 Notas de Desarrollo

- El proyecto usa **ES6 Modules** (`type: "module"` en package.json)
- **Frontend y Backend en el mismo servidor**: Más simple para desarrollo
- **SQLite en memoria**: Podría implementarse para pruebas
- **Sin autenticación**: Actualmente cualquiera puede crear/editar/borrar

---

## 👥 Autor

**Grupo 3 DINAMITA**

---

## 📖 Documentación Adicional

Ver la carpeta `/docs/` para más información:
- `ARCHITECTURE.md` - Detalles de arquitectura
- `INSTALLATION.md` - Guía de instalación
- `MIGRATION.md` - Migraciones de BD
- `SECURITY.md` - Consideraciones de seguridad

---

## 📄 Licencia

ISC

---

**Última actualización:** 17 de abril de 2026
