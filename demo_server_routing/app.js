const express = require("express"); // importar el módulo
const app = express(); // crear el objeto servidor (vacío)
const port = 3000;

// Parsear el body entrante a JSON
// Convertir a JSON los datos recibidos
// Middleware (operación intermedia)
app.use(express.json());

// En el futuro esto estará en nuestra "base de datos"
const books = [
  { title: "Harry Potter", author: "J.K. Rowling", year: 1997 },
  {
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    year: 1967,
  },
  { title: "El señor de los anillos", author: "J.R.R. Tolkien", year: 1954 },
  { title: "El principito", author: "Antoine de Saint-Exupéry", year: 1943 },
  {
    title: "Don Quijote de la Mancha",
    author: "Miguel de Cervantes",
    year: 1605,
  },
  { title: "Moby Dick", author: "Herman Melville", year: 1851 },
  { title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
  { title: "1984", author: "George Orwell", year: 1949 },
];

// http://localhost:3000/
// Home
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// http://localhost:3000/queso
app.get("/queso", (req, res) => {
  res.send("Hello Quesoooo!");
});

// Ejemplos de Request:
// http://localhost:3000/books
// http://localhost:3000/books/Harry Potter
// http://localhost:3000/books/1984
// /books{/:title} -> {} indica opcionalidad, :title -> parámetro variable
app.get("/books{/:title}", (req, res) => {
  //console.log(req);
  console.log(req.params);
  console.log(req.params.title);

  const title = req.params.title; // título de libro a buscar

  if (title) {
    // búsqueda en el array
    const book = books.find((book) => book.title === title);
    console.log(book);

    if (book) {
      // book encontrado
      res.status(200).json(book); // devuelve el libro encontrado
      console.log("Encontrado!!!!!");
    } else {
      // book = undefined
      // 404 not found
      res.status(404).json({});
      console.log("NO Encontrado!!!!!");
    }
    console.log("estoy DESPUES de if y de else");
  } else {
    res.status(200).json(books); // devuelve el array
  }
});

/* app.get("/books{/:title}", (req, res) => {
  //console.log(req);
  console.log(req.params);
  console.log(req.params.title);

  const title = req.params.title; // título de libro a buscar

  if (title) {
    //busca en el array
    const book = books.find((book) => book.title === title);
    console.log(book);

    if (!book) {
        console.log("No encontrado"); 
        return res.status(404).json({});
    }
    console.log("Encontrado!!!!!!!");
    res.json(book); //Devuelve el libro encontrado
    console.log("adios!!!!!!!");

  } else {
    res.json(books); //Devuelve el Array
  }
}); */

// http://localhost:3000/books
/* app.get("/books", (req, res) => {
  res.json(books); // devuelve el array
}); */

//http://localhost:3000/books/year/1997
//http://localhost:3000/books/year/1954
/* app.get("/books/year/:year", (req, res) => {
  console.log(req.params);
  console.log(req.params.year);

  const year = Number(req.params.year); // año a buscar

  // búsqueda en el array
  const book = books.find((book) => book.year === year);
  console.log(book);

  res.json(book); // devuelve el libro encontrado
}); */

// http://localhost:3000/books/year/query?startyear=1990&endyear=2010
// Es obligatorio enviar startyear y endyear
app.get("/books/year/query", (req, res) => {
  console.log(req.query.star);
  const { startyear, endyear } = req.query;
  console.log(startyear);
  console.log(endyear);

  if (startyear && endyear) {
    // filter a books
    const filteredBooks = books.filter(
      (book) => book.year >= startyear && book.year <= endyear
    );
    res.status(200).json(filteredBooks);
  } else {
    res
      .status(400)
      .json({ message: "Error en la petición. Envía startyear y endyear" });
  }
});

/* HTTP POST http://localhost:3000/books
 {
    "title": "Don Quijote de la Mancha 2. EL retorno del Hidalgo",
    "author": "Miguel de Cervantes",
    "year": 1606
 } 
*/

app.post("/books", (req, res) => {
  console.log(req.body); // Leer el contenido recibido por Body
  const new_book = req.body;
  const { title, author, year } = new_book;
  console.log(title);

  // Compruebo que se envían todas las claves
  if (title && author && year) {
    // NO añadir libro con título repetido
    const book = books.find((book) => book.title === new_book.title);

    if (!book) {
      // Comprobar que libro no existe
      books.push(new_book); // Añade libro al array
      res.status(201).json({
        success: true,
        message: "Libro creado!",
        new_book,
      });
    } else {
      res.status(409).json({
        success: false,
        message: "Libro repetido!",
        new_book,
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "Fallo al crear el libro!. Debes mandar title, author, year",
      new_book,
    });
  }
});
/* HTTP PUT http://localhost:3000/books

Ejemplo 1: Cambiar todo
 { 
"title": "Harry Potter",
"new_title":"Harry Potter 2",
"author": "Shakespeare", 
"year": 1999 
 }

 Ejemplo 2: Cambiar año
  { 
"title": "Harry Potter",
"year": 1999 
 }
 Ejemplo 3: Cambiar autor
  { 
"title": "Harry Potter",
"author": "Shakespeare"
 }
 Ejemplo 4: Objeto vacío
 {}
*/
app.put("/books", (req, res) => {
  console.log(req.body); // Datos nuevos
  const book_data = req.body;
  const title = book_data.title;

  if (!title) {
    return res.status(400).json({
      success: false,
      message: "Error: Es obligatorio envíar el title del libro a editar",
      book_data,
    });
  }

  // Buscar libro por título
  const index = books.findIndex((book) => book.title === book_data.title);
  console.log(index); // Datos originales

  if (index !== -1) {
    // editar el libro en la posición "i" del array
    const { new_title } = book_data; // extraigo el nuevo título
    delete book_data["new_title"]; // borra la clave "new_title"
    book_data.title = new_title || title; // Actualiza título

    const old_book = books[index]; // Libro original
    const new_book = { ...old_book, ...book_data }; // Actualizar objeto

    // Actualizar libro
    books[index] = new_book;

    res.status(201).json({
      success: true,
      message: "Libro editado!",
      new_book,
    });
  } else {
    // index == -1
    res.status(404).json({
      success: false,
      message: "Libro no encontrado para editar",
      new_book,
    });
  }
});

app.put("/books2", (req, res) => {
  const bookData = req.body;
  const { title, newTitle, author, year } = bookData;

  let book = books.find((book) => book.title == title);
  // [{},{},{},{},{}]

  if (book) {
    book.title = newTitle || book.title;
    book.author = author || book.author;
    book.year = year || book.year;

    res.status(200).json({
      success: true,
      message: "Libro cambiado",
      book,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "El libro no se encuentra",
      bookData,
    });
  }
});

// HTTP DELETE http://localhost:3000/books
app.delete("/books/:title", (req, res) => {
    const title = req.params.title;
    console.log(title);

    const index = books.findIndex(book=> book.title === title);
    
    if(index !== -1){
        // borrar
        console.log(index);
        // Eliminar el libro del array
        // Devolver el JSON elimininado [0]
        const deleted_book = books.splice(index,1)[0];
        console.log(deleted_book);
        
        res.status(200).json({
            success: true,
            message: "Libro borrado",
            deleted_book,
          });
    }else{
        // No se encuentra libro
        res.status(404).json({
            success: false,
            message: "El libro no se encuentra",
            title,
          });
    }

});

// "Encender" el servidor
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
