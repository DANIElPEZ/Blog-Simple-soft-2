# 🚀 Guía de Instalación y Uso

## 📋 Requisitos Previos

- **Node.js**: v16.x o superior
  - Descarga desde: https://nodejs.org/
  - Verifica: `node --version`
  
- **npm**: Incluido con Node.js
  - Verifica: `npm --version`

## 🔧 Instalación Paso a Paso

### 1. Clonar el Repositorio

```bash
git clone https://github.com/DANIElPEZ/Blog-Simple-soft-2.git
cd Blog-Simple-soft-2
```

### 2. Instalar Dependencias

```bash
npm install
```

Esto instalará:
- **express**: Framework web
- **cors**: Middleware de CORS
- **sqlite3**: Base de datos
- **sqlite**: Driver para sqlite3

### 3. Configuración (Opcional)

```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar .env si es necesario
nano .env  # Linux/Mac
# o
notepad .env  # Windows
```

## ▶️ Ejecutar la Aplicación

### Modo Desarrollo (con reinicio automático)

```bash
npm run dev
```

### Modo Producción

```bash
npm start
```

### Salida Esperada

```
✅ Server running at http://localhost:3000
📝 Frontend available at http://localhost:3000
```

## 📱 Acceso a la Aplicación

1. Abre tu navegador
2. Ve a: `http://localhost:3000`
3. Deberías ver la interfaz del blog

## 🧪 Prueba la API

### Usando curl

```bash
# Obtener todos los posts
curl http://localhost:3000/api/posts

# Crear un post
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Mi Post","content":"Contenido del post"}'

# Actualizar un post (ID 1)
curl -X PUT http://localhost:3000/api/posts/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Actualizado","content":"Nuevo contenido"}'

# Eliminar un post (ID 1)
curl -X DELETE http://localhost:3000/api/posts/1
```

### Usando Postman

1. Abre Postman
2. Crea nuevas requests:
   - **GET**: `http://localhost:3000/api/posts`
   - **POST**: `http://localhost:3000/api/posts`
   - **PUT**: `http://localhost:3000/api/posts/:id`
   - **DELETE**: `http://localhost:3000/api/posts/:id`

## 🎯 Flujo de Uso Básico

1. **Crear un Post**
   - Escribe un título
   - Escribe el contenido
   - Haz clic en "💾 Guardar Post"
   - El post aparecerá en la lista

2. **Ver Posts**
   - Los posts se cargan automáticamente
   - Se ordenan por fecha más reciente primero

3. **Editar un Post**
   - Haz clic en "✏️ Editar"
   - Modifica el título o contenido
   - Haz clic en "💾 Guardar Post"

4. **Eliminar un Post**
   - Haz clic en "🗑️ Eliminar"
   - Confirma la eliminación

## 🐛 Solución de Problemas

### Error: "EADDRINUSE: address already in use :::3000"

El puerto 3000 ya está siendo usado. Soluciones:

```bash
# Opción 1: Cambiar el puerto
PORT=3001 npm start

# Opción 2: Matar el proceso anterior (Linux/Mac)
lsof -i :3000
kill -9 <PID>

# Opción 2: Matar el proceso anterior (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Error: "Cannot find module 'express'"

Las dependencias no se instalaron correctamente:

```bash
# Elimina node_modules y package-lock.json
rm -rf node_modules package-lock.json

# Reinstala
npm install
```

### La BD no se crea

Verifica los permisos de la carpeta. La base de datos se crea en: `./blog.db`

## 📊 Estructura de Archivos

```
Blog-Simple-soft-2/
├── src/
│   ├── backend/
│   │   ├── config/database.js
│   │   ├── controllers/postsController.js
│   │   ├── routes/posts.js
│   │   └── app.js
│   └── frontend/
│       ├── assets/css/styles.css
│       ├── js/app.js
│       └── pages/index.html
├── server.js
├── package.json
├── .env.example
├── .gitignore
└── .eslintrc.json
```

## 🔍 Verificar la Instalación

```bash
# Verifica que Node.js esté instalado
node --version

# Verifica que npm esté instalado
npm --version

# Verifica las dependencias instaladas
npm list --depth=0
```

## 🛑 Detener la Aplicación

```bash
# Presiona Ctrl+C en la terminal
```

## 📚 Referencias

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [MDN Web Docs](https://developer.mozilla.org/)

---

**Última actualización:** Abril 2026
