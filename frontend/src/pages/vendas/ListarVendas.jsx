import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import FormHeader from "../../components/FormHeader";
import API_URL from '../../config';

function ListarVendas() {
    const [vendas, setVendas] = useState([]);
    const [pessoas, setPessoas] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/vendas`)
            .then((response) => response.json())
            .then((data) => setVendas(data))
            .catch((error) => console.error("Erro ao buscar vendas:", error));

        fetch(`${API_URL}/pessoas`)
            .then((response) => response.json())
            .then((data) => setPessoas(data))
            .catch((error) => console.error("Erro ao buscar pessoas:", error));
    }, []);

    const deleteVenda = (id) => {
        fetch(`${API_URL}/vendas/${id}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.ok) {
                    setVendas(vendas.filter((venda) => venda.id !== id));
                } else {
                    alert("Erro ao excluir venda.");
                }
            })
            .catch((error) => console.error("Erro ao excluir venda:", error));
    };

    const getPessoaNome = (pessoaId) => {
        const pessoa = pessoas.find((pessoa) => pessoa.id === pessoaId);
        return pessoa ? pessoa.nome : "Pessoa não encontrada";
    };

    return (
        <div>
            <Navbar />
            <div className="container">

                <FormHeader
                    headerTitle="Lista de Vendas"
                    buttonListLink="/vendas/listar"
                    buttonAddLink="/vendas/cadastrar"
                />

                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Pessoa</th>
                            <th>Total da Venda</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendas.length > 0 ? (
                            vendas.map((venda) => (
                                <tr key={venda.id}>
                                    <td>{venda.id}</td>
                                    <td>{getPessoaNome(venda.pessoa_id)}</td>
                                    <td>R$ {venda.valor_total}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <Link to={`/vendas/cadastrar/${venda.id}`}>
                                                <button className="button-editar">
                                                    <span className="material-symbols-outlined">edit</span>
                                                </button>
                                            </Link>
                                            <button
                                                className="button-excluir"
                                                onClick={() => { deleteVenda(venda.id); }}
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

export default ListarVendas;