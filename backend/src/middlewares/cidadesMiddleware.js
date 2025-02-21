const validateFieldNome = (req, res, next) => {
    const { nome } = req.body;
    if (!nome) { 
        return res.status(400).json({ message: 'The field "nome" is required and cannot be empty' }); 
    }
    next();
};

const validateFieldUf = (req, res, next) => {
    const { uf } = req.body;
    if (!uf) { 
        return res.status(400).json({ message: 'The field "uf" is required and cannot be empty' }); 
    }
    next();
};

module.exports = {
    validateFieldNome,
    validateFieldUf
};