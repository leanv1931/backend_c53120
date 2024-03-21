import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';


import { __dirname } from './utils.js';
 // import realRouter from './routers/real.router.js';
//import homeRouter from './routers/home.router.js';

import { ProductManager } from "./ProductManager.js";


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//app.use(express.static(path.join(__dirname, '../public')));


app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');


const PM = new ProductManager("./data.json");


app.get("/", async (req, res) => {
  res.render('home', { title: 'Mi Proyecto' });

});




  const PORT = process.env.PORT || 3002;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });