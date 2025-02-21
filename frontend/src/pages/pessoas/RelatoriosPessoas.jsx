import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../../config";
import Navbar from "../../components/Navbar";
import FormHeader from "../../components/FormHeader";

function RelatoriosPessoas() {
    // Estados para armazenar os dados da API
    const [pessoas, setPessoas] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [bairros, setBairros] = useState([]);

    // Estados dos filtros
    const [filterByName, setFilterByName] = useState(false);
    const [filterByCity, setFilterByCity] = useState(false);
    const [filterByNeighborhood, setFilterByNeighborhood] = useState(false);

    const [filterName, setFilterName] = useState("");
    const [filterCity, setFilterCity] = useState("");
    const [filterNeighborhood, setFilterNeighborhood] = useState("");

    const navigate = useNavigate();

    // Busca os dados assim que o componente for montado
    useEffect(() => {
        fetch(`${API_URL}/pessoas`)
            .then((response) => response.json())
            .then((data) => setPessoas(data))
            .catch((error) => console.error("Erro ao buscar pessoas:", error));

        fetch(`${API_URL}/cidades`)
            .then((response) => response.json())
            .then((data) => setCidades(data))
            .catch((error) => console.error("Erro ao buscar cidades:", error));

        fetch(`${API_URL}/bairros`)
            .then((response) => response.json())
            .then((data) => setBairros(data))
            .catch((error) => console.error("Erro ao buscar bairros:", error));
    }, []);

    // Função para alternar (ativar/desativar) todos os filtros de uma vez
    const toggleFilters = () => {
        if (filterByName && filterByCity && filterByNeighborhood) {
            setFilterByName(false);
            setFilterByCity(false);
            setFilterByNeighborhood(false);
        } else {
            setFilterByName(true);
            setFilterByCity(true);
            setFilterByNeighborhood(true);
        }
    };

    // Lista filtrada de pessoas, conforme os filtros ativados e seus valores
    const filteredPessoas = pessoas.filter((p) => {
        let match = true;
        if (filterByName && filterName.trim() !== "") {
            match =
                match &&
                p.nome.toLowerCase().includes(filterName.trim().toLowerCase());
        }
        if (filterByCity && filterCity !== "") {
            match = match && p.cidade_id === parseInt(filterCity);
        }
        if (filterByNeighborhood && filterNeighborhood !== "") {
            match = match && p.bairro_id === parseInt(filterNeighborhood);
        }
        return match;
    });

    // Calcula se todos os filtros estão ativos
    const allFiltersActive =
        filterByName && filterByCity && filterByNeighborhood;

    return (
        <div>
            <Navbar />
            <div className="container">
                <FormHeader headerTitle="Relatórios de Pessoas" />

                <div style={{ display: "flex", marginBottom: "20px", justifyContent: "space-between" }}>
                    <div className="filter-container">
                        <div className="checkbox-group">
                            <div>
                                <input type="checkbox" checked={filterByName} onChange={(e) => setFilterByName(e.target.checked)} />
                                <label>Parte do Nome</label>
                            </div>
                            <div>
                                <input type="checkbox" checked={filterByCity} onChange={(e) => setFilterByCity(e.target.checked)} />
                                <label>Cidade</label>
                            </div>
                            <div>
                                <input type="checkbox" checked={filterByNeighborhood} onChange={(e) => setFilterByNeighborhood(e.target.checked)} />
                                <label>Bairro</label>
                            </div>
                        </div>

                        <div className="input-group">
                            <input type="text" style = {{ padding: "5px", fontSize: "13px", width: "200%" }} value={filterName} onChange={(e) => setFilterName(e.target.value)} disabled={!filterByName} placeholder="Digite parte do nome" />
                            <select value={filterCity} style = {{ padding: "5px", fontSize: "13px", width: "200%" }} onChange={(e) => setFilterCity(e.target.value)} disabled={!filterByCity}>
                                <option value="">Selecione uma cidade</option>
                                {cidades.map((c) => (<option key={c.id} value={c.id}>{c.nome}</option>))}
                            </select>
                            <select value={filterNeighborhood} style = {{ padding: "5px", fontSize: "13px", width: "200%" }} onChange={(e) => setFilterNeighborhood(e.target.value)} disabled={!filterByNeighborhood}>
                                <option value="">Selecione um bairro</option>
                                {bairros.map((b) => (<option key={b.id} value={b.id}>{b.nome}</option>))}
                            </select>
                        </div>
                    </div>


                    <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
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
                            <th colSpan="4" style={{ textAlign: "center", fontSize: "1.2em" }}>
                                Empresa Fictícia
                            </th>
                        </tr>
                        <tr>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Cidade</th>
                            <th>Telefone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPessoas.length > 0 ? (
                            filteredPessoas.map((pessoa) => {
                                // Mapeia o id da cidade para o nome, usando os dados de cidades
                                const cidadeNome =
                                    cidades.find((c) => c.id === pessoa.cidade_id)?.nome || "";
                                return (
                                    <tr key={pessoa.id}>
                                        <td>{pessoa.id}</td>
                                        <td>{pessoa.nome}</td>
                                        <td>{cidadeNome}</td>
                                        <td>{pessoa.telefone}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="4" style={{ textAlign: "center" }}>
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

export default RelatoriosPessoas;