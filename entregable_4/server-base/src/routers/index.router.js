import { Router } from 'express';


const router = Router();


router.get('/', async (req, res) => {

  const limit = req.query.limit;
  let responseProducts = await req.productManager.getProducts();

  if (limit && !isNaN(limit)) {
      limit = parseInt(limit);
      responseProducts = responseProducts.slice(0, limit);
  }
//   res.json(responseProducts); 
//   res.render('index', { title: 'Products handlebars 🚀', responseProducts });

 // res.render('real', { title: 'realTimeProducts 😎', responseProducts });

  res.render('index', { title: 'Coder House index 😎', responseProducts });

});

export default router;