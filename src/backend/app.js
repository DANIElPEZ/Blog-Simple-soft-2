import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { initDB } from './config/database.js';
import { router as postsRouter } from './routes/posts.js';
import { setDB } from './controllers/postsController.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from frontend
app.use(express.static(path.join(__dirname, '../../src/frontend/pages')));
app.use('/css', express.static(path.join(__dirname, '../../src/frontend/assets/css')));
app.use('/js', express.static(path.join(__dirname, '../../src/frontend/js')));

// Routes
app.use('/api/posts', postsRouter);

// Initialize database and start server
export async function startServer(port = 3000) {
    try {
        console.log('🔄 Initializing database...');
        const db = await initDB();
        console.log('✅ Database initialized');
        
        setDB(db);

        const server = app.listen(port, () => {
            console.log(`✅ Server running at http://localhost:${port}`);
            console.log(`📝 Frontend available at http://localhost:${port}`);
        });

        // Handle server errors
        server.on('error', (error) => {
            console.error('❌ Server error:', error);
            process.exit(1);
        });

        // Handle uncaught exceptions
        process.on('uncaughtException', (error) => {
            console.error('❌ Uncaught exception:', error);
            process.exit(1);
        });

        return server;
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        console.error('Error details:', error.message);
        console.error('Stack:', error.stack);
        process.exit(1);
    }
}

export default app;
