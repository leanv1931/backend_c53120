

const express = require('express');
const usersRouter = require('./routers/users.router');
const cartsRouter = require('./routers/carts.router');

const ProductManager = require('./ProductManager');
const CartManager = require('./CartManager');

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

async function initializeData() {
    const filePath = './src/data.json';
    const manager = new ProductManager(filePath);
    await manager.init();

    const filePathCarrito = './src/carrito.json';
    const cartManager = new CartManager(filePathCarrito);
    await cartManager.init();

   //  return { manager, cartManager}; 
   return manager
}


app.use(async (req, res, next) => {
    req.productManager = await initializeData();
//  req.carttManager = await initializeData();
    next();
});

app.use('/api/products', usersRouter);
// app.use('/api/carts', cartsRouter);

app.listen(8129, () => {
    console.log('Servidor http escuchando en el puerto 8080.');
})



