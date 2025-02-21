import { Link, useLocation } from 'react-router-dom';  // Importação combinada

function updateDateTime() {
  const now = new Date();
  const options = { timeZone: 'America/Sao_Paulo', hour12: false };
  const dateTimeString = now.toLocaleString('pt-BR', options);
  document.getElementById('datetime').textContent = dateTimeString;
}

function Navbar() {
  const location = useLocation();

  const pageTitles = {
    "/": "Home",
    "/bairros": "Cadastro de Bairros",
    "/cidades": "Cadastro de Cidades",
    "/pessoas": "Cadastro de Pessoas",
    "/produtos": "Cadastro de Produtos",
  };

  const currentPage = pageTitles[location.pathname] || location.pathname;

  // Chamada de setInterval movida para dentro do componente
  setInterval(updateDateTime, 1000);

  return (
    <div className="navbar">
      <Link to="/" className="nav-button">
        <span className="material-symbols-outlined">menu_open</span>Menu Principal
      </Link>
      {/* <h1>{currentPage}</h1> */}
      <div id="datetime" className="datetime" onLoad={updateDateTime}> </div>
    </div>
  );
}

export default Navbar;