const ProductManager = require('./ProductManager');
const express = require('express');

const app = express();
app.use(express.urlencoded({ extended: true }));

let manager;
let productos;

async function main() {
    const filePath = './src/data.json';
    manager = new ProductManager(filePath);
    await manager.init();
    productos = await manager.getProducts();
}

app.get('/', (req, res) => {
    res.send('Hola desde el servidor de express.');
  });


app.get('/products', async (req, res) => {
    await main();
    let limit = req.query.limit; 
    let responseProducts = productos;

    if (limit && !isNaN(limit)) {
        limit = parseInt(limit);
        responseProducts = responseProducts.slice(0, limit);
    }
    res.json(responseProducts);
});  

app.get('/products/:pid', async (req, res) => {
  await main();
  let { pid } = req.params;
  console.log('param es ', pid);
  pid = parseInt(pid);

  let productoFiltrado = await manager.getProductById(pid);

  if (productoFiltrado) {
      res.json(productoFiltrado);
  } else {
      res.status(404).json({ error: 'Producto no encontrado desde servidor express' });
  }
});

app.listen(8108, () => {
    console.log('Servidor http escuchando en el puerto 8080.');
})