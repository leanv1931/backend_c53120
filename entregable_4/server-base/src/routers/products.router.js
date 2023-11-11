import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  let responseProducts = await req.productManager.getProducts();
//   res.json(responseProducts); 
//   res.render('index', { title: 'Products handlebars 🚀', responseProducts });

 // res.render('real', { title: 'realTimeProducts 😎', responseProducts });
  res.render('real', { title: 'real 😎', responseProducts });

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
  pid = parseInt(pid);

  let productoFiltrado = await req.productManager.getProductById(pid);

  if (productoFiltrado) {
      res.json(productoFiltrado);
  } else {
      res.status(404).json({ error: 'Producto no encontrado desde servidor express' });
  }
});

export default router;


