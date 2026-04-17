# 🏗️ Arquitectura del Proyecto

## Descripción General

Este proyecto implementa un blog simple siguiendo el patrón **MVC (Model-View-Controller)** con una separación clara entre frontend y backend.

## 🏛️ Estructura MVC

### Backend (src/backend)

#### 1. **Controllers** (`controllers/postsController.js`)
- Maneja la lógica de negocio
- Procesa las solicitudes HTTP
- Valida los datos de entrada
- Retorna respuestas JSON

Métodos:
- `getAll()` - Obtiene todos los posts
- `create()` - Crea un nuevo post
- `update()` - Actualiza un post existente
- `delete()` - Elimina un post

#### 2. **Routes** (`routes/posts.js`)
- Define los endpoints de la API
- Mapea URLs a métodos del controlador
- Especifica el método HTTP (GET, POST, PUT, DELETE)

#### 3. **Config** (`config/database.js`)
- Inicializa la conexión a SQLite
- Crea las tablas necesarias
- Exporta funciones de conexión

#### 4. **App** (`app.js`)
- Configura Express
- Configura middleware (CORS, JSON)
- Registra las rutas
- Inicia el servidor

### Frontend (src/frontend)

#### 1. **HTML** (`pages/index.html`)
- Estructura del sitio
- Formulario para crear/editar posts
- Contenedor para la lista de posts
- Referencias a CSS y JS

#### 2. **CSS** (`assets/css/styles.css`)
- Estilos responsivos
- Diseño moderno con gradientes
- Animaciones y transiciones
- Media queries para móviles

#### 3. **JavaScript** (`js/app.js`)
- Interacción con el DOM
- Llamadas a la API REST
- Validación de datos
- Manipulación de posts

## 🔄 Flujo de Datos

### Crear/Actualizar Post

```
Usuario → Formulario HTML
        ↓
JavaScript (app.js) valida datos
        ↓
fetch() → API REST (/api/posts)
        ↓
Express Router
        ↓
Controller (validación + lógica)
        ↓
Database (INSERT/UPDATE)
        ↓
Response JSON
        ↓
JavaScript actualiza DOM
        ↓
Usuario ve cambios
```

### Obtener Posts

```
Página carga
        ↓
JavaScript (app.js) llama loadPosts()
        ↓
fetch() → API REST (GET /api/posts)
        ↓
Express Router
        ↓
Controller (obtiene datos)
        ↓
Database (SELECT)
        ↓
Response JSON (array de posts)
        ↓
JavaScript renderiza en DOM
        ↓
Usuario ve posts
```

## 📊 Modelo de Datos

### Tabla: Posts

```sql
CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | INTEGER | Identificador único |
| `title` | TEXT | Título del post |
| `content` | TEXT | Contenido del post |
| `createdAt` | DATETIME | Fecha de creación |
| `updatedAt` | DATETIME | Fecha de última actualización |

## 🛠️ Patrones Implementados

### 1. **Inyección de Dependencias**
```javascript
// En app.js
setDB(db); // Pasa la BD al controlador
```

### 2. **Manejo de Errores**
```javascript
try {
    // Operación
} catch (error) {
    // Respuesta de error con código HTTP
}
```

### 3. **Validación de Entrada**
```javascript
if (!title || !content) {
    return res.status(400).json({ error: 'Campo requerido' });
}
```

### 4. **Prevención de XSS**
```javascript
// En frontend
function escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
```

## 🔐 Seguridad

- **CORS**: Configurado para aceptar solicitudes de origen local
- **Validación**: Todos los inputs se validan
- **Prepared Statements**: Se usan placeholders (?) para evitar SQL injection
- **Escape de HTML**: Se previene XSS en el frontend

## 📈 Escalabilidad

Para mejorar la escalabilidad en el futuro:

1. **Autenticación**: Agregar JWT o sesiones
2. **Autorización**: Validar que usuarios solo editen sus posts
3. **Caché**: Implementar Redis
4. **Base de Datos**: Migrar a PostgreSQL
5. **Tests**: Agregar pruebas unitarias e integración
6. **Logging**: Implementar sistema de logs

## 🚀 Despliegue

### Estructura para producción:

```
/
├── frontend/     → Servido por CDN
├── backend/      → Servidor Node.js
├── db/          → Base de datos
└── logs/        → Archivos de log
```

---

**Última actualización:** Abril 2026
