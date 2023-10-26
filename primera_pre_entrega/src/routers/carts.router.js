const { Router } = require('express');
const router = Router();

router.get('/', async (req, res) => {
    const { cartManager } = req;
    const limit = req.query.limit;
    let responseCarts = await cartManager.getCarts();

    if (limit && !isNaN(limit)) {
        limit = parseInt(limit);
        responseCarts = responseCarts.slice(0, limit);
    }
    res.json(responseCarts);
});  

module.exports = router;