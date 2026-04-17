const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const STORAGE_FILE = path.join(__dirname, 'posts.json');

// Middleware
app.use(express.json());

// Función auxiliar: leer posts del archivo
function getPosts() {
    try {
        if (fs.existsSync(STORAGE_FILE)) {
            const data = fs.readFileSync(STORAGE_FILE, 'utf-8');
            return JSON.parse(data);
        }
    } catch (error) {
        console.error('Error reading posts:', error);
    }
    return [];
}

// Función auxiliar: guardar posts en archivo
function savePosts(posts) {
    try {
        fs.writeFileSync(STORAGE_FILE, JSON.stringify(posts, null, 2));
    } catch (error) {
        console.error('Error saving posts:', error);
    }
}

// GET - Obtener todos los posts
app.get('/api/posts', (req, res) => {
    const posts = getPosts();
    res.json(posts);
});

// GET - Obtener post por ID
app.get('/api/posts/:id', (req, res) => {
    const posts = getPosts();
    const post = posts.find(p => p.id === req.params.id);
    
    if (!post) {
        return res.status(404).json({ error: 'Post no encontrado' });
    }
    res.json(post);
});

// POST - Crear nuevo post
app.post('/api/posts', (req, res) => {
    const posts = getPosts();
    const newPost = {
        id: Date.now().toString(),
        ...req.body,
        createdAt: new Date().toISOString()
    };
    
    posts.push(newPost);
    savePosts(posts);
    res.status(201).json(newPost);
});

// PUT - Actualizar post
app.put('/api/posts/:id', (req, res) => {
    const posts = getPosts();
    const index = posts.findIndex(p => p.id === req.params.id);
    
    if (index === -1) {
        return res.status(404).json({ error: 'Post no encontrado' });
    }
    
    posts[index] = { ...posts[index], ...req.body, updatedAt: new Date().toISOString() };
    savePosts(posts);
    res.json(posts[index]);
});

// DELETE - Eliminar post
app.delete('/api/posts/:id', (req, res) => {
    const posts = getPosts();
    const filteredPosts = posts.filter(p => p.id !== req.params.id);
    
    if (posts.length === filteredPosts.length) {
        return res.status(404).json({ error: 'Post no encontrado' });
    }
    
    savePosts(filteredPosts);
    res.json({ message: 'Post eliminado correctamente' });
});

// Ruta inicial
app.get('/', (req, res) => {
    res.json({ message: 'Servidor de Blog iniciado', version: '1.0.0' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`✓ Servidor corriendo en http://localhost:${PORT}`);
    console.log(`✓ API de posts disponible en http://localhost:${PORT}/api/posts`);
});
