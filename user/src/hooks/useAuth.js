import { useContext } from "react";
import { AuthContext } from "src/contexts";

export function useAuth() {
  return useContext(AuthContext);
}
