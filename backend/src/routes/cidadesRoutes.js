const express = require('express');
const router = express.Router();
const cidadesController = require('../controllers/cidadesController');
const cidadesMiddleware = require('../middlewares/cidadesMiddleware');

router.get('/', cidadesController.getAll);
router.get('/:id', cidadesController.getCidade);
router.post('/', cidadesMiddleware.validateFieldNome, cidadesController.createCidade);
router.delete('/:id', cidadesController.deleteCidade);
router.put('/:id', 
    cidadesMiddleware.validateFieldNome, 
    cidadesMiddleware.validateFieldUf, 
    cidadesController.updateCidade
);

module.exports = router;