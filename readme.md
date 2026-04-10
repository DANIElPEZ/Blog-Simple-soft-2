# Blog Simple - Sistema de Publicaciones

**Grupo 3 DINAMITA**
- Daniel Gonzalez
- Andres Pineda
- Juan Ramos

---

Backend API para un sistema de gestión de publicaciones (blog) desarrollado con Express.js

## Descripción

Este proyecto simula un sistema de publicaciones tipo blog donde se pueden:
- ✓ Crear posts
- ✓ Editar posts
- ✓ Eliminar posts
- ✓ Ver listado de posts

## Características

- API RESTful completa
- Almacenamiento en JSON
- Servidor Express.js
- Gestión de cambios distribuidos
- Estructura lista para conflictos Git

## Instalación

```bash
# Instalar dependencias
npm install
```

## Uso

### Iniciar servidor

```bash
# Modo producción
npm start

# Modo desarrollo (con nodemon)
npm run dev
```

El servidor estará disponible en: `http://localhost:3000`

## API Endpoints

### GET /api/posts
Obtener todos los posts
```bash
curl http://localhost:3000/api/posts
```

### GET /api/posts/:id
Obtener un post por ID
```bash
curl http://localhost:3000/api/posts/1234567890
```

### POST /api/posts
Crear un nuevo post
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Mi primer post","content":"Contenido del post"}'
```

### PUT /api/posts/:id
Actualizar un post
```bash
curl -X PUT http://localhost:3000/api/posts/1234567890 \
  -H "Content-Type: application/json" \
  -d '{"title":"Post actualizado"}'
```

### DELETE /api/posts/:id
Eliminar un post
```bash
curl -X DELETE http://localhost:3000/api/posts/1234567890
```

## Estructura de datos

Cada post contiene:
```json
{
  "id": "1234567890",
  "title": "Título del post",
  "content": "Contenido completo",
  "createdAt": "2026-04-10T12:00:00.000Z",
  "updatedAt": "2026-04-10T12:30:00.000Z"
}
```

## Archivos del proyecto

- `database.js` - Servidor Express y gestión de posts
- `package.json` - Dependencias del proyecto
- `posts.json` - Base de datos de posts (se crea automáticamente)
- `readme.md` - Este archivo

## Dependencias

- **express**: Framework web para Node.js
- **nodemon**: (dev) Reinicia automáticamente el servidor en desarrollo

## Tecnologías

- Node.js
- Express.js
- JSON (almacenamiento)

## Puerto

Por defecto: `3000` (configurable con variable de entorno `PORT`)

```bash
PORT=8080 npm start
```