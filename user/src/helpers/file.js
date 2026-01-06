import { fileTypeIconData } from "src/data/fileTypeIconData";

export function extractFileSize(size) {
  const i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  const value = (size / Math.pow(1024, i)).toFixed(1) * 1;
  const metric = ["B", "KB", "MB", "GB", "TB"][i];

  return { value, metric };
}

export function convertFileToBufferArray(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsArrayBuffer(file);
  });
}

export function getIconForFileType(fileName) {
  const extension = fileName.split(".").pop().toLowerCase();
  return fileTypeIconData[extension] || fileTypeIconData["default"];
}
