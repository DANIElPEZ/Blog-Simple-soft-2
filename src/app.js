// Configuración de Express
const express = require('express');
const path = require('path');

// Importar rutas
const postsRoutes = require('./routes/posts');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Rutas
app.use('/api/posts', postsRoutes);

// Ruta raíz
app.get('/', (req, res) => {
    res.json({
        message: 'API Blog Simple',
        version: '1.0.0',
        endpoints: {
            posts: '/api/posts',
            docs: '/api/posts'
        }
    });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Middleware de manejo de errores
app.use(errorHandler);

module.exports = app;
