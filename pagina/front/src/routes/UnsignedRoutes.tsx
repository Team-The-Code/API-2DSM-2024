import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages";

export default function UnsignedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
