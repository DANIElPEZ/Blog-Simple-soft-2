// Utilidades para almacenamiento en archivos
const fs = require('fs');
const { POSTS_FILE } = require('../config/database');

// Leer todos los posts
function readPosts() {
    try {
        const data = fs.readFileSync(POSTS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error leyendo posts:', error);
        return [];
    }
}

// Guardar posts
function savePosts(posts) {
    try {
        fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
        return true;
    } catch (error) {
        console.error('Error guardando posts:', error);
        return false;
    }
}

// Encontrar post por ID
function findPostById(id) {
    const posts = readPosts();
    return posts.find(post => post.id === id);
}

// Encontrar índice de post
function findPostIndex(id) {
    const posts = readPosts();
    return posts.findIndex(post => post.id === id);
}

module.exports = {
    readPosts,
    savePosts,
    findPostById,
    findPostIndex
};
