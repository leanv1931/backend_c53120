const { Router } = require('express');
const router = Router();

router.get('/', async (req, res) => {
    const limit = req.query.limit;
    let responseProducts = await req.cartManager.getCarts();

    if (limit && !isNaN(limit)) {
        limit = parseInt(limit);
        responseProducts = responseProducts.slice(0, limit);
    }
    res.json(responseProducts);
});  

router.post('/', async (req, res) => {
    const { body } = req;
    let productoCreado = await req.cartManager.addCart(body);
  
    if (productoCreado) {
        res.status(201).json({ message: 'El cart fue creado con exito', carrito: body });
    } else {
        res.status(404).json({ error: 'el cart no pudo crearse'});
    }
});

router.get('/:cid', async (req, res) => {
    let { cid } = req.params;
    console.log('param es ', cid);
    cid = parseInt(cid);
  
    let productoFiltrado = await req.cartManager.getCarritoById(cid);
  
    if (productoFiltrado) {
        res.json(productoFiltrado.carrito);
    } else {
        res.status(404).json({ error: 'Carrito no encontrado desde servidor express' });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    let { body, params } = req;
    let { cid, pid } = params;
    cid = parseInt(cid);
    pid = parseInt(pid);
   let productoCreado = await req.cartManager.addProductToCart(cid, pid, body);

    if (productoCreado) {
        res.status(201).json({ message: 'El cart fue creado con exito', cart: productoCreado });
    } else {
        res.status(404).json({ error: 'el cart no pudo crearse  o carrito no encontrado'});
    } 
});

module.exports = router;