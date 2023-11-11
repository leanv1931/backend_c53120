import { Router } from 'express';


const router = Router();


router.get('/', async (req, res) => {
  let responseProducts = await req.productManager.getProducts();
  res.render('realTimeProducts', { title: 'RealTime Products CoderHouse 😎', responseProducts });
});

export default router;