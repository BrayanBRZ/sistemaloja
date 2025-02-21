import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import FormHeader from "../../components/FormHeader";
import API_URL from '../../config';

function CadastrarProdutos() {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [id, setId] = useState("");

  const resetFilds = () => {
    setNome("");
    setValor("");
    setId("");
  };

  const navigate = useNavigate();
  const { produtoId } = useParams();

  useEffect(() => {
    if (produtoId) {
      fetch(`${API_URL}/produtos/${produtoId}`)
        .then((response) => response.json())
        .then((data) => {
          setId(data.id);
          setNome(data.nome);
          setValor(data.valor);
        })
        .catch((error) => console.error("Erro ao buscar dados do produto:", error));
    }
  }, [produtoId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const produto = { nome, valor };
    const method = produtoId ? "PUT" : "POST";
    const url = produtoId ? `${API_URL}/produtos/${produtoId}` : `${API_URL}/produtos`;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto),
    })
      .then(() => navigate("/produtos/listar"))
      .catch((error) => {
        console.error("Erro ao salvar produto:", error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="container">

        <FormHeader
          headerTitle="Cadastro de Produtos"
          buttonListLink="/produtos/listar"
          buttonAddLink="/produtos/cadastrar"
          onReset={resetFilds}
        />

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group codigo">
              <label htmlFor="id">Código:</label>
              <input type="text" id="id" className="input-field" value={id} disabled />
            </div>
            <div className="form-group">
              <label htmlFor="nome">Nome do Produto:</label>
              <input
                type="text"
                id="nome"
                className="input-field"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="valor">Valor:</label>
              <input
                type="text"
                id="valor"
                className="input-field"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-buttons">
            <button type="submit" className="button button-cadastrar">Confirmar</button>
            <button
              type="button"
              className="button button-cancelar"
              onClick={() => navigate("/produtos/listar")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CadastrarProdutos;