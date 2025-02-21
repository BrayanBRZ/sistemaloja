const validateFieldDataVenda = (req, res, next) => {
    const { data_venda } = req.body;
    if (!data_venda) { 
        return res.status(400).json({ message: 'The field "data_venda" is required' });
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Exemplo: "YYYY-MM-DD"
    if (!dateRegex.test(data_venda)) {
        return res.status(400).json({ message: 'The field "data_venda" must be in the format YYYY-MM-DD' });
    }

    next();
};

const validateFieldPessoaId = (req, res, next) => {
    const { pessoa_id } = req.body;
    if (!pessoa_id) { 
        return res.status(400).json({ message: 'The field "pessoa_id" is required' });
    }

    if (isNaN(pessoa_id) || pessoa_id <= 0) {
        return res.status(400).json({ message: 'The field "pessoa_id" must be a valid positive integer' });
    }

    next();
};

const validateFieldValorTotal = (req, res, next) => {
    const { valor_total } = req.body;

    if (valor_total === undefined || valor_total === null) {
        return res.status(400).json({ message: 'The field "valor_total" is required' });
    }

    if (isNaN(valor_total)) {
        return res.status(400).json({ message: 'The field "valor_total" must be a valid number' });
    }

    const regex = /^[0-9]+(\.[0-9]{1,2})?$/;
    if (!regex.test(valor_total)) {
        return res.status(400).json({ message: 'The field "valor_total" must be a number with up to two decimal places' });
    }

    if (valor_total <= 0) {
        return res.status(400).json({ message: 'The field "valor_total" must be a positive number' });
    }

    next();
};

module.exports = {
    validateFieldDataVenda,
    validateFieldPessoaId,
    validateFieldValorTotal
};