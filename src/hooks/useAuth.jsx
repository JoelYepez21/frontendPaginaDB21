import { useContext } from "react";
import { AuthContext } from "../context/authContex";

export const useAuth = () => {
  return useContext(AuthContext);
};
