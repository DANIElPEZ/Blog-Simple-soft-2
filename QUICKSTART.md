# 🚀 Guía de Inicio Rápido

## Prerrequisitos

- Node.js v14+ instalado
- npm o yarn

## 📦 Instalación

```bash
# 1. Navegar al proyecto
cd Blog-Simple-soft-2

# 2. Instalar dependencias
npm install
```

## ▶️ Ejecutar el servidor

### Modo producción
```bash
npm start
```

### Modo desarrollo (con auto-reinicio)
```bash
npm run dev
```

El servidor estará disponible en: **http://localhost:3000**

## 🧪 Probar la API

### Opción 1: Con Postman/Insomnia

1. Importar la colección (si existe)
2. Enviar solicitudes a: `http://localhost:3000/api/posts`

### Opción 2: Con curl en terminal

#### Obtener todos los posts
```bash
curl http://localhost:3000/api/posts
```

#### Crear nuevo post
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Mi primer post\",\"content\":\"Contenido del post\"}"
```

#### Obtener post por ID
```bash
curl http://localhost:3000/api/posts/1234567890
```

#### Actualizar post
```bash
curl -X PUT http://localhost:3000/api/posts/1234567890 \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Título actualizado\"}"
```

#### Eliminar post
```bash
curl -X DELETE http://localhost:3000/api/posts/1234567890
```

### Opción 3: Desde el navegador

Abrir: **http://localhost:3000**

Se verá una página HTML con documentación de la API.

## 📊 Estructura del proyecto

Ver el archivo `ESTRUCTURA.md` para detalles completos.

## 🐛 Solución de problemas

### El puerto 3000 ya está en uso
```bash
PORT=8080 npm start
```

### No se crean posts
- Verificar que la carpeta `data/` existe
- Verificar permisos de escritura
- Revisar la consola para errores

### Cambios no se aplican en modo dev
- Asegurar que nodemon está instalado: `npm list nodemon`
- Reiniciar el servidor

## 📝 Notas

- Los posts se guardan en `data/posts.json`
- No requiere base de datos externa
- Todos los IDs se generan automáticamente con timestamp
- Los campos createdAt y updatedAt se manejan automáticamente
