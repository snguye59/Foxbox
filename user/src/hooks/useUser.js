import { useContext } from "react";
import { UserContext } from "src/contexts";

export function useUser() {
  return useContext(UserContext);
}
