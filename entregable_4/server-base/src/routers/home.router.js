import { Router } from 'express';


const router = Router();


router.get('/', async (req, res) => {
  let responseProducts = await req.productManager.getProducts();
  res.render('home', { title: 'Home 😎', responseProducts });
});

export default router;