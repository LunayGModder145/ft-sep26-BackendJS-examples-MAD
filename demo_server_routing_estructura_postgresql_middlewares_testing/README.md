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

npm init -y

3. Instala Express:

npm install express

---

## Paso 2: Configuración de scripts (npm)

Vamos a mejorar la forma en la que arrancamos el servidor.

Edita tu package.json y añade:

{
  "scripts": {
    "dev": "node --watch app.js",
    "start": "node app.js"
  }
}

### ¿Qué significa esto?

* `npm run dev` → arranca el servidor con recarga automática
* `npm start` → arranca el servidor en modo normal

:bulb: **Pista:** `--watch` es una alternativa moderna a herramientas como nodemon.

---

## Paso 3: Crear el servidor

1. Crea un archivo app.js
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

npm run dev

Abre el navegador en:

http://localhost:3000

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

/books/:title

Se acceden así:

req.params.title

:bulb: Ejemplo:

/books/HarryPotter

---

### :small_blue_diamond: Query params

Van después de `?` en la URL:

/books?author=Rowling

Se acceden así:

req.query.author

:bulb: Se usan mucho para filtros.

---

### :small_blue_diamond: Params opcionales

Puedes hacer parámetros opcionales con `{}`:

/{books{/:title}

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

## Parte 2 — Estructura y orden de carpetas en un proyecto backend

En esta segunda parte vamos a organizar el proyecto de forma escalable. Aquí tienes un orden recomendado de carpetas y archivos con explicación breve de qué contiene cada una.

Orden recomendado (de arriba a abajo / más importantes primero en raíz):

1. package.json — Dependencias y scripts.
2. app.js (o server.js) — Punto de entrada de la aplicación.
3. config/ — Configuraciones (env, constantes, conexión a BD).
4. routes/ — Definición de rutas (archivo por recurso).
5. controllers/ — Lógica que responde a las rutas.
6. models/ — Esquemas o modelos (ORM/BD) o estructuras de datos.
7. services/ — Lógica de negocio reutilizable (opcional).
8. utils/ — Utilidades y helpers (peticiones externas, parsers).
9. middlewares/ — Middlewares personalizados (autenticación, validaciones).
10. public/ — Archivos estáticos (si aplica).
11. tests/ — Pruebas automatizadas.
12. README.md — Documentación del proyecto.

Por qué este orden: facilita localizar el punto de entrada, la configuración y luego las capas que implementan lógica, modelos y rutas. Mantener esta convención ayuda a que nuevos desarrolladores entiendan el proyecto rápido.

Qué va en cada carpeta (resumen rápido):

* config/: variables de entorno, configuración de DB, claves, loaders.
* routes/: archivos que exportan routers de Express. Sólo definen endpoints y delegan a controllers.
* controllers/: reciben req/res y llaman a services/models, validan datos y devuelven respuestas.
* models/: esquemas de datos (Mongoose, Sequelize) o definiciones de tablas.
* services/: abstracciones de lógica de negocio que pueden usar models y utils.
* utils/: funciones auxiliares como llamadas a APIs externas (por ejemplo utils/fetchProduct.js), parseo, formateo.
* middlewares/: funciones (req, res, next) para validación, autenticación y manejo de errores.
* public/: assets públicos.
* tests/: pruebas unitarias / de integración.

Ejemplo: estructura real de este proyecto (solución del taller)

project-root/
├── app.js
├── package.json
├── README.md
├── routes/
│   ├── books.routes.js
│   └── products.routes.js
├── controllers/
│   ├── books.controller.js
│   └── products.controller.js
├── utils/
│   └── fetchProduct.js

Este orden muestra claramente la división entre rutas y controladores y dónde poner utilidades.

---

## Consejos prácticos para migrar a esta estructura

* Mueve `app` y configuración de servidor a app.js.
* Crea routes y exporta routers desde cada archivo.
* Crea controllers y pasa la lógica desde las rutas a los controllers.
* Sitúa helpers en utils o `services/` según su responsabilidad.
* Añade un `config/` para gestionar variables de entorno (`dotenv`) y parámetros de conexión.

---

## Paso 9: Integración con una API externa (fakestoreapi)

En esta demo usamos fakestoreapi para obtener y crear productos desde el backend. Añadir la integración con una API externa implica estos puntos clave:

1. Dónde colocar la lógica de llamadas externas
   - Usa utils o `services/` para encapsular las llamadas HTTP (por ejemplo fetchProduct.js). Esto mantiene controllers limpios.

2. Configuración y seguridad
   - Si la API requiere claves o URLs configurables, ponlas en `config/` o en variables de entorno (`.env`). Evita hardcodear valores en los archivos del repositorio.

3. Manejo de errores y tiempos de espera
   - Implementa manejo de errores (try/catch) en la capa que llama a la API y devuelve errores amigables desde los controllers.
   - Considera timeouts y reintentos si la API es inestable.

4. Normalización de datos
   - La API externa puede devolver formatos distintos. Normaliza la respuesta en utils o `services/` antes de enviarla al cliente.


5. Ejemplo conceptual (sin código)
   - Controller recibe req → llama a service/utils que hace fetch a fakestoreapi → service normaliza respuesta → controller devuelve JSON al cliente.

---

## Pasos para adaptar el proyecto a la nueva estructura de carpetas

Sigue estos pasos para reorganizar el proyecto sin romper funcionalidades existentes. Hazlo en pequeños commits y prueba en cada paso.

1. Planifica la estructura
   - Decide qué carpetas vas a crear (routes, controllers, utils, services, models, config, middlewares, public, tests).

2. Crea las carpetas vacías en la raíz del proyecto
   - Crea routes, controllers, utils, `services/`, `config/`, `middlewares/`, `models/`, `tests/`.

3. Mueve los archivos uno a uno y actualiza las referencias
   - Mueve un archivo (por ejemplo books.controller.js) a su nueva carpeta controllers.
   - Actualiza los `require`/`import` en los archivos que lo usan. Verifica que Node encuentre el módulo.
   - Ejecuta la app y prueba los endpoints relacionados.

4. Repite por capas (routes → controllers → utils/services → app.js)
   - Después de mover controladores, mueve las rutas y actualiza los `require` desde app.js.
   - Asegúrate de que app.js importe las rutas desde su nueva ubicación.

5. Centraliza configuración y variables de entorno
   - Extrae valores (puerto, URLs externas, claves) a `config/` o variables de entorno. Prueba que la app use las nuevas variables.

6. Separa lógica de negocio en services
   - Si notas lógica compleja en controllers, muévela a `services/` y deja en los controllers sólo el manejo de req/res.

7. Añade middlewares cuando corresponda
   - Crea `middlewares/` para validaciones, autenticación o manejo de errores y úsalos en las rutas o app global.

8. Refactoriza utils y helpers
   - Mueve funciones auxiliares a utils. Si alguna utilidad depende de rutas relativas, actualiza las rutas de importación.

9. Revisión y limpieza final
   - Ejecuta toda la aplicación y prueba manualmente los endpoints principales.
   - Elimina archivos duplicados o referencias rotas.
   - Actualiza README con la nueva estructura y pasos de ejecución si cambió algo.

---

## Cómo ejecutar

1. Instalar dependencias:

npm install

2. Ejecutar en desarrollo:

npm run dev

3. Probar endpoints con Postman o un cliente similar.

---

## Conclusión

Organizar las carpetas siguiendo una convención clara facilita mantenimiento, pruebas y escalabilidad. En las siguientes sesiones practicaremos cómo separar responsabilidades moviendo los archivos actuales a esta estructura y añadiendo ejemplos de middlewares y tests.