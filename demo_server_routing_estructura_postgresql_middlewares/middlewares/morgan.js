// Importamos la librería 'morgan', que sirve para registrar en consola las peticiones HTTP
const morgan = require('morgan');

/**
 * Un "token" en Morgan es una variable personalizada que luego podemos usar
 * en nuestro formato de texto (por ejemplo: :host, :body, :clean-url).
 */

// 1. TOKEN :host -> Obtiene el nombre del dominio o servidor (ej. 'localhost')
morgan.token('host', function (req, res) {
    return req.hostname;
});

// 2. TOKEN :body -> Muestra los datos enviados en el cuerpo (body) de la petición
morgan.token('body', function (req, res) {
    // Si la petición no tiene body (como un GET) o está vacío, devolvemos un texto vacío
    // para que no aparezca "{}" molestando en la consola.
    if (!req.body || Object.keys(req.body).length === 0) {
        return '';
    }

    // Como req.body es un objeto de JavaScript, lo convertimos a texto (String)
    // para que Morgan pueda imprimirlo en la terminal.
    return JSON.stringify(req.body);
});

// 3. TOKEN :param -> Permite capturar parámetros dinámicos de la ruta (ej. /usuarios/:id)
morgan.token('param', function (req, res, param) {
    return req.params[param];
});

// 4. TOKEN :clean-url -> Muestra la URL ocultando datos sensibles de los query params
morgan.token('clean-url', function (req, res) {
    // req.originalUrl contiene la ruta completa (ej. '/api/entries?API_KEY=hola123')
    // Usamos .replace() con una expresión regular para buscar 'API_KEY=' seguido de cualquier valor
    // hasta encontrar un '&' (donde empezaría otro parámetro) y lo cambiamos por '***'.
    // La 'g' busca todas las coincidencias y la 'i' ignora mayúsculas/minúsculas.
    return req.originalUrl.replace(/(api_key|apikey)=[^&]*/gi, '$1=***');
});

// Exportamos Morgan ya configurado con nuestros tokens para poder usarlo en app.js
module.exports = morgan;