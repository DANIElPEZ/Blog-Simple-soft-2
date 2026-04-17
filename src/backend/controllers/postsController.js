let db;

export function setDB(database) {
    db = database;
    console.log('✅ Database set in controller');
}

export const postsController = {
    async getAll(req, res) {
        try {
            console.log('📖 Getting all posts...');
            const posts = await db.all('SELECT * FROM posts ORDER BY createdAt DESC');
            console.log('✅ Posts retrieved:', posts.length, 'posts found');
            res.json(posts);
        } catch (error) {
            console.error('❌ Error fetching posts:', error.message);
            console.error('Stack:', error.stack);
            res.status(500).json({ error: 'Error fetching posts', details: error.message });
        }
    },

    async create(req, res) {
        try {
            const { title, content, author } = req.body;

            if (!title || !content || !author) {
                return res.status(400).json({ error: 'Title, content and author are required' });
            }

            const result = await db.run(
                'INSERT INTO posts (title, content, author) VALUES (?, ?, ?)',
                [title, content, author]
            );

            res.status(201).json({
                id: result.lastID,
                title,
                content,
                author
            });
        } catch (error) {
            console.error('Error creating post:', error);
            res.status(500).json({ error: 'Error creating post' });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const { title, content, author } = req.body;

            if (!title || !content || !author) {
                return res.status(400).json({ error: 'Title, content and author are required' });
            }

            await db.run(
                'UPDATE posts SET title = ?, content = ?, author = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
                [title, content, author, id]
            );

            res.json({ ok: true, message: 'Post updated successfully' });
        } catch (error) {
            console.error('Error updating post:', error);
            res.status(500).json({ error: 'Error updating post' });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;

            await db.run('DELETE FROM posts WHERE id = ?', [id]);

            res.json({ ok: true, message: 'Post deleted successfully' });
        } catch (error) {
            console.error('Error deleting post:', error);
            res.status(500).json({ error: 'Error deleting post' });
        }
    }
};
