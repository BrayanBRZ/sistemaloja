import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import FormHeader from "../../components/FormHeader";
import API_URL from '../../config';

function ListarBairros() {
    const [bairros, setBairros] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/bairros`)
            .then((response) => response.json())
            .then((data) => setBairros(data))
            .catch((error) => console.error("Erro ao buscar bairros:", error));
    }, []);

    const deleteBairro = (id) => {
        fetch(`${API_URL}/bairros/${id}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.ok) {
                    setBairros(bairros.filter((bairro) => bairro.id !== id));
                } else {
                    alert("Erro ao excluir bairro.");
                }
            })
            .catch((error) => console.error("Erro ao excluir bairro:", error));
    };

    return (
        <div>
            <Navbar />
            <div className="container">

                <FormHeader
                    headerTitle="Cadastro de Bairros"
                    buttonListLink="/bairros/listar"
                    buttonAddLink="/bairros/cadastrar"
                />

                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Bairro</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bairros.length > 0 ? (
                            bairros.map((bairro) => (
                                <tr key={bairro.id}>
                                    <td>{bairro.id}</td>
                                    <td>{bairro.nome}</td>
                                    <td>

                                        <div className="action-buttons">
                                            <Link to={`/bairros/cadastrar/${bairro.id}`}>
                                                <button className="button-editar">
                                                    <span className="material-symbols-outlined">edit</span>
                                                </button>
                                            </Link>
                                            <button
                                                className="button-excluir"
                                                onClick={() => { deleteBairro(bairro.id); }}
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
                                    colSpan="3"
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

export default ListarBairros;