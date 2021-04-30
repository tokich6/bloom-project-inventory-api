const express = require('express')
const app = express()
const port = 3001
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./database')

//for local development tests
const corsOptions = {
  origin: 'http://localhost:3000',
}

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres inventory-api. This is CORS-enabled for http://localhost:3000!' })
})

app.get('/products', cors(corsOptions), db.getAllProducts)

app.get('/products/:id', cors(corsOptions), db.getProductById)

//tested on Postman only, not called from frontend app (quantity remains the same post order)
app.put('/products/:id', cors(corsOptions), db.updateProduct)


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})