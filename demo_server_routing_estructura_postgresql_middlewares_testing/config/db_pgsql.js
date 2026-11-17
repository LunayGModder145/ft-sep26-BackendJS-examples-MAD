const { Pool } = require("pg");

// importa el .env
require("dotenv").config();
// console.log(process.env);

// Objeto de conexión a la BBDD
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
});

const prueba = async () =>{
    // Abrir conexión
    const client = await pool.connect();

    // Lanzar petición SQL
    const result = await client.query("SELECT NOW()");
    console.log("Conectado a la BBDD: "+result.rows[0].now);
    
    // Cerrar conexión
    client.release();
}

prueba();

module.exports = pool;
