import { Router } from "express";
import { ProductManager } from "../../ProductManager.js"

const router = Router();
const PM = new ProductManager("./productos.json");

router.get("/", async (req, res) => {
    let limit = req.query.limit;
    let prodLimit = await PM.getProducts();

    if(limit && !isNaN(limit)) {
        limit = parseInt(limit);
        prodLimit = prodLimit.slice(0, limit);
    }
    res.send(prodLimit);
});

router.get("/:pid", async (req, res) => {
  let { pid } = req.params;
  pid = parseInt(pid);

  let prodFiltrado = await PM.getProductById(pid);
  if(prodFiltrado){
      res.send(prodFiltrado);
  } else {
      res.status(404).send({error: 'Producto no encontrado - no existe' })
  }
});


router.post('/', async (req, res) => {
  let  body  = req.body;
  try {
    let productoCreado = await PM.addProduct(body);
    res.status(201).json({ message: 'El producto fue creado con exito', product: productoCreado });
} catch (error) {
    console.error("ERROR: ", error.message);
    res.status(400).json({ error: error.message });
}
});

router.put('/:pid', async (req, res) => {
  const { body, params } = req;
  const Id = params.pid;

  try {
    let productoActualizado = await PM.updateProductById(Id, body);
    res.status(200).json({ message: 'El usuario fue actualizado correctamente', product: productoActualizado});
  }catch(error){
    console.error("ERROR: ", error.message);
    res.status(400).json({ error: error.message });

  }
});

router.delete('/:pid', async (req, res) => {
  let  { params }  = req;
  let Id = params.pid;

  try{
    let deletedId = await PM.deleteProductById(Id);
    res.status(200).json({  message: 'El producto se elimino correctamente', productoDeleted: deletedId});
  }catch(error){
    res.status(404).json({ error: error.message+ ' 😨' });
  }



});




export default router;