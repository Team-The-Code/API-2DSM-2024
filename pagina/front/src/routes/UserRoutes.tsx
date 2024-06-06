import { Route, Routes } from "react-router-dom";
import { ConfigPage, Logout } from "../pages";
import { MenuUser } from "../components";

export default function UserRoutes() {
  return (
    <>
      <MenuUser />
      <Routes>
        <Route path="/" element={<ConfigPage />} />
        <Route path="/configuracoes" element={<ConfigPage />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
}
