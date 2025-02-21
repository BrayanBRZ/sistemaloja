const produtosModel = require('../models/produtosModel');

const getAll = async (_req, res) => {
    try {
        const produtos = await produtosModel.getAll();
        return res.status(200).json(produtos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await produtosModel.getProduto(id);
        return res.status(200).json(produto);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const createProduto = async (req, res) => {
    try {
        const createdProduto = await produtosModel.createProduto(req.body);
        return res.status(201).json(createdProduto);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to create produto' });
    }
};

const deleteProduto = async (req, res) => {
    try {
        const { id } = req.params;
        await produtosModel.deleteProduto(id);
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to delete produto' });
    }
};

const updateProduto = async (req, res) => {
    try {
        const { id } = req.params;
        await produtosModel.updateProduto(id, req.body);
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to update produto' });
    }
};

module.exports = {
    getAll,
    getProduto,
    createProduto,
    deleteProduto,
    updateProduto
};