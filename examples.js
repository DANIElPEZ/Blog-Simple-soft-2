// Ejemplos de uso de la API del Blog Simple
// Ejecutar desde la terminal o desde Postman/Insomnia

// =================================
// BASE URL
// =================================
const BASE_URL = 'http://localhost:3000/api/posts';

// =================================
// 1. OBTENER TODOS LOS POSTS
// =================================
fetch(BASE_URL)
    .then(res => res.json())
    .then(data => console.log('Todos los posts:', data));

// =================================
// 2. CREAR UN NUEVO POST
// =================================
fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        title: 'Mi primer post',
        content: 'Este es el contenido de mi primer post sobre Node.js y Express'
    })
})
    .then(res => res.json())
    .then(data => console.log('Post creado:', data));

// =================================
// 3. OBTENER UN POST POR ID
// =================================
// Primero obtén un ID de la lista de posts
fetch(`${BASE_URL}/1234567890`)
    .then(res => res.json())
    .then(data => console.log('Post encontrado:', data));

// =================================
// 4. ACTUALIZAR UN POST
// =================================
fetch(`${BASE_URL}/1234567890`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        title: 'Post actualizado',
        content: 'Contenido actualizado del post'
    })
})
    .then(res => res.json())
    .then(data => console.log('Post actualizado:', data));

// =================================
// 5. ELIMINAR UN POST
// =================================
fetch(`${BASE_URL}/1234567890`, {
    method: 'DELETE'
})
    .then(res => res.json())
    .then(data => console.log('Respuesta:', data));

// =================================
// COMANDOS CURL PARA TERMINAL
// =================================
/*

# Obtener todos los posts
curl http://localhost:3000/api/posts

# Crear un post
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Mi post","content":"Contenido"}'

# Obtener post por ID
curl http://localhost:3000/api/posts/1707033600000

# Actualizar post
curl -X PUT http://localhost:3000/api/posts/1707033600000 \
  -H "Content-Type: application/json" \
  -d '{"title":"Actualizado"}'

# Eliminar post
curl -X DELETE http://localhost:3000/api/posts/1707033600000

*/
