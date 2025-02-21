const express = require('express');
const router = express.Router();
const bairrosController = require('../controllers/bairrosController');
const bairrosMiddleware = require('../middlewares/bairrosMiddleware');

router.get('/', bairrosController.getAll);
router.get('/:id', bairrosController.getBairro);
router.post('/', bairrosMiddleware.validateFieldNome, bairrosController.createBairro);
router.delete('/:id', bairrosController.deleteBairro);
router.put('/:id', bairrosMiddleware.validateFieldNome, bairrosController.updateBairro);

module.exports = router;