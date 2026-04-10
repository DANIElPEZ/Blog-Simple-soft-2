import {
    getPosts,
    addPost,
    updatePost,
    deletePost
} from './database.js';

export function createPost(title, content) {
    const post = {
        id: Date.now(),
        title,
        content
    };

    addPost(post);
}

export function editPost(id, title, content) {
    updatePost(id, { title, content });
}

export function removePost(id) {
    deletePost(id);
}

export function listPosts() {
    return getPosts();
}