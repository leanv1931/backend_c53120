const { Router } = require('express');
const router = Router();


router.get('/', async (req, res) => {
    const { productManager } = req;
    const limit = req.query.limit;
    let responseProducts = await productManager.getProducts();

    if (limit && !isNaN(limit)) {
        limit = parseInt(limit);
        responseProducts = responseProducts.slice(0, limit);
    }
    res.json(responseProducts);
});  

router.get('/:pid', async (req, res) => {
    const { productManager } = req;
    let { pid } = req.params;
    console.log('param es ', pid);
    pid = parseInt(pid);
  
    let productoFiltrado = await productManager.getProductById(pid);
  
    if (productoFiltrado) {
        res.json(productoFiltrado);
    } else {
        res.status(404).json({ error: 'Producto no encontrado desde servidor express' });
    }
});

router.post('/', async (req, res) => {
    const { productManager } = req;
    const { body } = req;
    let productoCreado = await productManager.addProduct(body);
  
    if (productoCreado) {
        res.status(201).json({ message: 'El producto fue creado con exito', product: body });
    } else {
        res.status(404).json({ error: 'el producto no pudo crearse'});
    }
});

router.put('/:pid', async (req, res) => {
    const { productManager } = req;
    const { body, params } = req;
    const userId = params.pid;
  
    let productoActualizado = await productManager.updateProductById(userId, body);
  
    if (productoActualizado) {
        res.status(200).json({ message: 'El usuario fue actualizado correctamente 😅', product: productoActualizado});
    } else {
        res.status(404).json({ error: 'ID no se puede actualizar o ID no encontrado' });
    }
});
  
router.delete('/:uid', async (req, res) => {
    const { productManager } = req;
    const { params } = req;
    const userId = params.uid;

    let deletedId = await productManager.deleteProductById(userId);
    if (deletedId) {
        res.status(200).json({  message: 'El usuario se elimino correctamente 😅', userDeleted: deletedId});
    } else {
        res.status(404).json({ error: 'El usuario no se encontro 😨' });
    }

});

module.exports = router;