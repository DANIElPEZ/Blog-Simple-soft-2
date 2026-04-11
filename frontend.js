const form = document.getElementById('postForm');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const postIdInput = document.getElementById('postId');
const postList = document.getElementById('postList');

async function loadPosts() {
    const response = await fetch('http://localhost:3000/posts');
    const posts = await response.json();

    postList.innerHTML = '';

    posts.forEach(post => {
        const div = document.createElement('div');

        div.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <button onclick="editPost(${post.id}, '${post.title}', '${post.content}')">
                Editar
            </button>
            <button onclick="deletePost(${post.id})">
                Eliminar
            </button>
            <hr>
        `;

        postList.appendChild(div);
    });
}

window.editPost = (id, title, content) => {
    postIdInput.value = id;
    titleInput.value = title;
    contentInput.value = content;
};

window.deletePost = async (id) => {
    await fetch(`http://localhost:3000/posts/${id}`, {
        method: 'DELETE'
    });

    loadPosts();
};

form.addEventListener('submit', async e => {
    e.preventDefault();

    const id = postIdInput.value;

    const data = {
        title: titleInput.value,
        content: contentInput.value
    };

    if (id) {
        await fetch(`http://localhost:3000/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    } else {
        await fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    form.reset();
    postIdInput.value = '';
    loadPosts();
});

loadPosts();
