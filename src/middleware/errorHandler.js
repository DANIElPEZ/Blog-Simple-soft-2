// Middleware de manejo de errores
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // Error de validación
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            error: 'Error de validación',
            details: err.message
        });
    }

    // Error del servidor
    res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
};

module.exports = {
    errorHandler
};
