const express = require('express')
const app = express()
const port = 3000

// Rutas
const productsRoutes = require("./routes/products.routes")

app.use(express.json()); // Habilito recepción de JSON en servidor

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Rutas
//API
app.use('/api/products',productsRoutes);


app.listen(port, () => {
  console.log(`Nos vamos a por tortilla. Funcionando en: http://localhost:${port}`)
})