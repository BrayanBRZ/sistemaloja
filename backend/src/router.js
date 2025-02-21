const express = require('express');
const router = express.Router();

// Importando rotas
const cidadesRoutes = require('./routes/cidadesRoutes');
const bairrosRoutes = require('./routes/bairrosRoutes');
const pessoasRoutes = require('./routes/pessoasRoutes');
const produtosRoutes = require('./routes/produtosRoutes');
const vendasRoutes = require('./routes/vendasRoutes');
const itensVendaRoutes = require('./routes/itensVendaRoutes');

// Definindo os prefixos das rotas
router.use('/cidades', cidadesRoutes);
router.use('/bairros', bairrosRoutes);
router.use('/pessoas', pessoasRoutes);
router.use('/produtos', produtosRoutes);
router.use('/vendas', vendasRoutes);
router.use('/itens_venda', itensVendaRoutes);

module.exports = router;