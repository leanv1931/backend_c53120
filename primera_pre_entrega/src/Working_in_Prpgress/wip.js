const CartManager = require('./CartManager');


app.get('/carts/cid', async (req, res) => {
    await main();
    let { cid } = req.params;
    console.log('param es ', cid);
    cid = parseInt(cid);
    
     let cartFiltrado = await cartManager.getCarts();
    if (cartFiltrado) {
        res.json(cartFiltrado);
    } else {
        res.status(404).json({ error: 'carrito no encontrado desde servidor express' });
}

});



app.post('/:cid/product/:pid', async (req, res) => {
    await main();
    const { body } = req;
    const { params } = req;
    const cartId = params.cid;
    const prodId = params.uid;

    let productoCreado = await manager.addCart(body, cartId, prodId);
   // res.status(201).json(body);
    // nota : add validation by repetided code ....

    if (productoCreado) {
        res.status(201).json({ message: 'El carrito fue creado con exito', product: body });
    } else {
        res.status(404).json({ error: 'el carrito no pudo crearse'});
    }
});
