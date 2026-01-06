import styles from "./FilesAttachmentForm.module.css";
import { CloseButton } from "src/components/buttons";
import { FileUploadList } from "src/components/lists";
import { FileUploadInput } from "src/components/inputs";

const FilesAttachmentForm = ({ uploads, onChange, onCancel, onClose }) => {
  return (
    <div className={styles.form}>
      <div className={styles.button}>
        <CloseButton size={16} onClick={onClose} />
      </div>
      <div className={styles.texts}>
        <p>Upload New File</p>
        <p>Add your documents. Quick and secure uploads.</p>
      </div>
      <FileUploadInput onChange={onChange} />
      {uploads.length !== 0 && (
        <div className={styles.lists}>
          {uploads.map((upload, index) => {
            const { file, progress } = upload;

            return (
              <FileUploadList
                key={index}
                data={file}
                progress={progress}
                onDelete={() => onCancel(upload)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FilesAttachmentForm;
