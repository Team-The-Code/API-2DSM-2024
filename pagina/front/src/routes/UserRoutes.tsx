import { Route, Routes } from "react-router-dom";
import {  Logout } from "../pages";
import Projects from "../pages/Editors";
import MenuEditor from "../components/MenuEditor";

export default function UserRoutes() {
  return (
    <>
      <MenuEditor />
      <Routes>
      <Route path="/editors" element={<Projects />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
}
