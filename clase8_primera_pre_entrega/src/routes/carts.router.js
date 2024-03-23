import { Router } from "express";

import { CartManager} from "../../CartManager.js"

const router = Router();

const PM = new CartManager("./cart.json");

router.get("/", async (req, res) => {
    let limit = req.query.limit;
    let prodLimit = await PM.getProducts();

    if(limit && !isNaN(limit)) {
        limit = parseInt(limit);
        prodLimit = prodLimit.slice(0, limit);
    }
    res.send(prodLimit);

  //  res.status(201).send({message: "ok express "})
});



router.post('/', async (req, res) => {
  let  body  = req.body;
  try {
    let productoCreado = await PM.addProduct(body);
    res.status(201).json({ message: 'El cart fue creado con exito', cart: productoCreado });
} catch (error) {
    console.error("ERROR: ", error.message);
    res.status(400).json({ error: error.message });
}
});

router.post('/:cid/product/:pid', async (req, res) => {
  let { body, params } = req;
  let { cid, pid } = params;
  cid = parseInt(cid);
  pid = parseInt(pid);
  try{
    let productoCreado = await PM.addProductToCart(cid, pid, body);
    res.status(201).json({ message: 'El cart fue creado con exito', cart: productoCreado });
  }catch(error){
    console.error("ERROR: ", error.message);
    res.status(400).json({ error: error.message });
  } 
});


router.get("/:cid", async (req, res) => {
  let { cid } = req.params;
  cid = parseInt(cid);

  let prodFiltrado = await PM.getProductById(cid);
  if(prodFiltrado){
      res.send(prodFiltrado);
  } else {
      res.status(404).send({error: 'cart no encontrado - no existe' })
  }
});






export default router;