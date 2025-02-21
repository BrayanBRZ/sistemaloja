import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import FormHeader from "../../components/FormHeader";
import API_URL from '../../config';

function ListarVendas() {
    const [vendas, setVendas] = useState([]);
    const [pessoas, setPessoas] = useState([]);
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/vendas`)
            .then((response) => response.json())
            .then((data) => setVendas(data))
            .catch((error) => console.error("Erro ao buscar vendas:", error));

        fetch(`${API_URL}/pessoas`)
            .then((response) => response.json())
            .then((data) => setPessoas(data))
            .catch((error) => console.error("Erro ao buscar pessoas:", error));

        fetch(`${API_URL}/produtos`)
            .then((response) => response.json())
            .then((data) => setProdutos(data))
            .catch((error) => console.error("Erro ao buscar produtos:", error));
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

    const getProdutoNome = (produtoId) => {
        const produto = produtos.find((produto) => produto.id === produtoId);
        return produto ? produto.nome : "Produto não encontrado";
    };

    function emprimirVenda(vendaId) {
        // Realiza duas chamadas: uma para os dados da venda e outra para os itens da venda
        Promise.all([
            fetch(`${API_URL}/vendas/${vendaId}`).then((res) => res.json()),
            fetch(`${API_URL}/itens_venda/${vendaId}`).then((res) => res.json())
        ])
            .then(([venda, itens]) => {
                venda.itens = itens;

                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();

                // Cabeçalho: Dados da Venda
                doc.setFontSize(18);

                doc.text("Pedido de Venda", doc.internal.pageSize.getWidth() / 2, 15, { align: "center" });

                doc.setFontSize(12);
                let y = 25; // posição vertical inicial

                doc.text(`Código do Cliente: ${venda.pessoa_id}`, 10, y);
                y += 7;
                doc.text(`Nome do Cliente: ${getPessoaNome(venda.pessoa_id) || "N/A"}`, 10, y);
                y += 7;
                doc.text(`Data da Venda: ${venda.data_venda.split('-').reverse().join('-')}`, 10, y);
                y += 7;
                doc.text(`Código da Venda: ${venda.id}`, 10, y);

                // Corpo: Itens da Venda
                y += 10;
                doc.text("Itens da Venda:", 10, y);
                y += 7;
                doc.setFontSize(10);
                // Cabeçalho da tabela de itens
                doc.text("Código", 10, y);
                doc.text("Produto", 40, y);
                doc.text("Qtd", 100, y);
                doc.text("Valor Unitário", 115, y);
                doc.text("Sub. Total", 160, y);
                y += 5;

                if (venda.itens && venda.itens.length > 0) {
                    venda.itens.forEach((item) => {
                        doc.text(String(item.produto_id), 10, y);
                        doc.text(String(getProdutoNome(item.produto_id)) || "N/A", 40, y);
                        doc.text(String(item.quantidade), 100, y);
                        doc.text(`R$ ${parseFloat(item.subtotal / item.quantidade).toFixed(2)}`, 115, y);
                        doc.text(`R$ ${parseFloat(item.subtotal).toFixed(2)}`, 160, y);
                        y += 7;
                    });
                } else {
                    doc.text("Nenhum item encontrado.", 10, y);
                    y += 7;
                }

                // Rodapé
                y += 10;
                doc.text("Assinatura: __________________________", 10, y);
                doc.text(`Valor Total do Pedido: R$ ${parseFloat(venda.valor_total).toFixed(2)}`, 130, y);

                // Abre o PDF em uma nova aba para impressão
                window.open(doc.output('bloburl'), '_blank');
            })
            .catch((error) => {
                console.error("Erro ao gerar PDF:", error);
            });
    }


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
                                            <button
                                                className="button-editar"
                                                onClick={() => { emprimirVenda(venda.id); }}
                                            >
                                                <span className="material-symbols-outlined">print</span>
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