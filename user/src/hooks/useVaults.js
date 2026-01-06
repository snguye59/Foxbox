import { useContext } from "react";
import { VaultsContext } from "src/contexts";

export function useVaults() {
  return useContext(VaultsContext);
}
