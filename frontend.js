const API = 'http://localhost:3000';
let currentUser = JSON.parse(localStorage.getItem('user')) || null;

// Elementos del DOM
const authBox = document.getElementById('authBox');
const blogBox = document.getElementById('blogBox');
const postList = document.getElementById('postList');
const postForm = document.getElementById('postForm');

// --- CARGAR POSTS (La clave está aquí) ---
async function loadPosts() {
    try {
        console.log("Intentando cargar posts...");
        const res = await fetch(`${API}/posts`);
        
        if (!res.ok) throw new Error("Error en la respuesta del servidor");
        
        const posts = await res.json();
        console.log("Posts recibidos:", posts);

        postList.innerHTML = ''; // Limpiar lista

        if (posts.length === 0) {
            postList.innerHTML = '<p style="color:gray">Aún no hay publicaciones. ¡Sé el primero!</p>';
            return;
        }

        posts.reverse().forEach(p => {
            const div = document.createElement('div');
            div.className = 'post';
            
            // Verificamos si el usuario actual es el dueño
            // Usamos == en lugar de === por si uno es string y el otro number
            const isOwner = currentUser && p.author_id == currentUser.id;

            div.innerHTML = `
                <span class="post-author">Publicado por: <b>${p.author_name || 'Anónimo'}</b></span>
                <h4>${p.title}</h4>
                <a href="post.html?id=${p.id}" class="post-link">Leer completo →</a>
                ${isOwner ? `<button class="btn-del" onclick="deletePost(${p.id})" style="margin-top:10px; background:#ff4d4d; color:white; border:none; padding:5px; border-radius:4px; cursor:pointer;">Eliminar mi post</button>` : ''}
            `;
            postList.appendChild(div);
        });
    } catch (err) {
        console.error("Error cargando la lista:", err);
        postList.innerHTML = '<p style="color:red">Error al conectar con el servidor.</p>';
    }
}

// --- AUTENTICACIÓN ---
async function auth(type) {
    const username = document.getElementById('userIn').value;
    const password = document.getElementById('passIn').value;

    if(!username || !password) return alert("Escribe usuario y contraseña");

    try {
        const res = await fetch(`${API}/${type}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();
        if (data.success) {
            if (type === 'login') {
                currentUser = data.user;
                localStorage.setItem('user', JSON.stringify(currentUser));
                renderUI();
            } else {
                alert("Registro exitoso. Ahora inicia sesión.");
            }
        } else {
            alert(data.error || "Datos incorrectos");
        }
    } catch (e) {
        alert("El servidor no responde. ¿Está encendido?");
    }
}

// --- CREAR POST ---
postForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const body = {
        title: document.getElementById('title').value,
        content: document.getElementById('content').value,
        userId: currentUser.id,
        username: currentUser.username
    };

    try {
        const res = await fetch(`${API}/posts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if(res.ok) {
            postForm.reset();
            loadPosts(); // Recargar lista tras publicar
        }
    } catch (err) {
        alert("Error al publicar");
    }
});

// --- ELIMINAR ---
window.deletePost = async (id) => {
    if (!confirm("¿Borrar post?")) return;
    
    try {
        await fetch(`${API}/posts/${id}`, {
            method: 'DELETE',
            headers: { 'User-Id': currentUser.id }
        });
        loadPosts();
    } catch (err) {
        alert("No se pudo eliminar");
    }
};

function logout() {
    localStorage.removeItem('user');
    currentUser = null;
    renderUI();
}

function renderUI() {
    if (currentUser) {
        authBox.classList.add('hidden');
        blogBox.classList.remove('hidden');
        document.getElementById('userGreet').innerText = `Hola, ${currentUser.username}`;
    } else {
        authBox.classList.remove('hidden');
        blogBox.classList.add('hidden');
    }
    loadPosts(); // Siempre intentamos cargar los posts
}

// Arrancar la aplicación
renderUI();