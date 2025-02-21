const validateFieldNome = (req, res, next) => {
    const { nome } = req.body;
    if (!nome || nome.trim() === '') { 
        return res.status(400).json({ message: 'The field "nome" is required and cannot be empty' }); 
    }
    next();
};

const validateFieldCidadeId = (req, res, next) => {
    const { cidade_id } = req.body;
    if (!cidade_id || isNaN(cidade_id)) { 
        return res.status(400).json({ message: 'The field "cidade_id" is required and must be a number' }); 
    }
    next();
};

const validateFieldBairroId = (req, res, next) => {
    const { bairro_id } = req.body;
    if (!bairro_id || isNaN(bairro_id)) { 
        return res.status(400).json({ message: 'The field "bairro_id" is required and must be a number' }); 
    }
    next();
};

const validateFieldCep = (req, res, next) => {
    const { cep } = req.body;
    const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;
    if (!cep || !cepRegex.test(cep)) { 
        return res.status(400).json({ message: 'The field "cep" is required and must be a valid format (e.g., 12345-678)' }); 
    }
    next();
};

const validateFieldEndereco = (req, res, next) => {
    const { endereco } = req.body;
    if (!endereco || endereco.trim() === '') { 
        return res.status(400).json({ message: 'The field "endereco" is required and cannot be empty' }); 
    }
    next();
};

const validateFieldNumero = (req, res, next) => {
    const { numero } = req.body;
    if (!numero || numero.trim() === '') { 
        return res.status(400).json({ message: 'The field "numero" is required and cannot be empty' }); 
    }
    next();
};

const validateFieldComplemento = (req, res, next) => {
    const { complemento } = req.body;
    if (complemento && complemento.trim() === '') { 
        return res.status(400).json({ message: 'The field "complemento" cannot be empty' }); 
    }
    next();
};

const validateFieldTelefone = (req, res, next) => {
    const { telefone } = req.body;
    const telefoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    if (!telefone || !telefoneRegex.test(telefone)) { 
        return res.status(400).json({ message: 'The field "telefone" is required and must be a valid format (e.g., (11) 98765-4321)' }); 
    }
    next();
};

const validateFieldEmail = (req, res, next) => {
    const { email } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) { 
        return res.status(400).json({ message: 'The field "email" is required and must be a valid email address' }); 
    }
    next();
};

module.exports = {
    validateFieldNome,
    validateFieldCidadeId,
    validateFieldBairroId,
    validateFieldCep,
    validateFieldEndereco,
    validateFieldNumero,
    validateFieldComplemento,
    validateFieldTelefone,
    validateFieldEmail
};
