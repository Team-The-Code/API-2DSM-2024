import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "../components/Menu";
import styled from "styled-components";
import Cadastro from "../components/Cadastro/Cadastro";
import { CadastroProvider } from "../contexts/CadastroContext";
import Login from "../components/Login/Login";
import Interface from "../components/Editor/Interface";


export default function Rotas() {
  return (
    <PageSld>
          <CadastroProvider>
            <BrowserRouter>
              <Menu />
              <BodySld>
                <Routes>
                  <Route path="/interface" element={<Interface />} />
                  <Route path="/cadastro" element={<Cadastro />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </BodySld>
            </BrowserRouter>
          </CadastroProvider>
    </PageSld>
  );
}

const PageSld = styled.div`
  display: flex;
`;

const BodySld = styled.div`
  position: absolute; /* Alterado para position: absolute */
  top: calc(
    50% + 60px
  ); /* Posiciona o elemento no meio verticalmente e Ajusta o valor para compensar a altura do menu */
  left: 50%; /* Posiciona o elemento no meio horizontalmente */
  transform: translate(
    -50%,
    -50%
  ); /* Move o elemento de volta metade de sua própria largura e altura */
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;
