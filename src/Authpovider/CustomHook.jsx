import { useContext } from "react";
import { AuthContext } from "./Authcontext";

export const useAuth = () => {
  return useContext(AuthContext);
};