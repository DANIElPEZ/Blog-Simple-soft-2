# 🛡️ Guía de Seguridad

## Medidas de Seguridad Implementadas

### 1. CORS (Cross-Origin Resource Sharing)

```javascript
app.use(cors());
```

**Beneficios:**
- Controla qué dominios pueden acceder a la API
- Previene ataques CSRF

**Mejora Futura:**
```javascript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
}));
```

### 2. Validación de Entrada

```javascript
if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
}
```

**Beneficios:**
- Rechaza datos inválidos
- Previene errores en la BD

### 3. SQL Injection Prevention

```javascript
// ✅ SEGURO - Usa prepared statements
await db.run(
    'INSERT INTO posts (title, content) VALUES (?, ?)',
    [title, content]
);

// ❌ INSEGURO - Evita concatenación
// const query = `INSERT INTO posts VALUES ('${title}', '${content}')`;
```

**Beneficios:**
- Los ? son placeholders que previenen inyección SQL
- Los valores se escapan automáticamente

### 4. XSS (Cross-Site Scripting) Prevention

```javascript
// ✅ SEGURO - Escapa HTML
function escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// En el HTML
<h3>${escapeHTML(post.title)}</h3>

// ❌ INSEGURO - innerHTML directo
// div.innerHTML = `<h3>${post.title}</h3>`; // Vulnerable a XSS
```

**Beneficios:**
- Previene ejecución de scripts maliciosos
- Los caracteres especiales se convierten a entidades HTML

### 5. Manejo de Errores

```javascript
try {
    // Operación
} catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error message' });
}
```

**Beneficios:**
- No expone detalles internos de errores
- Devuelve mensajes genéricos al usuario
- Registra errores en logs

## 🔐 Mejoras de Seguridad Recomendadas

### 1. Autenticación y Autorización

```javascript
// Agregar JWT tokens
import jwt from 'jsonwebtoken';

const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
```

### 2. Rate Limiting

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // máximo 100 requests
});

app.use(limiter);
```

### 3. Helmet.js para headers seguros

```javascript
import helmet from 'helmet';

app.use(helmet());
```

### 4. Validación con Esquemas

```javascript
import joi from 'joi';

const schema = joi.object({
  title: joi.string().required(),
  content: joi.string().required()
});

const { error, value } = schema.validate(req.body);
```

### 5. HTTPS en Producción

```javascript
import https from 'https';
import fs from 'fs';

const options = {
  key: fs.readFileSync('./path/to/key.pem'),
  cert: fs.readFileSync('./path/to/cert.pem')
};

https.createServer(options, app).listen(443);
```

### 6. Variables de Entorno Sensibles

```bash
# .env (NO versionado en git)
DB_PASSWORD=securepassword
JWT_SECRET=verylongrandomstring
API_KEY=sensitive_key
```

### 7. Logging y Monitoreo

```javascript
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

## 🧪 Pruebas de Seguridad

### 1. Probar SQL Injection

```bash
# Intentar inyección SQL
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"test\" OR \"1\"=\"1","content":"content"}'

# Resultado esperado: POST creado normalmente (datos escapados)
```

### 2. Probar XSS

```bash
# Intentar inyección JavaScript
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"<img src=x onerror=alert(1)>","content":"content"}'

# Resultado esperado: El script NO se ejecuta en el navegador
```

## 📋 Checklist de Seguridad para Producción

- [ ] HTTPS habilitado (certificados SSL/TLS)
- [ ] CORS configurado restrictivamente
- [ ] Rate limiting implementado
- [ ] Autenticación y autorización
- [ ] Helmet.js para headers seguros
- [ ] Validación de entrada con esquemas
- [ ] SQL Injection prevention verificado
- [ ] XSS prevention verificado
- [ ] CSRF tokens implementados
- [ ] Passwords hasheados (bcrypt)
- [ ] Variables sensibles en .env
- [ ] Logging y monitoreo activo
- [ ] Actualizaciones de dependencias al día
- [ ] Respaldos de datos automáticos
- [ ] Plan de respuesta a incidentes

## 🔗 Referencias de Seguridad

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Express Security](https://expressjs.com/en/advanced/best-practice-security.html)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)

---

**Última actualización:** Abril 2026
