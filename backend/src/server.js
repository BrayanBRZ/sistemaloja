const express = require('express');
const cors = require('cors');
const router = require('./router');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router); // Todas as rotas estarão no prefixo /api

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));