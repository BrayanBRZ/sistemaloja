import Navbar from "../../components/Navbar";
import { Link } from 'react-router-dom';
import '../home/home.css';

function Home() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="header">Menu Principal</div>
        <table>
          <tbody>
            <tr>
              <th>Cadastro</th>
              <th>Movimento</th>
              <th>Relatórios</th>
            </tr>
            <tr>
              <td>
                <Link to="/bairros/listar"><button className="button"><span className="material-symbols-outlined">map</span>Bairros</button></Link>
                <Link to='/cidades/listar'><button className="button"><span className="material-symbols-outlined">map</span>Cidades</button></Link>
                <Link to='/pessoas/listar'><button className="button"><span className="material-symbols-outlined">person_add</span>Pessoas</button></Link>
                <Link to='/produtos/listar'><button className="button"><span className="material-symbols-outlined">local_mall</span>Produtos</button></Link>
              </td>
              <td>
                <Link to="/vendas/listar"><button className="button"><span className="material-symbols-outlined">local_mall</span>Vendas</button></Link>
              </td>
              <td>
                <Link to="/pessoas/relatorios"><button className="button"><span className="material-symbols-outlined">group</span>Lista de Pessoas</button></Link>
                <Link to="/vendas/relatorios"><button className="button"><span className="material-symbols-outlined">local_mall</span>Lista de Vendas</button></Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div >
  );
}

export default Home;