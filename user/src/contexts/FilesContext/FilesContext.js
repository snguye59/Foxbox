"use client";

import { fileService } from "src/services";
import { useState, createContext } from "react";
import { useErrorDisplay } from "src/hooks/useErrorDisplay";

const FilesContext = createContext();

const FilesProvider = ({ children }) => {
  const [files, setFiles] = useState({});

  const { handleErrorDisplay } = useErrorDisplay();

  async function handleFilesSync(pathData) {
    const { files, error } = await fileService.readFiles(pathData);

    if (error) {
      handleErrorDisplay(error);
    }
    setFiles(files);
  }

  return (
    <FilesContext.Provider value={{ files, handleFilesSync }}>
      {children}
    </FilesContext.Provider>
  );
};

export default FilesContext;
export { FilesProvider };
