import { useContext } from "react";
import { FilesContext } from "src/contexts";

export function useFiles() {
  return useContext(FilesContext);
}
