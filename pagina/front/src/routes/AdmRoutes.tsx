import { Route, Routes } from "react-router-dom";
import { ConfigPage, Logout, StatsPage, UserPage } from "../pages";
import { MenuAdm } from "../components";
import MenuLateral from "../components/MenuLateral";
import MapsPage from "../pages/MapsPage";
import PointPage from "../pages/PointPage";

export default function AdmRoutes() {
  return (
    <>
      <MenuAdm />
      <MenuLateral />
      <Routes>
        <Route path="/" element={<StatsPage />} />
        <Route path="/estatisticas" element={<StatsPage />} />
        <Route path="/estatisticas/GridsByProject" element={<StatsPage />} />
        <Route path="/estatisticas/mappingByProject" element={<MapsPage />} />
        <Route path="/estatisticas/pointersByProject" element={<PointPage />} />
        <Route path="/usuarios" element={<UserPage />} />
        <Route path="/configuracoes" element={<ConfigPage />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
}
