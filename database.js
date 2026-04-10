const STORAGE_KEY = 'posts';

export function getPosts() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function savePosts(posts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export function addPost(post) {
    const posts = getPosts();
    posts.push(post);
    savePosts(posts);
}

export function updatePost(id, updatedPost) {
    const posts = getPosts().map(post =>
        post.id === id ? { ...post, ...updatedPost } : post
    );

    savePosts(posts);
}

export function deletePost(id) {
    const posts = getPosts().filter(post => post.id !== id);
    savePosts(posts);
}

export function getPostById(id) {
    return getPosts().find(post => post.id === id);
}
