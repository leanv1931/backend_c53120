

const express = require('express');
const productsRouter = require('./routers/products.router');
const cartsRouter = require('./routers/carts.router');

const ProductManager = require('./ProductManager');
const CartManager = require('./CartManager');

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const filePath = './src/data.json';
const filePathCarrito = './src/carrito.json';

const productManager = new ProductManager(filePath);
const cartManager = new CartManager(filePathCarrito);

async function initializeProductManager() {
    await productManager.init();
    return productManager;
}

async function initializeCartManager() {
    await cartManager.init();
    return cartManager;
}

app.use(async (req, res, next) => {
    req.productManager = await initializeProductManager();
    req.cartManager = await initializeCartManager(); 
    next();
});

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(8083, () => {
    console.log('Servidor http escuchando en el puerto 8080.');
})



