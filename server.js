import { startServer } from './src/backend/app.js';

const PORT = process.env.PORT || 3000;

// Start server and keep process running
await startServer(PORT);
