import { Route, Routes } from "react-router-dom";
import { MenuAdm } from "../components";
import MenuLateral from "../components/MenuLateral";
import { ConfigPage, Logout, ProjetoPage, StatsPage, UserPage } from "../pages";
import MapsPage from "../pages/MapsPage";
import PointPage from "../pages/PointPage";
import GradeA from "../pages/GradeA";
import GradeC from "../pages/GradeC";
import GradeT from "../pages/GradeT";



export default function AdmRoutes() {
  return (
    <>
      <MenuAdm />
      <MenuLateral />
      <Routes>
        <Route path="/estatisticas" element={<StatsPage />} />
        <Route path="/estatisticas/GridsByProject" element={<StatsPage />} />
        <Route path="/estatisticas/mappingByProject" element={<MapsPage />} />
        <Route path="/estatisticas/pointersByProject" element={<PointPage />} />
        <Route path="/projetos" element={<ProjetoPage />} />
        <Route path="/projetos/Taubaté" element={<GradeT/>} />
        <Route path="/projetos/Atibaia" element={<GradeA/>} />
        <Route path="/projetos/Cruzeiro" element={<GradeC/>} />
        <Route path="/usuarios" element={<UserPage />} />
        <Route path="/configuracoes" element={<ConfigPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/Grade" element={<Logout />} />
      </Routes>
    </>
  );
}
