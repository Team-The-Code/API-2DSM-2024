import { Route, Routes } from "react-router-dom";
import { ConfigPage, Logout, StatsPage, UserPage } from "../pages";
import { MenuAdm } from "../components";
import styled from "styled-components";

export default function AdmRoutes() {
  return (
    <>
      <Sld>
      <ImgSld alt="" src="./logo-branca-completa.svg"/>
        <RightSld>
          <MenuAdm />
          <Routes>
            <Route path="/" element={<StatsPage />} />
            <Route path="/estatisticas" element={<StatsPage />} />
            <Route path="/usuarios" element={<UserPage />} />
            <Route path="/configuracoes" element={<ConfigPage />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </RightSld>
      </Sld>
    </>
  );
}
const Sld = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  z-index: 1000; /* Para garantir que o menu esteja acima de outros elementos */
  background-color: #000;
  box-sizing: border-box;
  a {
    text-decoration: none;
    color: #fff;
    position: relative; 

    
    &:after {
        content: ''; 
        position: absolute; 
        left: 0;
        right: 0;
        bottom: -2px; 
        height: 2px;
        background-color: #ff6900;
        transition: width 0.3s ease; 
        width: 0; 
    }

    &:hover::after {
        width: 100%; 
    }
}
`;



const RightSld = styled.div`
  display: flex;
  flex-direction: row;
`;
const ImgSld = styled.img`
  display: flex;
  width: auto;
  height: 50px;
  margin: 0px 40px;
`;

