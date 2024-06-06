import { Link } from "react-router-dom";

export default function MenuAdm() {
  return (
    <div>
      <Link to="/estatisticas">Estatísticas</Link>
      <Link to="/usuarios">Usuários</Link>
      <Link to="/configuracoes">Configurações</Link>
      <Link to="/logout">Logout</Link>
    </div>
  );
}
