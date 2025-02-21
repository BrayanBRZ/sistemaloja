const connection = require('../connection');

const getAll = async () => {
    try {
        const [vendas] = await connection.execute('SELECT * FROM vendas');

        vendas.forEach(venda => {
            venda.data_venda = venda.data_venda.toISOString().split('T')[0]; // Retira o horário
        });

        return vendas;
    } catch (error) {
        console.error('Error fetching vendas:', error);
        throw error;
    }
};

const getLastVendaId = async () => {
    try {
        const query = 'SELECT COALESCE(MAX(id), 0) AS lastId FROM vendas';
        const [result] = await connection.execute(query);
        return result[0].lastId;
    } catch (error) {
        console.error('Error fetching next ID:', error);
        throw error;
    }
};

const getVenda = async (id) => {
    try {
        const query = 'SELECT * FROM vendas WHERE id = ?';
        const [venda] = await connection.execute(query, [id]);

        venda.forEach(venda => {
            venda.data_venda = venda.data_venda.toISOString().split('T')[0];
        });

        return venda[0];
    } catch (error) {
        console.error('Error fetching venda:', error);
        throw error;
    }
};

const createVenda = async (venda) => {
    try {
        const { data_venda, pessoa_id, valor_total } = venda;
        const queryCreate = 'INSERT INTO vendas(data_venda, pessoa_id, valor_total) VALUES (?, ?, ?)';
        const [createdVenda] = await connection.execute(queryCreate, [data_venda, pessoa_id, valor_total]);
        return { insertId: createdVenda.insertId };
    } catch (error) {
        console.error('Error creating venda:', error);
        throw error;
    }
};

const deleteVenda = async (id) => {
    try {
        const queryDelete = 'DELETE FROM vendas WHERE id = ?';
        const [removedVenda] = await connection.execute(queryDelete, [id]);
        return removedVenda;
    } catch (error) {
        console.error('Error deleting venda:', error);
        throw error;
    }
};

const updateVenda = async (id, venda) => {
    try {
        const { data_venda, pessoa_id, valor_total } = venda;
        const queryUpdate = 'UPDATE vendas SET data_venda = ?, pessoa_id = ?, valor_total = ? WHERE id = ?';
        await connection.execute(queryUpdate, [data_venda, pessoa_id, valor_total, id]);

        // Retorna o ID da venda que foi atualizada
        return { id };
    } catch (error) {
        console.error('Error updating venda:', error);
        throw error;
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

// -- Tabela: vendas
// CREATE TABLE IF NOT EXISTS vendas (
//   id INT(11) NOT NULL AUTO_INCREMENT,
//   data_venda DATE NOT NULL,
//   pessoa_id INT(11) NOT NULL,
//   valor_total DECIMAL(10,2) NOT NULL,
//   PRIMARY KEY (id),
//   FOREIGN KEY (pessoa_id) REFERENCES pessoas (id) ON DELETE CASCADE
// );