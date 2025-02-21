const validateFieldVendaId = (req, res, next) => {
    const { venda_id } = req.body;
    if (!venda_id) {
        return res.status(400).json({ message: 'The field "venda_id" is required' });
    }
    next();
};

const validateFieldProdutoId = (req, res, next) => {
    const { produto_id } = req.body;
    if (!produto_id) {
        return res.status(400).json({ message: 'The field "produto_id" is required' });
    }
    next();
};

const validateFieldQuantidade = (req, res, next) => {
    const { quantidade } = req.body;
    if (!quantidade || quantidade <= 0) {
        return res.status(400).json({ message: 'The field "quantidade" is required and must be greater than 0' });
    }
    next();
};

const validateFieldSubtotal = (req, res, next) => {
    const { subtotal } = req.body;
    if (!subtotal || subtotal <= 0) {
        return res.status(400).json({ message: 'The field "subtotal" is required and must be greater than 0' });
    }
    next();
};

module.exports = {
    validateFieldVendaId,
    validateFieldProdutoId,
    validateFieldQuantidade,
    validateFieldSubtotal
};