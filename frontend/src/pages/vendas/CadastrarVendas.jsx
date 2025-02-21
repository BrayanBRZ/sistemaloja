import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import FormHeader from "../../components/FormHeader";
import API_URL from '../../config';

function CadastraVendas() {
    const [codigo, setCodigo] = useState('');
    const [pessoaId, setPessoaId] = useState('');
    const [dataVenda, setDataVenda] = useState('');
    const [produtoId, setProdutoId] = useState('');
    const [quantidade, setQuantidade] = useState(1);
    const [valorUnitario, setValorUnitario] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [valorTotal, setValorTotal] = useState(0);
    const [produtosAdicionados, setProdutosAdicionados] = useState([]);

    // Estado para armazenar itens a serem excluídos
    const [itensExcluidos, setItensExcluidos] = useState([]);

    const [pessoas, setPessoas] = useState([]);
    const [produtos, setProdutos] = useState([]);

    const navigate = useNavigate();
    const { vendaId } = useParams();

    useEffect(() => {
        fetch(`${API_URL}/pessoas`)
            .then((response) => response.json())
            .then((data) => setPessoas(data))
            .catch((error) => console.error("Erro ao buscar pessoas:", error));

        fetch(`${API_URL}/produtos`)
            .then((response) => response.json())
            .then((data) => {
                setProdutos(data); // Atualiza a lista de produtos

                // Se houver vendaId, carrega os dados da venda e dos itens
                if (vendaId) {
                    fetch(`${API_URL}/vendas/${vendaId}`)
                        .then((response) => response.json())
                        .then((data) => {
                            setCodigo(data.id);
                            setPessoaId(data.pessoa_id);
                            setDataVenda(data.data_venda);
                        })
                        .catch((error) => console.error("Erro ao buscar dados da venda:", error));

                    fetch(`${API_URL}/itens_venda/${vendaId}`)
                        .then((response) => response.json())
                        .then(async (data) => {
                            const itens = await Promise.all(
                                data.map(async (item) => {
                                    try {
                                        const response = await fetch(`${API_URL}/produtos/${item.produto_id}`);
                                        if (!response.ok) throw new Error("Produto não encontrado");

                                        const produto = await response.json();
                                        return {
                                            ...item,
                                            produtoId: item.produto_id,
                                            nome: produto.nome,
                                            valorUnitario: parseFloat((item.subtotal / item.quantidade).toFixed(2)),
                                            subtotal: parseFloat(item.subtotal),
                                            isEditing: false
                                        };
                                    } catch (error) {
                                        console.error(`Erro ao buscar produto ${item.produto_id}:`, error);
                                        return {
                                            ...item,
                                            produtoId: item.produto_id,
                                            nome: "Produto não encontrado",
                                            valorUnitario: parseFloat((item.subtotal / item.quantidade).toFixed(2)),
                                            subtotal: parseFloat(item.subtotal),
                                            isEditing: false
                                        };
                                    }
                                })
                            );
                            setProdutosAdicionados(itens);
                        })
                        .catch((error) => console.error("Erro ao buscar itens da venda:", error));
                }
            })
            .catch((error) => console.error("Erro ao buscar produtos:", error));
    }, [vendaId]);

    useEffect(() => {
        setSubtotal(quantidade * valorUnitario);
    }, [quantidade, valorUnitario]);

    useEffect(() => {
        const total = produtosAdicionados.reduce((acc, item) => acc + parseFloat(item.subtotal), 0);
        setValorTotal(total.toFixed(2)); // Para exibição
    }, [produtosAdicionados]);

    // Função para adicionar produto à lista
    const adicionarProduto = () => {
        if (produtoId && quantidade > 0 && valorUnitario >= 0) {
            const produtoSelecionado = produtos.find(p => p.id === parseInt(produtoId));
            if (produtoSelecionado) {
                const novoItem = {
                    produtoId: parseInt(produtoId),
                    nome: produtoSelecionado.nome,
                    quantidade,
                    valorUnitario,
                    subtotal,
                    isEditing: false
                };
                setProdutosAdicionados([...produtosAdicionados, novoItem]);
                setProdutoId('');
                setQuantidade(1);
                setValorUnitario(0);
                setSubtotal(0);
            }
        }
    };

    const updateItemField = (index, field, value) => {
        if (value < 0) {
            alert(`${field === "quantidade" ? "Quantidade" : "Valor unitário"} não pode ser negativo.`);
            return;
        }
        setProdutosAdicionados(prev => {
            const updated = [...prev];
            const item = { ...updated[index], [field]: value };
            const qtde = parseFloat(item.quantidade) || 0;
            const unit = parseFloat(item.valorUnitario) || 0;
            item.subtotal = parseFloat((qtde * unit).toFixed(2));
            updated[index] = item;
            return updated;
        });
    };

    // Alterna o modo de edição do item
    const toggleEditItem = (index) => {
        setProdutosAdicionados(prev =>
            prev.map((item, idx) =>
                idx === index ? { ...item, isEditing: !item.isEditing } : item
            )
        );
    };

    // Se o item possui ID, ele é removido da lista visível e armazenado em itensExcluidos.
    const deleteItem = (index) => {
        const item = produtosAdicionados[index];
        if (item.id) {
            setItensExcluidos(prev => [...prev, item]);
        }
        setProdutosAdicionados(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (produtosAdicionados.length === 0) {
            alert("Não é possível cadastrar uma venda sem itens. Adicione ao menos um item.");
            return;
        }

        const venda = {
            data_venda: dataVenda,
            pessoa_id: pessoaId,
            valor_total: valorTotal,
        };
        const method = vendaId ? "PUT" : "POST";
        const url = vendaId ? `${API_URL}/vendas/${vendaId}` : `${API_URL}/vendas`;

        fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(venda)
        })
            .then((response) => {
                if (!response.ok) throw new Error('Erro ao salvar venda');
                return response.json();
            })
            .then(() => {
                return fetch(`${API_URL}/vendas/lastId`) //retorna apenas um valor inteiro
            })
            .then((response) => response.text())
            .then((data) => {
                const newVendaId = parseInt(data, 10);
                const itensToSend = produtosAdicionados.map(item => {
                    // Se o item já possui id, ele precisa ser atualizado
                    if (item.id) {
                        return {
                            id: item.id,
                            venda_id: vendaId,
                            produto_id: item.produtoId,
                            quantidade: item.quantidade,
                            subtotal: parseFloat(item.subtotal)
                        };
                    } else {
                        // Caso contrário, é um novo item e precisa ser inserido
                        return {
                            venda_id: newVendaId,
                            produto_id: item.produtoId,
                            quantidade: item.quantidade,
                            subtotal: parseFloat(item.subtotal)
                        };
                    }
                });
                return itensToSend;
            })
            .then((itensToSend) => {
                // Envia os itens novos/atualizados
                const promises = itensToSend.map(item => {
                    const method = item.id ? 'PUT' : 'POST';
                    const url = item.id ? `${API_URL}/itens_venda/${item.id}` : `${API_URL}/itens_venda`;
                    return fetch(url, {
                        method,
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(item)
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`Erro ao salvar item ${item.produto_id}`);
                            }
                            return response.text();
                        })
                        .then(text => {
                            const data = text ? JSON.parse(text) : {};
                            return data;
                        });
                });
                return Promise.all(promises);
            })
            .then(() => {
                // Exclui os itens que foram removidos e estão armazenados em itensExcluidos
                if (itensExcluidos.length > 0) {
                    const deletePromises = itensExcluidos.map(item => {
                        return fetch(`${API_URL}/itens_venda/${item.id}`, {
                            method: 'DELETE',
                        }).then(response => {
                            if (!response.ok) {
                                throw new Error(`Erro ao excluir o item ${item.id}`);
                            }
                        });
                    });
                    return Promise.all(deletePromises);
                }
            })
            .then(() => navigate("/vendas/listar"))
            .catch((error) => {
                console.error("Erro ao salvar vendas e itens:", error);
                navigate("/vendas/listar");
            });
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                <FormHeader
                    headerTitle="Cadastro de Vendas"
                    buttonListLink="/vendas/listar"
                    buttonAddLink="/vendas/cadastrar"
                />
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group codigo">
                            <label>Código:</label>
                            <input type="text" value={codigo} disabled className="input-field" />
                        </div>
                        <div className="form-group">
                            <label>Pessoa:</label>
                            <select
                                value={pessoaId}
                                onChange={(e) => setPessoaId(e.target.value)}
                                required
                                className="input-field"
                            >
                                <option value="">Selecione</option>
                                {pessoas.map(p => (
                                    <option key={p.id} value={p.id}>{p.nome}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Data Venda:</label>
                            <input
                                type="date"
                                value={dataVenda}
                                onChange={(e) => setDataVenda(e.target.value)}
                                required
                                className="input-field"
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Produto:</label>
                            <select
                                value={produtoId}
                                onChange={(e) => {
                                    setProdutoId(e.target.value);
                                    const produtoSelecionado = produtos.find(p => p.id === parseInt(e.target.value));
                                    if (produtoSelecionado) setValorUnitario(produtoSelecionado.valor);
                                }}
                                className="input-field"
                            >
                                <option value="">Selecione</option>
                                {produtos.map(p => (
                                    <option key={p.id} value={p.id}>{p.nome}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Qtde Venda:</label>
                            <input
                                type="number"
                                value={quantidade}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    if (value < 0) {
                                        alert("Quantidade não pode ser negativa!");
                                        return;
                                    }
                                    setQuantidade(value);
                                }}
                                min="1"
                                required
                                className="input-field"
                            />
                        </div>
                        <div className="form-group">
                            <label>Vr. Unitário:</label>
                            <input
                                type="number"
                                value={valorUnitario}
                                onChange={(e) => {
                                    const value = parseFloat(e.target.value);
                                    if (value < 0) {
                                        alert("Valor unitário não pode ser negativo!");
                                        return;
                                    }
                                    setValorUnitario(value);
                                }}
                                min="0"
                                className="input-field"
                            />
                        </div>
                        <div className="form-group">
                            <label>Sub. Total:</label>
                            <input type="text" value={subtotal.toFixed(2)} disabled className="input-field" />
                        </div>
                        <button
                            type="button"
                            onClick={adicionarProduto}
                            className="button button-cadastrar"
                            style={{ maxWidth: "15%", marginTop: "2%" }}
                        >
                            <span className="material-symbols-outlined">add_shopping_cart</span>
                            Adicionar
                        </button>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Produto</th>
                                <th>Qtde</th>
                                <th>Vr. Unitário</th>
                                <th>Sub. Total</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtosAdicionados.length > 0 ? (
                                produtosAdicionados.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.id || "-"}</td>
                                        <td>{item.nome}</td>
                                        <td>{item.isEditing ? (
                                            <input
                                                type="number"
                                                className="input-field"
                                                style={{ maxHeight: "25px" }}
                                                value={item.quantidade}
                                                onChange={(e) =>
                                                    updateItemField(index, "quantidade", parseInt(e.target.value))
                                                }
                                                min="1"
                                            />
                                        ) : (
                                            item.quantidade
                                        )}
                                        </td>
                                        <td>{item.isEditing ? (
                                            <input
                                                type="number"
                                                className="input-field"
                                                style={{ maxHeight: "25px" }}
                                                value={item.valorUnitario}
                                                onChange={(e) =>
                                                    updateItemField(index, "valorUnitario", parseFloat(e.target.value))
                                                }
                                                step="0.01"
                                                min="0"
                                            />
                                        ) : (
                                            item.valorUnitario
                                        )}
                                        </td>
                                        <td> {item.subtotal.toFixed(2)}</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button
                                                    type="button"
                                                    className="button-editar"
                                                    onClick={() => toggleEditItem(index)}
                                                >
                                                    <span className="material-symbols-outlined">
                                                        {item.isEditing ? "save" : "edit"}
                                                    </span>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="button-excluir"
                                                    onClick={() => deleteItem(index)}
                                                >
                                                    <span className="material-symbols-outlined">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: "center", padding: "10px", fontStyle: "italic" }}>
                                        Nenhum produto adicionado
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <div className="form-row">
                        <div className="form-buttons">
                            <button type="submit" className="button button-cadastrar">Confirmar</button>
                            <button
                                type="button"
                                onClick={() => navigate("/vendas/listar")}
                                className="button button-cancelar"
                            >
                                Cancelar
                            </button>
                        </div>
                        <div className="form-group codigo" style={{ flex: 1, textAlign: 'right' }}>
                            <label>Total da Venda:</label>
                            <input type="text" value={" " + valorTotal} disabled className="input-field" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CadastraVendas;