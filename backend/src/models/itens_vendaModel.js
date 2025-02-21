const connection = require('../connection');

const getAll = async () => {
    try {
        const [itensVenda] = await connection.execute('SELECT * FROM itens_venda');
        return itensVenda;
    } catch (error) {
        console.error('Error fetching itens_venda:', error);
        throw error;
    }
};

const getItensVenda = async (id) => {
    try {
        const query = 'SELECT * FROM itens_venda WHERE venda_id = ?';
        const [itensVenda] = await connection.execute(query, [id]);
        return itensVenda;  // Retorna todos os itens da venda
    } catch (error) {
        console.error('Error fetching venda:', error);
        throw error;
    }
};

const createItemVenda = async (itemVenda) => {
    try {
        const { venda_id, produto_id, quantidade, subtotal } = itemVenda;

        const queryCreate = `
            INSERT INTO itens_venda
            (venda_id, produto_id,
            quantidade, subtotal)
            VALUES (?, ?, ?, ?)
        `;

        const [createdItemVenda] = await connection.execute(queryCreate,
            [venda_id, produto_id, quantidade, subtotal]);

        return { insertId: createdItemVenda.insertId };
    } catch (error) {
        console.error('Error creating item venda:', error);
        throw error;
    }
};

const deleteItemVenda = async (id) => {
    try {
        const queryDelete = 'DELETE FROM itens_venda WHERE id = ?';
        const [removedItemVenda] = await connection.execute(queryDelete, [id]);
        return removedItemVenda;
    } catch (error) {
        console.error('Error deleting item venda:', error);
        throw error;
    }
};

const updateItemVenda = async (id, itemVenda) => {
    try {
        const { venda_id, produto_id, quantidade, subtotal } = itemVenda;

        const queryUpdate = `
            UPDATE itens_venda SET
            venda_id = ?, produto_id = ?,
            quantidade = ?, subtotal = ?
            WHERE id = ?
        `;

        const [updatedItemVenda] = await connection.execute(queryUpdate,
            [venda_id, produto_id, quantidade, subtotal, id]);

            return { insertId: updatedItemVenda.insertId };
    } catch (error) {
        console.error('Error updating item venda:', error);
        throw error;
    }
};

module.exports = {
    getAll,
    getItensVenda,
    createItemVenda,
    deleteItemVenda,
    updateItemVenda
};

// -- Tabela: itens_venda
// CREATE TABLE IF NOT EXISTS itens_venda (
//   id INT(11) NOT NULL AUTO_INCREMENT,
//   venda_id INT(11) NOT NULL,
//   produto_id INT(11) NOT NULL,
//   quantidade INT(11) NOT NULL,
//   subtotal DECIMAL(10,2) NOT NULL,
//   PRIMARY KEY (id),
//   FOREIGN KEY (venda_id) REFERENCES vendas (id) ON DELETE CASCADE,
//   FOREIGN KEY (produto_id) REFERENCES produtos (id) ON DELETE CASCADE
// );