import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  let responseProducts = await req.productManager.getProducts();
  res.status(200).json(responseProducts);
 // res.render('index', { title: 'index 😎', responseProducts });
});


router.delete('/:uid', async (req, res) => {
    const { params } = req;
    const userId = params.uid;
    let deletedId = await req.productManager.deleteProductById(userId);
    if (deletedId) {
        res.status(200).json({  message: 'El usuario se elimino correctamente 😅', userDeleted: deletedId});
    } else {
        res.status(404).json({ error: 'El usuario no se encontro 😨' });
    }
});


router.get('/:pid', async (req, res) => {
  let { pid } = req.params;
  console.log('param es ', pid);
  let productoFiltrado = await req.productManager.getProductById(pid);

  if (productoFiltrado) {
    res.json(productoFiltrado);
   // res.render(productoFiltrado);
  } else {
    res.status(404).json({ error: 'Producto no encontrado desde servidor express' });
  }
});


router.post('/', async (req, res) => {
  const { body } = req;
  let productoCreado = await req.productManager.addProduct(body);

  if (productoCreado) {
      res.status(201).json({ message: 'El producto fue creado con exito', product: body });
  } else {
      res.status(404).json({ error: 'el producto no pudo crearse'});
  }
});


export default router;