const connection = require('../connection');

const getAll = async () => {
    try {
        const [produtos] = await connection.execute('SELECT * FROM produtos');
        return produtos;
    } catch (error) {
        console.error('Error fetching produtos:', error);
        throw error;
    }
};

const getProduto = async (id) => {
    try {
        const query = 'SELECT * FROM produtos WHERE id = ?';
        const [produto] = await connection.execute(query, [id]);
        return produto[0];
    } catch (error) {
        console.error('Error fetching produto:', error);
        throw error;
    }
};

const createProduto = async (produto) => {
    try {
        const { nome, valor } = produto;
        const queryCreate = 'INSERT INTO produtos(nome, valor) VALUES (?, ?)';
        const [createdProduto] = await connection.execute(queryCreate, [nome, valor]);
        return { insertId: createdProduto.insertId };
    } catch (error) {
        console.error('Error creating produto:', error);
        throw error;
    }
};

const deleteProduto = async (id) => {
    try {
        const queryDelete = 'DELETE FROM produtos WHERE id = ?';
        const [removedProduto] = await connection.execute(queryDelete, [id]);
        return removedProduto;
    } catch (error) {
        console.error('Error deleting produto:', error);
        throw error;
    }
};

const updateProduto = async (id, produto) => {
    try {
        const { nome, valor } = produto;
        const queryUpdate = 'UPDATE produtos SET nome = ?, valor = ? WHERE id = ?';
        const [updatedProduto] = await connection.execute(queryUpdate, [nome, valor, id]);
        return updatedProduto;
    } catch (error) {
        console.error('Error updating produto:', error);
        throw error;
    }
};

module.exports = {
    getAll,
    getProduto,
    createProduto,
    deleteProduto,
    updateProduto
};

// -- Tabela: produtos
// CREATE TABLE IF NOT EXISTS produtos (
//   id INT(11) NOT NULL AUTO_INCREMENT,
//   nome VARCHAR(255) NOT NULL,
//   valor DECIMAL(10,2) NOT NULL,
//   PRIMARY KEY (id)
// );