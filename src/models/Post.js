// Modelo de Post
class Post {
    constructor(data) {
        this.id = data.id || Date.now().toString();
        this.title = data.title || '';
        this.content = data.content || '';
        this.author = data.author || 'Anónimo';
        this.createdAt = data.createdAt || new Date().toISOString();
        this.updatedAt = data.updatedAt || new Date().toISOString();
        this.tags = data.tags || [];
        this.published = data.published !== undefined ? data.published : true;
    }

    // Validar datos
    static validate(data) {
        const errors = [];
        
        if (!data.title || data.title.trim() === '') {
            errors.push('El título es requerido');
        }
        
        if (!data.content || data.content.trim() === '') {
            errors.push('El contenido es requerido');
        }
        
        if (data.title && data.title.length > 200) {
            errors.push('El título no puede exceder 200 caracteres');
        }
        
        return {
            isValid: errors.length === 0,
            errors
        };
    }

    // Actualizar post
    update(data) {
        if (data.title) this.title = data.title;
        if (data.content) this.content = data.content;
        if (data.author) this.author = data.author;
        if (data.tags) this.tags = data.tags;
        if (data.published !== undefined) this.published = data.published;
        this.updatedAt = new Date().toISOString();
        return this;
    }
}

module.exports = Post;
