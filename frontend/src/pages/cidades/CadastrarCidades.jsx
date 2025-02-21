import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import FormHeader from "../../components/FormHeader";
import API_URL from '../../config';

function CadastrarCidades() {
  const [nome, setNome] = useState("");
  const [uf, setUf] = useState("");
  const [id, setId] = useState("");

  const resetFilds = () => {
    setNome("");
    setUf("");
    setId("");
  };

  const navigate = useNavigate();
  const { cidadeId } = useParams();

  useEffect(() => {
    if (cidadeId) {
      fetch(`${API_URL}/cidades/${cidadeId}`)
        .then((response) => response.json())
        .then((data) => {
          setId(data.id);
          setNome(data.nome);
          setUf(data.uf);
        })
        .catch((error) => console.error("Erro ao buscar dados da cidade:", error));
    }
  }, [cidadeId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const cidade = { nome, uf };
    const method = cidadeId ? "PUT" : "POST";
    const url = cidadeId ? `${API_URL}/cidades/${cidadeId}` : `${API_URL}/cidades`;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cidade),
    })
      .then(() => navigate("/cidades/listar"))
      .catch((error) => {
        console.error("Erro ao salvar cidade:", error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="container">

        <FormHeader
          headerTitle="Cadastro de Cidades"
          buttonListLink="/cidades/listar"
          buttonAddLink="/cidades/cadastrar"
          onReset={resetFilds}
        />

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group codigo">
              <label htmlFor="id">Código:</label>
              <input type="text" id="id" className="input-field" value={id} disabled />
            </div>
            <div className="form-group">
              <label htmlFor="nome">Nome da Cidade:</label>
              <input type="text" id="nome" className="input-field" value={nome} onChange={(e) => setNome(e.target.value)} required />
            </div>
            <div className="form-group uf">
              <label htmlFor="uf">Sigla UF:</label>
              <input type="text" id="uf" className="input-field" value={uf} onChange={(e) => setUf(e.target.value)} maxLength="2" required />
            </div>
          </div>
          <div className="form-buttons">
            <button type="submit" className="button button-cadastrar">Confirmar</button>
            <button
              type="button"
              className="button button-cancelar"
              onClick={() => navigate("/cidades/listar")}
            >
              Cancelar
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default CadastrarCidades;