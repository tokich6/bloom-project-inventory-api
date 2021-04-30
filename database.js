// commands called from psql cli

// CREATE DATABASE inventory;

// CREATE TABLE [IF NOT EXISTS] products  (
//   id SERIAL PRIMARY KEY,
//   name VARCHAR(100) NOT NULL,
//   price NUMERIC NOT NULL,
//   quantity NUMERIC NOT NULL,
// );

// INSERT INTO products (name, price, quantity)
// VALUES ('HP Laptop', 550, 21), ('MacBook Pro Laptop', 1600, 3), ('IPhone 12', 800, 19);

const Pool = require('pg').Pool

const pool = new Pool({
  host: 'localhost',
  database: 'inventory',
  port: 5432,
})

const getAllProducts = (request, response) => {
  pool.query('SELECT * FROM products', (error, results) => {
    if (error) {
      console.log('cannot connect');
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getProductById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM products WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const updateProduct = (request, response) => {
  const id = parseInt(request.params.id)
  const { quantity } = request.body

  pool.query(
    'UPDATE products SET quantity = $1 WHERE id = $2',
    [quantity, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Product quantity modified with ID: ${id}`)
    }
  )
}

module.exports = {
  getAllProducts,
  getProductById,
  updateProduct
}