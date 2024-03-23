import express  from "express";
import productRouter from "./src/routes/products.router.js";
import cartRouter from "./src/routes/carts.router.js";
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
    next();
  });

  app.use( async (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
    next();
  });



  

//Use routers
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
});