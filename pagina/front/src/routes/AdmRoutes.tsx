import { Route, Routes } from "react-router-dom";
import { ConfigPage, Logout, StatsPage, UserPage } from "../pages";
import { MenuAdm } from "../components";

export default function AdmRoutes() {
  return (
    <>
      <MenuAdm />
      <Routes>
        <Route path="/" element={<StatsPage />} />
        <Route path="/estatisticas" element={<StatsPage />} />
        <Route path="/usuarios" element={<UserPage />} />
        <Route path="/configuracoes" element={<ConfigPage />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
}
