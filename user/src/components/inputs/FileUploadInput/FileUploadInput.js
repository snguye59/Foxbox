import styles from "./FileUploadInput.module.css";
import { useRef } from "react";
import { ContextualBadge } from "src/components/badges";

const FileUploadInput = ({ onChange }) => {
  const inputRef = useRef();

  function handleDrop(e) {
    e.preventDefault();

    if (e.dataTransfer.items) {
      onChange({
        target: {
          type: "file",
          files: e.dataTransfer.files,
        },
      });
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  return (
    <div
      className={styles.input}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <ContextualBadge type="info" icon="paperclip" size="small" />
      <div className={styles.texts}>
        <input
          type="file"
          ref={inputRef}
          multiple
          onChange={(e) => {
            onChange(e);
            inputRef.current.value = "";
          }}
        />
        <p>
          <span onClick={() => inputRef.current.click()}>Click to upload</span>{" "}
          or drag and drop
        </p>
        <p>All files type (max 20MB)</p>
      </div>
    </div>
  );
};

export default FileUploadInput;
