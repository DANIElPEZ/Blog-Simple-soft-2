import express from 'express';
import { initDB } from './database.js';

const app = express();
const db = await initDB();

app.use(express.json());

app.get('/posts', async (req, res) => {
    const posts = await db.all('SELECT * FROM posts');
    res.json(posts);
});

app.post('/posts', async (req, res) => {
    const { title, content } = req.body;

    const result = await db.run(
        'INSERT INTO posts (title, content) VALUES (?, ?)',
        [title, content]
    );

    res.json({
        id: result.lastID,
        title,
        content
    });
});

app.put('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    await db.run(
        'UPDATE posts SET title = ?, content = ? WHERE id = ?',
        [title, content, id]
    );

    res.json({ message: 'Post actualizado' });
});

app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;

    await db.run('DELETE FROM posts WHERE id = ?', [id]);

    res.json({ message: 'Post eliminado' });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
