import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import FormHeader from "../../components/FormHeader";
import API_URL from '../../config';

function ListarCidades() {
    const [cidades, setCidades] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/cidades`)
            .then((response) => response.json())
            .then((data) => setCidades(data))
            .catch((error) => console.error("Erro ao buscar cidades:", error));
    }, []);

    const deleteCidade = (id) => {
        fetch(`${API_URL}/cidades/${id}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.ok) {
                    setCidades(cidades.filter((cidade) => cidade.id !== id));
                } else {
                    alert("Erro ao excluir cidade.");
                }
            })
            .catch((error) => console.error("Erro ao excluir cidade:", error));
    };

    return (
        <div>
            <Navbar />
            <div className="container">

                <FormHeader
                    headerTitle="Cadastro de Cidades"
                    buttonListLink="/cidades/listar"
                    buttonAddLink="/cidades/cadastrar"
                />

                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Cidade</th>
                            <th>Sigla UF</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cidades.length > 0 ? (

                            cidades.map((cidade) => (
                                <tr key={cidade.id}>
                                    <td>{cidade.id}</td>
                                    <td>{cidade.nome}</td>
                                    <td>{cidade.uf}</td>
                                    <td>

                                        <div className="action-buttons">
                                            <Link to={`/cidades/cadastrar/${cidade.id}`}>
                                                <button className="button-editar">
                                                    <span className="material-symbols-outlined">edit</span>
                                                </button>
                                            </Link>
                                            <button
                                                className="button-excluir"
                                                onClick={() => { deleteCidade(cidade.id); }}
                                            >
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        </div>

                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="4"
                                    style={{
                                        textAlign: "center",
                                        padding: "10px",
                                        fontStyle: "italic",
                                    }}
                                >
                                    Nenhum registro encontrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListarCidades;