# Demo Server Routing

Seguiremos las instrucciones paso a paso para completar un ejercicio práctico de creación de un servidor con Node.js y Express.

> :warning: **Importante:** Este ejercicio está pensado para que pienses y pruebes. Se incluyen pistas, pero evita copiar/pegar soluciones completas.

---

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

* Node.js (versión 18 o superior recomendada).
* Un editor de texto como Visual Studio Code.
* Un terminal para ejecutar comandos.

---

## Paso 1: Inicializar el proyecto

1. Crea una carpeta para el proyecto y navega a ella desde el terminal.
2. Ejecuta el siguiente comando:

```bash
npm init -y
```

3. Instala Express:

```bash
npm install express
```

---

## Paso 2: Configuración de scripts (npm)

Vamos a mejorar la forma en la que arrancamos el servidor.

Edita tu `package.json` y añade:

```json
"scripts": {
  "dev": "node --watch app.js",
  "start": "node app.js"
}
```

### ¿Qué significa esto?

* `npm run dev` → arranca el servidor con recarga automática
* `npm start` → arranca el servidor en modo normal

:bulb: **Pista:** `--watch` es una alternativa moderna a herramientas como nodemon.

---

## Paso 3: Crear el servidor

1. Crea un archivo `app.js`
2. Configura un servidor básico con Express

:bulb: **Pistas:**

* Necesitas importar Express
* Crear una instancia de app
* Definir un puerto
* Usar middleware para JSON
* Crear al menos una ruta `/`

---

## Paso 4: Ejecutar el servidor

Ejecuta:

```bash
npm run dev
```

Abre el navegador en:

```
http://localhost:3000
```

---

## Paso 5: Routing básico

Añade nuevas rutas a tu servidor.

:bulb: **Pistas:**

* Usa `app.get(...)`
* Cada ruta tiene:

  * un path
  * una función `(req, res)`

Prueba con rutas como:

* `/otra`
* `/saludo`

---

## Paso 6: Teoría de routing (MUY IMPORTANTE)

### :small_blue_diamond: Params (parámetros de ruta)

Se definen en la URL:

```js
/books/:title
```

Se acceden así:

```js
req.params.title
```

:bulb: Ejemplo:

```
/books/HarryPotter
```

---

### :small_blue_diamond: Query params

Van después de `?` en la URL:

```
/books?author=Rowling
```

Se acceden así:

```js
req.query.author
```

:bulb: Se usan mucho para filtros.

---

### :small_blue_diamond: Params opcionales

Puedes hacer parámetros opcionales con `{}`:

```js
/{books{/:title}
```

:bulb: Significa que la ruta funciona con o sin ese parámetro.

---

## Paso 7: Mini proyecto CRUD (sin solución)

Vamos a simular una API de libros.

### 1. Crea una "base de datos" en memoria

:bulb: Pista:

* Usa un array de objetos
* Cada libro debería tener:

  * title
  * author
  * year

---

### 2. Rutas a implementar

Intenta crear estas rutas tú mismo:

#### GET /books

Devuelve todos los libros

:bulb: Pista:

* Usa `res.json(...)`

---

#### GET /books/:title

Devuelve un libro concreto

:bulb: Pistas:

* Usa `req.params`
* Busca dentro del array (`find`)
* Maneja el caso en que no exista

---

#### POST /books

Crea un nuevo libro

:bulb: Pistas:

* Usa `req.body`
* Necesitas `express.json()`
* Devuelve status 201

---

#### PUT /books

Edita un libro

:bulb: Pistas:

* Busca el libro por algún identificador
* Modifica solo los campos enviados
* Piensa en cómo manejar campos opcionales

---

#### DELETE /books/:title

Elimina un libro

:bulb: Pistas:

* Usa `findIndex`
* Usa `splice`
* Devuelve el elemento eliminado o un mensaje

---

## Paso 8: Cómo probar la API

Puedes usar:

* Postman
* Thunder Client (extensión de VS Code)
* curl

---

## Paso 9: Siguientes pasos (NO IMPLEMENTAR HOY)

En la siguiente sesión vamos a mejorar la estructura del proyecto.

### :wrench: Problema actual

Todo está en un solo archivo (`app.js`) → difícil de escalar.

---

### :bricks: Nueva estructura (preview de lo que veremos próximamente)

```
project/
│
├── app.js
├── routes/
├── controllers/
├── models/
```

### ¿Qué irá en cada carpeta?

* **routes/** → define endpoints
* **controllers/** → lógica de cada endpoint
* **models/** → datos / estructuras

:bulb: Esto se llama **arquitectura por capas**.

---

## Conclusión

Has creado tu primer servidor con Express, entendiendo:

* Cómo funcionan las rutas
* Qué son params y query params
* Cómo estructurar una API básica
* Cómo simular un CRUD

:point_right: Lo importante no es memorizar, sino entender cómo fluye la información (`req → lógica → res`).

---