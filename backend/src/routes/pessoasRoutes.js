const express = require('express');
const router = express.Router();
const pessoasController = require('../controllers/pessoasController');
const pessoasMiddleware = require('../middlewares/pessoasMiddleware');

const validatePessoa = [
    pessoasMiddleware.validateFieldNome,
    pessoasMiddleware.validateFieldCidadeId,
    pessoasMiddleware.validateFieldBairroId,
    pessoasMiddleware.validateFieldCep,
    pessoasMiddleware.validateFieldEndereco,
    pessoasMiddleware.validateFieldNumero,
    pessoasMiddleware.validateFieldComplemento,
    pessoasMiddleware.validateFieldTelefone,
    pessoasMiddleware.validateFieldEmail
];

router.get('/', pessoasController.getAll);
router.get('/:id', pessoasController.getPessoa);
router.post('/', validatePessoa, pessoasController.createPessoa);
router.delete('/:id', pessoasController.deletePessoa);
router.put('/:id', validatePessoa, pessoasController.updatePessoa);

module.exports = router;