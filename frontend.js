const form = document.getElementById('postForm');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const authorInput = document.getElementById('author');
const postIdInput = document.getElementById('postId');
const postList = document.getElementById('postList');

const API = 'http://localhost:3000/posts';

// Función segura para escapar HTML
function escapeHTML(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

async function loadPosts() {
    try {
        const res = await fetch(API);
        const posts = await res.json();

        postList.innerHTML = '';

        posts.forEach(post => {
            const div = document.createElement('div');
            div.className = 'post';

            const createdDate = post.createdAt ? new Date(post.createdAt).toLocaleDateString('es-ES') : 'Sin fecha';
            const author = post.author || 'Anónimo';
            const title = post.title || 'Sin título';
            const content = post.content || 'Sin contenido';

            div.innerHTML = `
                <h3>${escapeHTML(title)}</h3>
                <p><strong>${createdDate} • ${escapeHTML(author)}</strong></p>
                <p>${escapeHTML(content)}</p>
                <div class="actions">
                    <button onclick="editPost(${post.id}, '${escapeAttribute(title)}', '${escapeAttribute(content)}', '${escapeAttribute(author)}')">Editar</button>
                    <button onclick="deletePost(${post.id})">Eliminar</button>
                </div>
            `;

            postList.appendChild(div);
        });
    } catch (err) {
        console.error('Error cargando posts:', err);
        postList.innerHTML = '<p style="color: red;">Error al cargar posts: ' + err.message + '</p>';
    }
}

// Función para escapar atributos
function escapeAttribute(text) {
    if (!text) return '';
    return text.replace(/'/g, "\\'").replace(/"/g, '&quot;').replace(/&/g, '&amp;');
}

window.editPost = (id, title, content, author) => {
    postIdInput.value = id;
    titleInput.value = title;
    contentInput.value = content;
    authorInput.value = author;
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
        content: contentInput.value,
        author: authorInput.value
    };

    if (!data.title || !data.content || !data.author) return;

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