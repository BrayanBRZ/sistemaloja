import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import FormHeader from "../../components/FormHeader";
import API_URL from '../../config';

function ListarProdutos() {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/produtos`)
            .then((response) => response.json())
            .then((data) => setProdutos(data))
            .catch((error) => console.error("Erro ao buscar produtos:", error));
    }, []);

    const deleteProduto = (id) => {
        fetch(`${API_URL}/produtos/${id}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.ok) {
                    setProdutos(produtos.filter((produto) => produto.id !== id));
                } else {
                    alert("Erro ao excluir produto.");
                }
            })
            .catch((error) => console.error("Erro ao excluir produto:", error));
    };

    return (
        <div>
            <Navbar />
            <div className="container">

                <FormHeader
                    headerTitle="Cadastro de Produtos"
                    buttonListLink="/produtos/listar"
                    buttonAddLink="/produtos/cadastrar"
                />

                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nome Produto</th>
                            <th>Valor</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.length > 0 ? (
                            produtos.map((produto) => (
                                <tr key={produto.id}>
                                    <td>{produto.id}</td>
                                    <td>{produto.nome}</td>
                                    <td>R$ {produto.valor}</td>
                                    <td>

                                        <div className="action-buttons">
                                            <Link to={`/produtos/cadastrar/${produto.id}`}>
                                                <button className="button-editar">
                                                    <span className="material-symbols-outlined">edit</span>
                                                </button>
                                            </Link>
                                            <button
                                                className="button-excluir"
                                                onClick={() => { deleteProduto(produto.id); }}
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

export default ListarProdutos;