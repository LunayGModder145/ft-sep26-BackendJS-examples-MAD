// Objeto de conexión a la BBDD
const pool = require("../config/db_pgsql");
const queries = require('../queries/entries.queries');

// SELECT * from Entries WHERE email=tucorreo@gmail.com

// SELECT * FROM entries WHERE id_author=(SELECT id_author FROM authors WHERE email='alejandru@thebridgeschool.es')

const getEntriesByEmail = async (email) => {
  let client, result;
  try {
    client = await pool.connect();

    result = await client.query(queries.getEntriesByEmail,[email]);
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    // Cerrar conexión
    client.release();
  }
  return result.rows;
};

/* getEntriesByEmail("birja@thebridgeschool.es")
.then(data=>console.log(data)); */

// SELECT * from Entries
const getAllEntries = async () => {
  let client, result;
  try {
    client = await pool.connect();

    result = await client.query(queries.getAllEntries);
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    // Cerrar conexión
    client.release();
  }
  return result.rows;
};

// getAllEntries().then((data) => console.log(data));

// INSERT INTO....

/* 
INSERT INTO entries(title,content,id_author,category)
VALUES 
('Noticia: QUESO en Madrid','Contenido noticia 1',(SELECT id_author FROM authors WHERE email='alejandru@thebridgeschool.es'),'Tiempo')
*/

/* 
INSERT INTO entries(title,content,id_author,category)
VALUES 
($1,$2,(SELECT id_author FROM authors WHERE email=$3),$4)
*/
/* 
ENTRY para probar:
{
    title: "Se acabaron las mandarinas de TB",
    content: "Corren rumores de que papa noel tenía un saco vacio y lo llenó",
    email: "guillermu@thebridgeschool.es",
    category: "sucesos"
} */

const createEntry = async (entry) => {
  const { title, content, email, category } = entry;
  let client, result;
  try {
    client = await pool.connect();

    result = await client.query(queries.createEntry,[title, content, email, category]);
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    // Cerrar conexión
    client.release();
  }
  return result.rowCount;
};

/* const newEntry = {
    title: "Se acabaron las mandarinas de TB",
    content: "Corren rumores de que papa noel tenía un saco vacio y lo llenó",
    email: "alejandru@thebridgeschool.es",
    category: "sucesos"
}

// Probar la función
createEntry(newEntry)
.then(data=>console.log(data)); */


// UPDATE entries .....

/*
UPDATE entries
	SET title='Hemos venido a jugar',
  content='Hora de Kahoot2 !', date='2024-06-19', 
  id_author=(SELECT id_author FROM authors WHERE email='alvaru@thebridgeschool.es'), category='Software'
	WHERE title='El rayo gana la champions';
*/

/*
UPDATE entries
    SET title=$1, content=$2, date=NOW(), 
    id_author=(SELECT id_author FROM authors WHERE email=$3), category=$4
    WHERE title=$5
*/

/*
// ENTRY
{
    new_title:"Se acabaron las Magdalenas",
    title: "Noticia: Un panda suelto por la ciudad",
    content: "Corren rumores de que papa noel tenía un saco vacio y lo llenó",
    email: "albertu@thebridgeschool.es",
    category: "sucesos"
}
*/

const updateEntry =  async (entry) => {
  const { new_title, title, content, email, category } = entry;
  let client, result;
  try {
    client = await pool.connect();

    result = await client.query(queries.updateEntry,[new_title, content, email, category, title]
    );
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    // Cerrar conexión
    client.release();
  }
  return result.rowCount;
};

const editedEntry = {
    new_title:"Se acabaron las Magdalenas",
    title: "Noticia: Un panda suelto por la ciudad",
    content: "Corren rumores de que papa noel tenía un saco vacio y lo llenó",
    email: "albertu@thebridgeschool.es",
    category: "sucesos"
}

/* updateEntry(editedEntry)
.then(data=>console.log(data)); */

const entries = {
  getEntriesByEmail,
  getAllEntries,
  createEntry,
  updateEntry,
  //deleteEntry
}

module.exports = entries;
