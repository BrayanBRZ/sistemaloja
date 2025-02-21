import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import FormHeader from "../../components/FormHeader";
import API_URL from '../../config';

function ListarPessoas() {
    const [pessoas, setPessoas] = useState([]);
    const [cidades, setCidades] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/cidades`)
            .then((response) => response.json())
            .then((data) => setCidades(data))
            .catch((error) => console.error("Erro ao buscar cidades:", error));

        fetch(`${API_URL}/pessoas`)
            .then((response) => response.json())
            .then((data) => { setPessoas(data); })
            .catch((error) => console.error("Erro ao buscar dados:", error));
    }, []);

    const deletePessoa = (id) => {
        fetch(`${API_URL}/pessoas/${id}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.ok) {
                    setPessoas(pessoas.filter((pessoa) => pessoa.id !== id));
                } else {
                    alert("Erro ao excluir pessoa.");
                }
            })
            .catch((error) => console.error("Erro ao excluir pessoa:", error));
    };

    const getCidadeNome = (cidadeId) => {
        const cidade = cidades.find((cidade) => cidade.id === cidadeId);
        return cidade ? cidade.nome : "Cidade não encontrada";
    };

    return (
        <div>
            <Navbar />
            <div className="container">

                <FormHeader
                    headerTitle="Cadastro de Pessoas"
                    buttonListLink="/pessoas/listar"
                    buttonAddLink="/pessoas/cadastrar"
                />

                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Cidade</th>
                            <th>Telefone</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pessoas.length > 0 ? (
                            pessoas.map((pessoa) => (
                                <tr key={pessoa.id}>
                                    <td>{pessoa.id}</td>
                                    <td>{pessoa.nome}</td>
                                    <td>{getCidadeNome(pessoa.cidade_id)}</td>
                                    <td>{pessoa.telefone}</td>
                                    <td>

                                        <div className="action-buttons">
                                            <Link to={`/pessoas/cadastrar/${pessoa.id}`}>
                                                <button className="button-editar">
                                                    <span className="material-symbols-outlined">edit</span>
                                                </button>
                                            </Link>
                                            <button
                                                className="button-excluir"
                                                onClick={() => { deletePessoa(pessoa.id); }}
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
                                    colSpan="5"
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

export default ListarPessoas;