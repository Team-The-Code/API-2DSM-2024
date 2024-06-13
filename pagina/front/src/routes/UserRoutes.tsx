import { Route, Routes } from "react-router-dom";
import {  Logout } from "../pages";

import MenuEditor from "../components/MenuEditor";
import EditorsPage from "../pages/EditorsPage";
import RevisorPage from "../pages/RevisorPage";

export default function UserRoutes() {
  return (
    <>
      <MenuEditor />
      <Routes>
        <Route path="/revisor" element={<RevisorPage />} />
        <Route path="/editor" element={<EditorsPage />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
}
