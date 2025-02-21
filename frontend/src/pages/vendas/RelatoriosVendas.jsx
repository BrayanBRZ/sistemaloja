import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../../config";
import Navbar from "../../components/Navbar";
import FormHeader from "../../components/FormHeader";

function RelatorioVendas() {
    // Estados para armazenar os dados da API
    const [pessoas, setPessoas] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [vendas, setVendas] = useState([]);
    const [itensVenda, setItensVenda] = useState([]);

    // Estados dos filtros
    const [filterByPeriod, setFilterByPeriod] = useState(false);
    const [filterByPerson, setFilterByPerson] = useState(false);
    const [filterByProduct, setFilterByProduct] = useState(false);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [filterPerson, setFilterPerson] = useState("");
    const [filterProduct, setFilterProduct] = useState("");

    const navigate = useNavigate();

    // Busca os dados assim que o componente for montado
    useEffect(() => {
        fetch(`${API_URL}/pessoas`)
            .then((response) => response.json())
            .then((data) => setPessoas(data))
            .catch((error) => console.error("Erro ao buscar pessoas:", error));

        fetch(`${API_URL}/produtos`)
            .then((response) => response.json())
            .then((data) => setProdutos(data))
            .catch((error) => console.error("Erro ao buscar produtos:", error));

        fetch(`${API_URL}/vendas`)
            .then((response) => response.json())
            .then((data) => setVendas(data))
            .catch((error) => console.error("Erro ao buscar vendas:", error));

        fetch(`${API_URL}/itens_venda`)
            .then((response) => response.json())
            .then((data) => setItensVenda(data))
            .catch((error) => console.error("Erro ao buscar itens_venda:", error));
    }, []);

    // Função para alternar (ativar/desabilitar) todos os filtros de uma vez
    const toggleFilters = () => {
        if (filterByPeriod && filterByPerson && filterByProduct) {
            setFilterByPeriod(false);
            setFilterByPerson(false);
            setFilterByProduct(false);
        } else {
            setFilterByPeriod(true);
            setFilterByPerson(true);
            setFilterByProduct(true);
        }
    };

    // Lista filtrada de vendas, conforme os filtros ativados e seus valores
    const filteredVendas = vendas.filter((v) => {
        let match = true;
        // Filtro por período usando "data_venda"
        if (filterByPeriod) {
            if (startDate && endDate) {
                match = match && (v.data_venda >= startDate && v.data_venda <= endDate);
            } else if (startDate) {
                match = match && (v.data_venda >= startDate);
            } else if (endDate) {
                match = match && (v.data_venda <= endDate);
            }
        }
        // Filtro por pessoa
        if (filterByPerson && filterPerson !== "") {
            match = match && v.pessoa_id === parseInt(filterPerson);
        }
        // Filtro por produto: verifica se a venda possui algum item com o produto selecionado
        if (filterByProduct && filterProduct !== "") {
            const saleItems = itensVenda.filter((item) => item.venda_id === v.id);
            match = match && saleItems.some(
                (item) => item.produto_id === parseInt(filterProduct)
            );
        }
        return match;
    });

    // Verifica se todos os filtros estão ativos
    const allFiltersActive = filterByPeriod && filterByPerson && filterByProduct;

    return (
        <div>
            <Navbar />
            <div className="container">
                <FormHeader headerTitle="Relatório de Vendas" />

                <div
                    style={{
                        display: "flex",
                        marginBottom: "20px",
                        justifyContent: "space-between",
                    }}
                >
                    <div className="filter-container">
                        <div className="checkbox-group">
                            <div>
                                <input
                                    type="checkbox"
                                    checked={filterByPeriod}
                                    onChange={(e) => setFilterByPeriod(e.target.checked)}
                                />
                                <label>Período de Venda</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    checked={filterByPerson}
                                    onChange={(e) => setFilterByPerson(e.target.checked)}
                                />
                                <label>Pessoa</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    checked={filterByProduct}
                                    onChange={(e) => setFilterByProduct(e.target.checked)}
                                />
                                <label>Produto</label>
                            </div>
                        </div>

                        <div className="input-group">
                            <div style={{ display: "flex", gap: "10px"}}>
                                <input
                                    type="date"
                                    style={{ padding: "5px", fontSize: "13px", width: "200%" }}
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    disabled={!filterByPeriod}
                                    placeholder="Data inicial"
                                />
                                <label htmlFor=""> à </label>
                                <input
                                    type="date"
                                    style={{ padding: "5px", fontSize: "13px", width: "200%" }}
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    disabled={!filterByPeriod}
                                    placeholder="Data final"
                                />
                            </div>

                            <select
                                value={filterPerson}
                                style={{ padding: "5px", fontSize: "13px" }}
                                onChange={(e) => setFilterPerson(e.target.value)}
                                disabled={!filterByPerson}
                            >
                                <option value="">Selecione uma pessoa</option>
                                {pessoas.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.nome}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={filterProduct}
                                style={{ padding: "5px", fontSize: "13px" }}
                                onChange={(e) => setFilterProduct(e.target.value)}
                                disabled={!filterByProduct}
                            >
                                <option value="">Selecione um produto</option>
                                {produtos.map((prod) => (
                                    <option key={prod.id} value={prod.id}>
                                        {prod.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "10px",
                        }}
                    >
                        <button onClick={toggleFilters} className="filter-button">
                            {allFiltersActive ? (
                                <span
                                    className="material-symbols-outlined"
                                    style={{ fontSize: "28px" }}
                                >
                                    filter_alt_off
                                </span>
                            ) : (
                                <span
                                    className="material-symbols-outlined"
                                    style={{ fontSize: "28px" }}
                                >
                                    filter_alt
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Tabela com os registros filtrados */}
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th colSpan="3" style={{ textAlign: "center", fontSize: "1.2em" }}>
                                Empresa Fictícia
                            </th>
                        </tr>
                        <tr>
                            <th>Código</th>
                            <th>Pessoa</th>
                            <th>Total da Venda</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVendas.length > 0 ? (
                            filteredVendas.map((venda) => {
                                const pessoaNome =
                                    pessoas.find((p) => p.id === venda.pessoa_id)?.nome || "";
                                return (
                                    <tr key={venda.id}>
                                        <td>{venda.id}</td>
                                        <td>{pessoaNome}</td>
                                        <td>R$ {Number(venda.valor_total || 0).toFixed(2)}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="3" style={{ textAlign: "center" }}>
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

export default RelatorioVendas;