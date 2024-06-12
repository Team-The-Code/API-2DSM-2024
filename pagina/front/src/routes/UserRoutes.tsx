import { Route, Routes } from "react-router-dom";
import {  Logout } from "../pages";

import MenuEditor from "../components/MenuEditor";

export default function UserRoutes() {
  return (
    <>
      <MenuEditor />
      <Routes>
      
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
}
