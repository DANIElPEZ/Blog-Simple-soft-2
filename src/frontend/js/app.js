const API = 'http://localhost:3000/api/posts';

let form, titleInput, contentInput, postIdInput, postList;

// Initialize DOM elements when the page is ready
function initializeDOMElements() {
    form = document.getElementById('postForm');
    titleInput = document.getElementById('title');
    contentInput = document.getElementById('content');
    postIdInput = document.getElementById('postId');
    postList = document.getElementById('postList');

    if (!form || !titleInput || !contentInput || !postIdInput || !postList) {
        console.error('❌ DOM elements not found');
        return false;
    }
    return true;
}

/**
 * Load all posts from the API and render them
 */
async function loadPosts() {
    try {
        console.log('📡 Loading posts from API...');
        const res = await fetch(API);
        
        if (!res.ok) {
            throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
        }
        
        const posts = await res.json();
        console.log('✅ Posts loaded:', posts);

        if (!Array.isArray(posts) || posts.length === 0) {
            postList.innerHTML = '<div class="empty-state"><p>No hay posts. ¡Crea uno nuevo!</p></div>';
            return;
        }

        postList.innerHTML = '';

        posts.forEach(post => {
            const div = document.createElement('div');
            div.className = 'post';

            const createdDate = new Date(post.createdAt).toLocaleDateString('es-ES');
            
            div.innerHTML = `
                <h3>${escapeHTML(post.title)}</h3>
                <div class="post-meta">Publicado: ${createdDate}</div>
                <p>${escapeHTML(post.content)}</p>
                <div class="actions">
                    <button class="edit-btn" onclick="editPost(${post.id}, '${escapeAttribute(post.title)}', '${escapeAttribute(post.content)}')">
                        ✏️ Editar
                    </button>
                    <button class="delete-btn" onclick="deletePost(${post.id})">
                        🗑️ Eliminar
                    </button>
                </div>
            `;

            postList.appendChild(div);
        });
    } catch (err) {
        console.error('❌ Error loading posts:', err);
        if (postList) {
            postList.innerHTML = `<div class="empty-state"><p>Error al cargar posts: ${err.message}</p></div>`;
        }
    }
}

/**
 * Escape HTML special characters to prevent XSS
 */
function escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Escape attribute values
 */
function escapeAttribute(text) {
    return text.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Blog App...');
    
    if (!initializeDOMElements()) {
        console.error('❌ Failed to initialize DOM elements');
        return;
    }

    console.log('✅ DOM elements initialized');

    /**
     * Edit a post - populate form with post data
     */
    window.editPost = (id, title, content) => {
        postIdInput.value = id;
        titleInput.value = title;
        contentInput.value = content;
        titleInput.focus();
    };

    /**
     * Delete a post
     */
    window.deletePost = async (id) => {
        if (!confirm('¿Estás seguro de que quieres eliminar este post?')) {
            return;
        }

        try {
            const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete post');
            loadPosts();
        } catch (err) {
            console.error('Error deleting post:', err);
            alert('Error al eliminar el post');
        }
    };

    /**
     * Handle form submission - create or update post
     */
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const id = postIdInput.value;
        const data = {
            title: titleInput.value.trim(),
            content: contentInput.value.trim()
        };

        if (!data.title || !data.content) {
            alert('Por favor completa todos los campos');
            return;
        }

        try {
            if (id) {
                // Update existing post
                const res = await fetch(`${API}/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                if (!res.ok) throw new Error('Failed to update post');
            } else {
                // Create new post
                const res = await fetch(API, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                if (!res.ok) throw new Error('Failed to create post');
            }

            form.reset();
            postIdInput.value = '';
            loadPosts();
        } catch (err) {
            console.error('Error saving post:', err);
            alert('Error al guardar el post');
        }
    });

    // Load posts when page loads
    loadPosts();
});
