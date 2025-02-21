const express = require('express');
const router = express.Router();
const vendasController = require('../controllers/vendasController');
const vendasMiddleware = require('../middlewares/vendasMiddleware');

const validateVenda = [
    vendasMiddleware.validateFieldDataVenda,
    vendasMiddleware.validateFieldPessoaId,
    vendasMiddleware.validateFieldValorTotal
];

router.get('/', vendasController.getAll);
router.get('/lastId', vendasController.getLastVendaId);
router.get('/:id', vendasController.getVenda);
router.post('/', validateVenda, vendasController.createVenda);
router.put('/:id', validateVenda, vendasController.updateVenda);
router.delete('/:id', vendasController.deleteVenda);

module.exports = router;