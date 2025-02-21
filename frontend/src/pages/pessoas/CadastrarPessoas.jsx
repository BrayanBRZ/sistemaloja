import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import FormHeader from "../../components/FormHeader";
import API_URL from '../../config';
import "../pessoas/pessoas.css";

function CadastraPessoas() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [cidadeId, setCidadeId] = useState('');
  const [bairroId, setBairroId] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [id, setId] = useState('');

  const resetFilds = () => {
    setNome("");
    setTelefone("");
    setEmail("");
    setCidadeId("");
    setBairroId("");
    setCep("");
    setEndereco("");
    setNumero("");
    setComplemento("");
    setId("");
  };

  const [cidades, setCidades] = useState([]);
  const [bairros, setBairros] = useState([]);

  const navigate = useNavigate();
  const { pessoaId } = useParams();

  useEffect(() => {
    fetch(`${API_URL}/cidades`)
      .then((response) => response.json())
      .then((data) => setCidades(data))
      .catch((error) => console.error("Erro ao buscar cidades:", error));

    fetch(`${API_URL}/bairros`)
      .then((response) => response.json())
      .then((data) => setBairros(data))
      .catch((error) => console.error("Erro ao buscar bairros:", error));

    if (pessoaId) {
      fetch(`${API_URL}/pessoas/${pessoaId}`)
        .then((response) => response.json())
        .then((data) => {
          setId(data.id);
          setNome(data.nome);
          setTelefone(data.telefone);
          setEmail(data.email);
          setCidadeId(data.cidade_id);
          setBairroId(data.bairro_id);
          setCep(data.cep);
          setEndereco(data.endereco);
          setNumero(data.numero);
          setComplemento(data.complemento);
        })
        .catch((error) => console.error("Erro ao buscar dados da pessoa:", error));
    }
  }, [pessoaId]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const pessoa = {
      nome,
      telefone,
      email,
      cidade_id: cidadeId,
      bairro_id: bairroId,
      cep,
      endereco,
      numero,
      complemento
    };

    const method = pessoaId ? "PUT" : "POST";
    const url = pessoaId ? `${API_URL}/pessoas/${pessoaId}` : `${API_URL}/pessoas`;

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pessoa)
    })
      .then((data) => {
        console.log("Pessoa salva com sucesso:", data);
        navigate("/pessoas/listar");
      })
      .catch((error) => {
        console.error("Erro ao salvar pessoa:", error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="container">

        <FormHeader
          headerTitle="Cadastro de Pessoas"
          buttonListLink="/pessoas/listar"
          buttonAddLink="/pessoas/cadastrar"
          onReset={resetFilds}
        />

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group codigo">
              <label htmlFor="id">Código:</label>
              <input
                type="text"
                id="id"
                name="id"
                className="input-field"
                value={id}
                disabled
              />
            </div>

            <div className="form-group">
              <label htmlFor="nome">Nome:</label>
              <input
                type="text"
                id="nome"
                name="nome"
                className="input-field"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
          </div>


          <div className="form-row">
            <div className="form-group cidade">
              <label htmlFor="cidade_id">Cidade:</label>
              <select
                id="cidade_id"
                name="cidade_id"
                className="input-field"
                value={cidadeId}
                onChange={(e) => setCidadeId(e.target.value)}
                required
              >
                <option value="">Selecione a Cidade</option>
                {cidades.map((cidade) => (
                  <option key={cidade.id} value={cidade.id}>
                    {cidade.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group bairro">
              <label htmlFor="bairro_id">Bairro:</label>
              <select
                id="bairro_id"
                name="bairro_id"
                className="input-field"
                value={bairroId}
                onChange={(e) => setBairroId(e.target.value)}
                required
              >
                <option value="">Selecione o Bairro</option>
                {bairros.map((bairro) => (
                  <option key={bairro.id} value={bairro.id}>
                    {bairro.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="cep">CEP:</label>
              <input
                type="text"
                id="cep"
                name="cep"
                className="input-field"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group endereco">
              <label htmlFor="endereco">Endereço:</label>
              <input
                type="text"
                id="endereco"
                name="endereco"
                className="input-field"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                required
              />
            </div>

            <div className="form-group numero">
              <label htmlFor="numero">Número:</label>
              <input
                type="number"
                id="numero"
                name="numero"
                className="input-field"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="complemento">Complemento:</label>
              <input
                type="text"
                id="complemento"
                name="complemento"
                className="input-field"
                value={complemento}
                onChange={(e) => setComplemento(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group telefone">
              <label htmlFor="telefone">Telefone:</label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                className="input-field"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">E-mail:</label>
              <input
                type="email"
                id="email"
                name="email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-buttons">
            <button type="submit" className="button button-cadastrar">Confirmar</button>
            <button
              type="button"
              className="button button-cancelar"
              onClick={() => navigate("/pessoas/listar")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CadastraPessoas;