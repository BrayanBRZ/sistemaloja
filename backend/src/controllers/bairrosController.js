const bairrosModel = require('../models/bairrosModel');

const getAll = async (_req, res) => {
    try {
        const bairros = await bairrosModel.getAll();
        return res.status(200).json(bairros);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getBairro = async (req, res) => {
    try {
        const { id } = req.params;
        const bairro = await bairrosModel.getBairro(id);
        return res.status(200).json(bairro);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const createBairro = async (req, res) => {
    try {
        const createdBairro = await bairrosModel.createBairro(req.body);
        return res.status(201).json(createdBairro);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to create bairro' });
    }
};

const deleteBairro = async (req, res) => {
    try {
        const { id } = req.params;
        await bairrosModel.deleteBairro(id);
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to delete bairro' });
    }
};

const updateBairro = async (req, res) => {
    try {
        const { id } = req.params;
        await bairrosModel.updateBairro(id, req.body);
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to update bairro' });
    }
};

module.exports = {
    getAll,
    getBairro,
    createBairro,
    deleteBairro,
    updateBairro
}