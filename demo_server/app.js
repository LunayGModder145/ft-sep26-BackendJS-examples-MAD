const express = require("express"); // importar el módulo
const app = express(); // crear el objeto servidor (vacío)
const port = 3000;
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
  console.log(req.query);
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

// HTTP POST http://localhost:3000/books
app.post("/books", (req, res) => {
  res.send("Libro creado!");
});
// HTTP PUT http://localhost:3000/books
app.put("/books", (req, res) => {
  res.send("Libro editado!!!!!!!!");
});

// HTTP DELETE http://localhost:3000/books
app.delete("/books", (req, res) => {
  res.send("Libro borrado!!!!!:D!!!!");
});

// "Encender" el servidor
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
