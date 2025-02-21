const connection = require('../connection');

const getAll = async () => {
    try {
        const [pessoas] = await connection.execute('SELECT * FROM pessoas');
        return pessoas;
    } catch (error) {
        console.error('Error fetching pessoas:', error);
        throw error;
    }
};

const getPessoa = async (id) => {
    try {
        const query = 'SELECT * FROM pessoas WHERE id = ?';
        const [pessoa] = await connection.execute(query, [id]);
        return pessoa[0]; // Retorna o primeiro (e único) item, pois esperamos uma única pessoa
    } catch (error) {
        console.error('Error fetching pessoa:', error);
        throw error;
    }
};

const createPessoa = async (pessoa) => {
    try {
        const { nome, cidade_id, bairro_id, cep, endereco, numero, complemento, telefone, email } = pessoa;

        const queryCreate = `
            INSERT INTO pessoas(nome, cidade_id, bairro_id, cep, endereco, numero, complemento, telefone, email)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const [createdPessoa] = await connection.execute(queryCreate,
            [nome, cidade_id, bairro_id, cep, endereco, numero, complemento, telefone, email]);

        return { insertId: createdPessoa.insertId };
    } catch (error) {
        console.error('Error creating pessoa:', error);
        throw error;
    }
};

const deletePessoa = async (id) => {
    try {
        const queryDelete = 'DELETE FROM pessoas WHERE id = ?';
        const [removedPessoa] = await connection.execute(queryDelete, [id]);
        return removedPessoa;
    } catch (error) {
        console.error('Error deleting pessoa:', error);
        throw error;
    }
};

const updatePessoa = async (id, pessoa) => {
    try {
        const { nome, cidade_id, bairro_id, cep, endereco, numero, complemento, telefone, email } = pessoa;

        const queryUpdate = `
            UPDATE pessoas SET
            nome = ?, cidade_id = ?, bairro_id = ?,
            cep = ?, endereco = ?, numero = ?,
            complemento = ?, telefone = ?, email = ?
            WHERE id = ?
            `;

        const [updatedPessoa] = await connection.execute(queryUpdate,
            [nome, cidade_id, bairro_id, cep, endereco, numero, complemento, telefone, email, id]
        );
        return updatedPessoa;
    } catch (error) {
        console.error('Error updating pessoa:', error);
        throw error;
    }
};

module.exports = {
    getAll,
    getPessoa,
    createPessoa,
    deletePessoa,
    updatePessoa
}

// -- Tabela: pessoas
// CREATE TABLE IF NOT EXISTS pessoas (
//   id INT(11) NOT NULL AUTO_INCREMENT,
//   nome VARCHAR(255) NOT NULL,
//   cidade_id INT(11) NOT NULL,
//   bairro_id INT(11) NOT NULL,
//   cep VARCHAR(20) NOT NULL,
//   endereco VARCHAR(255) NOT NULL,
//   numero VARCHAR(20) NOT NULL,
//   complemento VARCHAR(255) DEFAULT NULL,
//   telefone VARCHAR(20) NOT NULL,
//   email VARCHAR(255) NOT NULL,
//   PRIMARY KEY (id),
//   FOREIGN KEY (cidade_id) REFERENCES cidades (id) ON DELETE CASCADE,
//   FOREIGN KEY (bairro_id) REFERENCES bairros (id) ON DELETE CASCADE
// );