import { useContext } from "react";
import {ErrorDisplayContext} from "src/contexts";

export function useErrorDisplay() {
  return useContext(ErrorDisplayContext);
}
