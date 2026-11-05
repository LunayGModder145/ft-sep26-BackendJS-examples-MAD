const router = require('express').Router();
const booksController = require('../controllers/books.controller');


// Ejemplos de Request:
// http://localhost:3000/books
// http://localhost:3000/books/Harry Potter
// http://localhost:3000/books/1984
// /books{/:title} -> {} indica opcionalidad, :title -> parámetro variable
router.get("{/:title}", booksController.getBook);

// http://localhost:3000/api/books/year/query?startyear=1990&endyear=2010
// Es obligatorio enviar startyear y endyear
router.get("/year/query", booksController.getBookByYear);

/* HTTP POST http://localhost:3000/api/books
   {
      "title": "Don Quijote de la Mancha 2. EL retorno del Hidalgo",
      "author": "Miguel de Cervantes",
      "year": 1606
   } 
  */

router.post("/", booksController.createBook);
/* HTTP PUT http://localhost:3000/api/books
  
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
router.put("/", booksController.editBook);

// HTTP DELETE http://localhost:3000/api/books
router.delete("/:title", booksController.deleteBook);

// Exportar el módulo
module.exports = router;
