// Configuración de la base de datos
const path = require('path');
const fs = require('fs');

const DATA_DIR = path.join(__dirname, '../../data');
const POSTS_FILE = path.join(DATA_DIR, 'posts.json');

// Crear directorio data si no existe
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Crear archivo posts.json si no existe
if (!fs.existsSync(POSTS_FILE)) {
    fs.writeFileSync(POSTS_FILE, JSON.stringify([], null, 2));
}

module.exports = {
    POSTS_FILE,
    DATA_DIR
};
