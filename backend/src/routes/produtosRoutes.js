const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController');
const produtosMiddleware = require('../middlewares/produtosMiddleware');

router.get('/', produtosController.getAll);
router.get('/:id', produtosController.getProduto);
router.post(
    '/',
    [produtosMiddleware.validateFieldNome, produtosMiddleware.validateFieldValor],
    produtosController.createProduto
);
router.delete('/:id', produtosController.deleteProduto);
router.put(
    '/:id',
    [produtosMiddleware.validateFieldNome, produtosMiddleware.validateFieldValor],
    produtosController.updateProduto
);

module.exports = router;