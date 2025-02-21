const itensVendaModel = require('../models/itens_vendaModel');

const getAll = async (_req, res) => {
    try {
        const itensVenda = await itensVendaModel.getAll();
        return res.status(200).json(itensVenda);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getItensVenda = async (req, res) => {
    try {
        const { id } = req.params;
        const itensVenda = await itensVendaModel.getItensVenda(id);
        return res.status(200).json(itensVenda);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const createItemVenda = async (req, res) => {
    try {
        const createdItemVenda = await itensVendaModel.createItemVenda(req.body);
        return res.status(201).json(createdItemVenda);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to create item venda' });
    }
};

const deleteItemVenda = async (req, res) => {
    try {
        const { id } = req.params;
        await itensVendaModel.deleteItemVenda(id);
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to delete item venda' });
    }
};

const updateItemVenda = async (req, res) => {
    try {
        const { id } = req.params;
        await itensVendaModel.updateItemVenda(id, req.body);
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to update item venda' });
    }
};

module.exports = {
    getAll,
    getItensVenda,
    createItemVenda,
    deleteItemVenda,
    updateItemVenda
};
