const validateFieldNome = (req, res, next) => {
    const { nome } = req.body;
    if (!nome) { 
        return res.status(400).json({ message: 'The field "nome" is required and cannot be empty' }); 
    }
    next();
};

module.exports = {
    validateFieldNome
};