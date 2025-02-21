const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('MySQL Connected Successfully!');
        connection.release();
    } catch (error) {
        console.error('MySQL Connection Error:', error);
        setTimeout(testConnection, 5000); // Tenta reconectar a cada 5s
    }
};

testConnection();

module.exports = pool;