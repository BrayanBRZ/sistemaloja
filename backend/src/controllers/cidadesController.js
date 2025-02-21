const cidadesModel = require('../models/cidadesModel');

const getAll = async (_req, res) => {
    try {
        const cidades = await cidadesModel.getAll();
        return res.status(200).json(cidades);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getCidade = async (req, res) => {
    try {
        const { id } = req.params;
        const cidade = await cidadesModel.getCidade(id);
        return res.status(200).json(cidade);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const createCidade = async (req, res) => {
    try {
        const createdCidade = await cidadesModel.createCidade(req.body);
        return res.status(201).json(createdCidade);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to create cidade' });
    }
};

const deleteCidade = async (req, res) => {
    try {
        const { id } = req.params;
        await cidadesModel.deleteCidade(id);
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to delete cidade' });
    }
};

const updateCidade = async (req, res) => {
    try {
        const { id } = req.params;
        await cidadesModel.updateCidade(id, req.body);
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to update cidade' });
    }
};

module.exports = {
    getAll,
    getCidade,
    createCidade,
    deleteCidade,
    updateCidade
}