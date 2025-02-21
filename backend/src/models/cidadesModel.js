const connection = require('../connection');

const getAll = async () => {
    try {
        const [cidades] = await connection.execute('SELECT * FROM cidades');
        return cidades;
    } catch (error) {
        console.error('Error fetching bairros:', error);
        throw error;
    }
};

const getCidade = async (id) => {
    try {
        const query = 'SELECT * FROM cidades WHERE id = ?';
        const [cidade] = await connection.execute(query, [id]);
        return cidade[0];
    } catch (error) {
        console.error('Error fetching cidade:', error);
        throw error;
    }
};

const createCidade = async (cidade) => {
    try {
        const { nome, uf } = cidade;
        const queryCreate = 'INSERT INTO cidades(nome, uf) VALUES (?, ?)';
        const [createdCidade] = await connection.execute(queryCreate, [nome, uf]);
        return { insertId: createdCidade.insertId };
    } catch (error) {
        console.error('Error creating cidade:', error);
        throw error;
    }
};

const deleteCidade = async (id) => {
    try {
        const queryDelete = 'DELETE FROM cidades WHERE id = ?';
        const [removedCidade] = await connection.execute(queryDelete, [id]);
        return removedCidade;
    } catch (error) {
        console.error('Error deleting cidade:', error);
        throw error;
    }
};

const updateCidade = async (id, cidade) => {
    try {
        const { nome, uf } = cidade;
        const queryUpdate = 'UPDATE cidades SET nome = ?, uf = ? WHERE id = ?';
        const [updatedCidade] = await connection.execute(queryUpdate, [nome, uf, id]);
        return updatedCidade;
    } catch (error) {
        console.error('Error updating cidade:', error);
        throw error;
    }
};

module.exports = {
    getAll,
    getCidade,
    createCidade,
    deleteCidade,
    updateCidade
}

// -- Tabela: cidades
// CREATE TABLE IF NOT EXISTS cidades (
//   id INT(11) NOT NULL AUTO_INCREMENT,
//   nome VARCHAR(255) NOT NULL,
//   uf VARCHAR(2) NOT NULL,
//   PRIMARY KEY (id)
// );