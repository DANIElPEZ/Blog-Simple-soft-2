// Controladores para Posts
const Post = require('../models/Post');
const { readPosts, savePosts, findPostById, findPostIndex } = require('../utils/fileStorage');

// GET todos los posts
exports.getAllPosts = (req, res, next) => {
    try {
        const posts = readPosts();
        res.json({
            success: true,
            count: posts.length,
            data: posts
        });
    } catch (error) {
        next(error);
    }
};

// GET post por ID
exports.getPostById = (req, res, next) => {
    try {
        const post = findPostById(req.params.id);
        
        if (!post) {
            return res.status(404).json({
                success: false,
                error: 'Post no encontrado'
            });
        }
        
        res.json({
            success: true,
            data: post
        });
    } catch (error) {
        next(error);
    }
};

// POST crear nuevo post
exports.createPost = (req, res, next) => {
    try {
        // Validar datos
        const validation = Post.validate(req.body);
        if (!validation.isValid) {
            return res.status(400).json({
                success: false,
                errors: validation.errors
            });
        }

        // Crear post
        const newPost = new Post(req.body);
        const posts = readPosts();
        posts.push(newPost);
        
        if (savePosts(posts)) {
            res.status(201).json({
                success: true,
                message: 'Post creado exitosamente',
                data: newPost
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Error al guardar el post'
            });
        }
    } catch (error) {
        next(error);
    }
};

// PUT actualizar post
exports.updatePost = (req, res, next) => {
    try {
        const post = findPostById(req.params.id);
        
        if (!post) {
            return res.status(404).json({
                success: false,
                error: 'Post no encontrado'
            });
        }

        // Validar datos si se proporcionan
        if (req.body.title || req.body.content) {
            const validation = Post.validate({ ...post, ...req.body });
            if (!validation.isValid) {
                return res.status(400).json({
                    success: false,
                    errors: validation.errors
                });
            }
        }

        // Actualizar post
        const updatedPost = new Post(post).update(req.body);
        const posts = readPosts();
        const index = findPostIndex(req.params.id);
        posts[index] = updatedPost;
        
        if (savePosts(posts)) {
            res.json({
                success: true,
                message: 'Post actualizado exitosamente',
                data: updatedPost
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Error al actualizar el post'
            });
        }
    } catch (error) {
        next(error);
    }
};

// DELETE eliminar post
exports.deletePost = (req, res, next) => {
    try {
        const post = findPostById(req.params.id);
        
        if (!post) {
            return res.status(404).json({
                success: false,
                error: 'Post no encontrado'
            });
        }

        // Eliminar post
        const posts = readPosts();
        const filteredPosts = posts.filter(p => p.id !== req.params.id);
        
        if (savePosts(filteredPosts)) {
            res.json({
                success: true,
                message: 'Post eliminado exitosamente',
                data: post
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Error al eliminar el post'
            });
        }
    } catch (error) {
        next(error);
    }
};
