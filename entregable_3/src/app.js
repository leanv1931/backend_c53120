
import express from "express";
import { ProductManager } from "./ProductManager.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PM = new ProductManager("./data.json");

app.get("/products", async (req, res) => {
    let limit = req.query.limit;
    let prodLimit = await PM.getProducts();

    if(limit && !isNaN(limit)) {
        limit = parseInt(limit);
        prodLimit = prodLimit.slice(0, limit);
    }
    res.send(prodLimit);
});

app.get("/products/:pid", async (req, res) => {
    let { pid } = req.params;
    console.log('param es ', pid);
    pid = parseInt(pid);

    let prodFiltrado = await PM.getProductById(pid);
    if(prodFiltrado){
        res.send(prodFiltrado);
    } else {
        res.status(404).json({error: 'Producto no encontrado - no existe' })
    }
});

const PORT = process.env.PORT || 8084;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
