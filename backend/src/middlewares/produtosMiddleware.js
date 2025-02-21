const validateFieldNome = (req, res, next) => {
    const { nome } = req.body;
    if (!nome) { 
        return res.status(400).json({ message: 'The field "nome" is required and cannot be empty' }); 
    }
    next();
};

const validateFieldValor = (req, res, next) => {
    const { valor } = req.body;

    if (valor === undefined || valor === null) {
        return res.status(400).json({ message: 'The field "valor" is required' });
    }
    if (isNaN(valor)) {
        return res.status(400).json({ message: 'The field "valor" must be a valid number' });
    }
    const regex = /^[0-9]+(\.[0-9]{1,2})?$/;
    if (!regex.test(valor)) {
        return res.status(400).json({ message: 'The field "valor" must be a number with up to two decimal places' });
    }
    if (valor <= 0) {
        return res.status(400).json({ message: 'The field "valor" must be a positive number' });
    }

    next();
};

module.exports = {
    validateFieldNome,
    validateFieldValor
};