const express = require("express"); // importar el módulo
const helmet = require("helmet");

const app = express(); // crear el objeto servidor (vacío)
const port = 3000;

// Securizar la API con helmet
app.use(helmet());

// Variables de entorno
require("dotenv").config();
console.log(`Hola! esta es tu API_KEY: ${process.env.API_KEY}`);

// Middlewares
const error404 = require("./middlewares/error404");
const checkApiKey = require("./middlewares/checkApiKey");
const morgan = require("./middlewares/morgan");


// Activamos Morgan como middleware. El texto entre comillas define qué se verá en consola:
// [:date[iso]] -> Fecha y hora exacta en formato estándar
// :method      -> Verbo HTTP (GET, POST, PUT, DELETE...)
// :clean-url   -> Nuestro token personalizado que muestra la ruta ocultando la API_KEY
// :status      -> Código de respuesta HTTP (200 OK, 404 Not Found, 500 Error...)
// :body        -> Nuestro token personalizado con los datos enviados en el JSON
app.use(morgan('[:date[iso]] :method :clean-url :status - :body'));


// Rutas
const entriesRoutes = require("./routes/entries.routes");
//const authorsRoutes = require('./routes/authors.routes');

// Parsear el body entrante a JSON
// Convertir a JSON los datos recibidos
// Middleware (operación intermedia)
app.use(express.json());

// Comprobar que se envía API KEY en cualquier petición
// Descomentar para probar
//app.use(checkApiKey);

// http://localhost:3000/
// Home
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Rutas API
// El primer parámetro es prefijo

// http://localhost:3000/api/entries
app.use("/api/entries", entriesRoutes);

// Middleware para ruta no encontrada 404
app.use(error404);

// "Encender" el servidor
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
