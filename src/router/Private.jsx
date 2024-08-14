import { Route, Routes } from "react-router";
import Sesion from "../pages/sesion";
import PersisAuth from "../components/PersistAuth";
import FormularioPagos from "../pages/pagos";
import FichaMedica from "../pages/fichaMedica";
import Inicio from "../pages/inicio";

export const RootPrivate = () => {
  return (
    <>
      <Routes>
        <Route element={<PersisAuth />}>
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/sesion" element={<Sesion />} />
          <Route path="/pagos" element={<FormularioPagos />} />
          <Route path="/medica" element={<FichaMedica />} />
        </Route>
      </Routes>
    </>
  );
};

export default RootPrivate;
