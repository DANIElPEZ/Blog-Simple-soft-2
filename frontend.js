const form = document.getElementById('postForm');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const postIdInput = document.getElementById('postId');
const postList = document.getElementById('postList');

const API = 'http://localhost:3000/posts';

async function loadPosts() {
    try {
        const res = await fetch(API);
        const posts = await res.json();

        postList.innerHTML = '';

        posts.forEach(post => {
            const div = document.createElement('div');
            div.className = 'post';

            div.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <div class="actions">
                    <button onclick="editPost(${post.id}, \`${post.title}\`, \`${post.content}\`)">Editar</button>
                    <button onclick="deletePost(${post.id})">Eliminar</button>
                </div>
            `;

            postList.appendChild(div);
        });
    } catch (err) {
        console.error('Error cargando posts:', err);
    }
}

window.editPost = (id, title, content) => {
    postIdInput.value = id;
    titleInput.value = title;
    contentInput.value = content;
};

window.deletePost = async (id) => {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    loadPosts();
};

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = postIdInput.value;

    const data = {
        title: titleInput.value,
        content: contentInput.value
    };

    if (!data.title || !data.content) return;

    if (id) {
        await fetch(`${API}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    } else {
        await fetch(API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    }

    form.reset();
    postIdInput.value = '';
    loadPosts();
});

loadPosts();