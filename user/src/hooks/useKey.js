import { useContext } from "react";
import { KeyManagementContext } from "src/contexts";

export function useKey() {
  return useContext(KeyManagementContext);
}
