const pessoasModel = require('../models/pessoasModel');

const getAll = async (_req, res) => {
    try {
        const pessoas = await pessoasModel.getAll();
        return res.status(200).json(pessoas);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getPessoa = async (req, res) => {
    try {
        const { id } = req.params;
        const pessoa = await pessoasModel.getPessoa(id);
        return res.status(200).json(pessoa);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const createPessoa = async (req, res) => {
    try {
        const createdPessoa = await pessoasModel.createPessoa(req.body);
        return res.status(201).json(createdPessoa);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to create pessoa' });
    }
};

const deletePessoa = async (req, res) => {
    try {
        const { id } = req.params;
        await pessoasModel.deletePessoa(id);
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to delete pessoa' });
    }
};

const updatePessoa = async (req, res) => {
    try {
        const { id } = req.params;
        await pessoasModel.updatePessoa(id, req.body);
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to update pessoa' });
    }
};

module.exports = {
    getAll,
    getPessoa,
    createPessoa,
    deletePessoa,
    updatePessoa
}