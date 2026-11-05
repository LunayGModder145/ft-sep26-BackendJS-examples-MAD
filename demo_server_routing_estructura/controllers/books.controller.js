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

const getBook = (req, res) => {
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
};

const getBookByYear = (req, res) => {
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
};

const createBook = (req, res) => {
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
};

const editBook = (req, res) => {
  const bookData = req.body;
  const { title, newTitle, author, year } = bookData;

  if (!title) {
    return res.status(400).json({
      success: false,
      message: "Error: Es obligatorio envíar el title del libro a editar",
      bookData,
    });
  }

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
};

const deleteBook = (req, res) => {
  const title = req.params.title;
  console.log(title);

  const index = books.findIndex((book) => book.title === title);

  if (index !== -1) {
    // borrar
    console.log(index);
    // Eliminar el libro del array
    // Devolver el JSON elimininado [0]
    const deleted_book = books.splice(index, 1)[0];
    console.log(deleted_book);

    res.status(200).json({
      success: true,
      message: "Libro borrado",
      deleted_book,
    });
  } else {
    // No se encuentra libro
    res.status(404).json({
      success: false,
      message: "El libro no se encuentra",
      title,
    });
  }
};

module.exports = {
  getBook,
  getBookByYear,
  createBook,
  editBook,
  deleteBook,
};
