import express from 'express';
import { initDB } from './database.js';
import cors from 'cors';

const app = express();
const db = await initDB();

app.use(cors());
app.use(express.json());

// --- AUTH ---
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Usamos INSERT OR IGNORE o capturamos el error si el usuario existe
        await db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
        res.json({ success: true });
    } catch (err) {
        res.status(400).json({ error: "El usuario ya existe o hay un error en los datos" });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    // IMPORTANTE: Verifica que los nombres de las columnas en database.js sean 'username' y 'password'
    const user = await db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
    
    if (user) {
        res.json({ success: true, user: { id: user.id, username: user.username } });
    } else {
        res.status(401).json({ error: "Credenciales inválidas" });
    }
});

// --- POSTS ---
app.get('/posts', async (req, res) => {
    const posts = await db.all('SELECT * FROM posts');
    res.json(posts);
});

app.get('/posts/:id', async (req, res) => {
    const post = await db.get('SELECT * FROM posts WHERE id = ?', [req.params.id]);
    if (post) res.json(post);
    else res.status(404).json({ error: "Post no encontrado" });
});

app.post('/posts', async (req, res) => {
    const { title, content, userId, username } = req.body;
    if (!userId) return res.status(403).json({ error: "No autorizado" });
    
    const result = await db.run(
        'INSERT INTO posts (title, content, author_id, author_name) VALUES (?, ?, ?, ?)', 
        [title, content, userId, username]
    );
    res.json({ id: result.lastID, title, content });
});

app.put('/posts/:id', async (req, res) => {
    const { title, content, userId } = req.body;
    const postId = req.params.id;

    // Validación de seguridad: ¿El que edita es el dueño?
    const post = await db.get('SELECT author_id FROM posts WHERE id = ?', [postId]);
    if (!post || post.author_id != userId) {
        return res.status(403).json({ error: "No tienes permiso para editar este post" });
    }

    await db.run('UPDATE posts SET title = ?, content = ? WHERE id = ?', [title, content, postId]);
    res.json({ ok: true });
});

app.delete('/posts/:id', async (req, res) => {
    const userId = req.headers['user-id']; // El ID viene del frontend
    const postId = req.params.id;

    // Validación de seguridad: Solo el autor puede borrar
    const post = await db.get('SELECT author_id FROM posts WHERE id = ?', [postId]);
    
    if (!post) return res.status(404).json({ error: "Post no existe" });

    if (post.author_id == userId) {
        await db.run('DELETE FROM posts WHERE id = ?', [postId]);
        res.json({ ok: true });
    } else {
        res.status(403).json({ error: "No autorizado: No eres el dueño" });
    }
});

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));