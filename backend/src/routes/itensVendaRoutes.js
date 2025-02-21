const express = require('express');
const router = express.Router();
const itensVendaController = require('../controllers/itens_vendaController');
const itensVendaMiddleware = require('../middlewares/itens_vendaMiddleware');

const validateItemVenda = [
    itensVendaMiddleware.validateFieldVendaId,
    itensVendaMiddleware.validateFieldProdutoId,
    itensVendaMiddleware.validateFieldQuantidade,
    itensVendaMiddleware.validateFieldSubtotal
];

router.get('/', itensVendaController.getAll);
router.get('/:id', itensVendaController.getItensVenda);
router.post('/', validateItemVenda, itensVendaController.createItemVenda);
router.delete('/:id', itensVendaController.deleteItemVenda);
router.put('/:id', validateItemVenda, itensVendaController.updateItemVenda);

module.exports = router;