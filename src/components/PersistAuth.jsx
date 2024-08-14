// Mantener sesion persistida

import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { useEffect, useState } from "react";

const PersisAuth = () => {
  const location = useLocation();
  const { auth, setAuth } = useAuth();
  const [isLoading, setIsloading] = useState(auth.name ? false : true);

  useEffect(() => {
    const handleUser = async () => {
      try {
        const { data } = await axios.get("/api/refres");
        setAuth(data);
        setIsloading(false);
      } catch (error) {
        console.log(error);
        setIsloading(false);
        setAuth({});
      }
    };
    handleUser();
  }, [setAuth]);

  // cuando esta cargando el usuario
  if (isLoading) {
    return <div>Cargando</div>;
  }

  // Cuando estoy en home
  if (location.pathname === "/") {
    if (auth?.name) {
      return <Navigate to="/inicio" state={{ from: location }} replace />;
    } else {
      return <Outlet />;
    }
  }

  // Cuando estoy en cualquier ruta privada
  if (auth?.name) {
    return <Outlet />;
  } else {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
};

export default PersisAuth;
