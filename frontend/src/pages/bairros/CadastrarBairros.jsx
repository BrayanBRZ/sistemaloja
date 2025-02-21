import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import FormHeader from "../../components/FormHeader";
import API_URL from '../../config';

function CadastrarBairros() {
    const [nome, setNome] = useState("");
    const [id, setId] = useState("");

    const resetFilds = () => {
        setNome("");
        setId("");
    };

    const navigate = useNavigate();
    const { bairroId } = useParams();

    useEffect(() => {
        if (bairroId) {
            fetch(`${API_URL}/bairros/${bairroId}`)
                .then((response) => response.json())
                .then((data) => {
                    setId(data.id);
                    setNome(data.nome);
                })
                .catch((error) => console.error("Erro ao buscar dados do bairro:", error));
        }
    }, [bairroId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const bairro = { nome };
        const method = bairroId ? "PUT" : "POST";
        const url = bairroId ? `${API_URL}/bairros/${bairroId}` : `${API_URL}/bairros`;

        fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bairro),
        })
            .then(() => navigate("/bairros/listar"))
            .catch((error) => {
                console.error("Erro ao salvar bairro:", error);
            });
    };

    return (
        <div>
            <Navbar />
            <div className="container">

                <FormHeader
                    headerTitle="Cadastro de Bairros"
                    buttonListLink="/bairros/listar"
                    buttonAddLink="/bairros/cadastrar"
                    onReset={resetFilds}
                />

                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group codigo" >
                            <label htmlFor="id">Código:</label>
                            <input type="text" id="id" className="input-field" value={id} disabled />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nome">Bairro:</label>
                            <input type="text" id="nome" className="input-field" value={nome} onChange={(e) => setNome(e.target.value)} required />
                        </div>
                    </div>
                    <div className="form-buttons">
                        <button type="submit" className="button button-cadastrar">Confirmar</button>
                        <button
                            type="button"
                            className="button button-cancelar"
                            onClick={() => navigate("/bairros/listar")}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CadastrarBairros;