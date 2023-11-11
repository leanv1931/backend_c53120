import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';

import { __dirname } from './utils.js';
import realRouter from './routers/real.router.js';
import homeRouter from './routers/home.router.js';
import productsRouter from './routers/products.router.js';
import ProductManager from'./ProductManager.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

const filePath = './src/data.json';


const productManager = new ProductManager(filePath);

async function initializeProductManager() {
  await productManager.init();
  return productManager;
}



app.use(async (req, res, next) => {
  req.productManager = await initializeProductManager();
  next();
});

app.use('/api/products', productsRouter);
app.use('/realTimeProducts', realRouter);
app.use('/', homeRouter);
 
app.use((error, req, res, next) => {
  const message = `Ah ocurrido un error desconocido 😨: ${error.message}`;
  console.error(message);
  res.status(500).json({ message });
});

export default app;
