import { Routes, Route } from 'react-router-dom';

// Páginas
import Home from './pages/home/Home';

import ListarBairros from './pages/bairros/ListarBairros';
import CadastrarBairros from './pages/bairros/CadastrarBairros';

import ListarCidades from './pages/cidades/ListarCidades';
import CadastrarCidades from './pages/cidades/CadastrarCidades';

import ListarPessoas from './pages/pessoas/ListarPessoas';
import CadastrarPessoas from './pages/pessoas/CadastrarPessoas';
import RelatoriosPessoas from './pages/pessoas/RelatoriosPessoas';

import ListarProdutos from './pages/produtos/ListarProdutos';
import CadastrarProdutos from './pages/produtos/CadastrarProdutos';

import ListarVendas from './pages/vendas/ListarVendas';
import CadastrarVendas from './pages/vendas/CadastrarVendas';
import RelatoriosVendas from './pages/vendas/RelatoriosVendas'; {/* Em edição */}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Bairros */}
      <Route path="/bairros/listar" element={<ListarBairros />} />
      <Route path="/bairros/cadastrar" element={<CadastrarBairros />} />
      <Route path="/bairros/cadastrar/:bairroId" element={<CadastrarBairros />} />

      {/* Cidades */}
      <Route path="/cidades/listar" element={<ListarCidades />} />
      <Route path="/cidades/cadastrar" element={<CadastrarCidades />} />
      <Route path="/cidades/cadastrar/:cidadeId" element={<CadastrarCidades />} />

      {/* Pessoas */}
      <Route path="/pessoas/listar" element={<ListarPessoas />} />
      <Route path="/pessoas/cadastrar" element={<CadastrarPessoas />} />
      <Route path="/pessoas/cadastrar/:pessoaId" element={<CadastrarPessoas />} />
      <Route path="/pessoas/relatorios/" element={<RelatoriosPessoas />} />

      {/* Produtos */}
      <Route path="/produtos/listar" element={<ListarProdutos />} />
      <Route path="/produtos/cadastrar" element={<CadastrarProdutos />} />
      <Route path="/produtos/cadastrar/:produtoId" element={<CadastrarProdutos />} />

      {/* Vendas */}
      <Route path="/vendas/listar" element={<ListarVendas />} />
      <Route path="/vendas/cadastrar" element={<CadastrarVendas />} />
      <Route path="/vendas/cadastrar/:vendaId" element={<CadastrarVendas />} />
      <Route path="/vendas/relatorios/" element={<RelatoriosVendas />} /> {/* Em edição */}
    </Routes>
  );
}

export default AppRoutes;