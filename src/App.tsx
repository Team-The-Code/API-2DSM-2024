
import { BrowserRouter, Link } from "react-router-dom";
import { Route, Routes } from "react-router";
import Interface from "./components/Interface";
import Cadastro from "./components/Cadastro";
import Login from "./components/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Rotas />
    </BrowserRouter>
  );
}

function Rotas() {
  return (
    <Routes>
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/interface" element={<Interface />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Erro />} /> {/* Rota coringa para rota inexistente */}
    </Routes>
  );
}

function Erro() {
  return <div>Rota inexistente</div>;
}

function Menu() {
  return (
    <div>
      <Link to="/cadastro">Cadastro</Link>
      <Link to="/interface">Interface</Link>
      <Link to="/login">Login</Link>
    </div>
  );
}