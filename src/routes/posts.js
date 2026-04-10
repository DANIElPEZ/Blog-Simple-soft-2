// Rutas de Posts
const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');

// GET todos los posts
router.get('/', postsController.getAllPosts);

// GET post por ID
router.get('/:id', postsController.getPostById);

// POST crear nuevo post
router.post('/', postsController.createPost);

// PUT actualizar post
router.put('/:id', postsController.updatePost);

// DELETE eliminar post
router.delete('/:id', postsController.deletePost);

module.exports = router;
