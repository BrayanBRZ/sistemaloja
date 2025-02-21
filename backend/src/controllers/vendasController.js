const vendasModel = require('../models/vendasModel');

const getAll = async (_req, res) => {
    try {
        const vendas = await vendasModel.getAll();
        return res.status(200).json(vendas);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getLastVendaId = async (_req, res) => {
    try {
        const lastVendaId = await vendasModel.getLastVendaId();
        return res.status(200).json(lastVendaId);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to get last venda id' });
    }
};

const getVenda = async (req, res) => {
    try {
        const { id } = req.params;
        const venda = await vendasModel.getVenda(id);
        return res.status(200).json(venda);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const createVenda = async (req, res) => {
    try {
        const createdVenda = await vendasModel.createVenda(req.body);
        return res.status(201).json(createdVenda);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to create venda' });
    }
};

const deleteVenda = async (req, res) => {
    try {
        const { id } = req.params;
        await vendasModel.deleteVenda(id);
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to delete venda' });
    }
};

const updateVenda = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedVenda = await vendasModel.updateVenda(id, req.body);
        
        // Retorna o ID da venda atualizada
        return res.status(200).json({ insertId: updatedVenda.id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to update venda' });
    }
};

module.exports = {
    getAll,
    getLastVendaId,
    getVenda,
    createVenda,
    deleteVenda,
    updateVenda
};