import {
    createPost,
    editPost,
    removePost,
    listPosts
} from './backend.js';

const form = document.getElementById('postForm');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const postIdInput = document.getElementById('postId');
const postList = document.getElementById('postList');

function renderPosts() {
    const posts = listPosts();

    postList.innerHTML = '';

    posts.forEach(post => {
        const div = document.createElement('div');
        div.className = 'post';

        div.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <button class="edit-btn" data-id="${post.id}">Editar</button>
            <button class="delete-btn" data-id="${post.id}">Eliminar</button>
        `;

        postList.appendChild(div);
    });

    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = Number(btn.dataset.id);
            const post = listPosts().find(p => p.id === id);

            titleInput.value = post.title;
            contentInput.value = post.content;
            postIdInput.value = post.id;
        });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = Number(btn.dataset.id);
            removePost(id);
            renderPosts();
        });
    });
}

form.addEventListener('submit', e => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    const id = postIdInput.value;

    if (!title || !content) return;

    if (id) {
        editPost(Number(id), title, content);
    } else {
        createPost(title, content);
    }

    form.reset();
    postIdInput.value = '';
    renderPosts();
});

renderPosts();