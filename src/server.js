// Punto de entrada del aplicación
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, () => {
    console.log(`✓ Servidor Blog Simple iniciado`);
    console.log(`✓ URL: http://${HOST}:${PORT}`);
    console.log(`✓ API: http://${HOST}:${PORT}/api/posts`);
    console.log(`✓ Modo: ${process.env.NODE_ENV || 'development'}`);
});
