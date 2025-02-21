const connection = require('../connection');

const getAll = async () => {
    try {
        const [bairros] = await connection.execute('SELECT * FROM bairros');
        return bairros;
    } catch (error) {
        console.error('Error fetching bairros:', error);
        throw error;
    }
};

const getBairro = async (id) => {
    try {
        const query = 'SELECT * FROM bairros WHERE id = ?';
        const [bairro] = await connection.execute(query, [id]);
        return bairro[0];
    } catch (error) {
        console.error('Error fetching bairro:', error);
        throw error;
    }
};

const createBairro = async (bairro) => {
    try {
        const { nome } = bairro;
        const queryCreate = 'INSERT INTO bairros(nome) VALUES (?)';
        const [createdBairro] = await connection.execute(queryCreate, [nome]);
        return { insertId: createdBairro.insertId };
    } catch (error) {
        console.error('Error creating bairros:', error);
        throw error;
    }
};

const deleteBairro = async (id) => {
    try {
        const queryDelete = 'DELETE FROM bairros WHERE id = ?';
        const [removedBairro] = await connection.execute(queryDelete, [id]);
        return removedBairro;
    } catch (error) {
        console.error('Error deleting bairro:', error);
        throw error;
    }
};

const updateBairro = async (id, bairro) => {
    try {
        const { nome } = bairro;
        const queryUpdate = 'UPDATE bairros SET nome = ? WHERE id = ?';
        const [updatedBairro] = await connection.execute(queryUpdate, [nome, id]);
        return updatedBairro;
    } catch (error) {
        console.error('Error updating bairro:', error);
        throw error;
    }
};

module.exports = {
    getAll,
    getBairro,
    createBairro,
    deleteBairro,
    updateBairro
}

// -- Tabela: bairros
// CREATE TABLE IF NOT EXISTS bairros (
//   id INT(11) NOT NULL AUTO_INCREMENT,
//   nome VARCHAR(255) NOT NULL,
//   PRIMARY KEY (id)
// );