import styles from "./FileUploadList.module.css";
import { extractFileSize } from "src/helpers/file";
import { SvgIcon } from "src/components/icons";
import { ProgressBar } from "src/components/utils";
import { CloseButton } from "src/components/buttons";

const FileUploadList = ({ data, progress, onDelete }) => {
  const { name, size } = data;
  const { value, metric } = extractFileSize(size);

  return (
    <div className={styles.list}>
      <div className={styles.fileIcon}>
        <SvgIcon icon="file" size={56} />
      </div>
      <div className={styles.info}>
        <p className={styles.name}>{name}</p>
        <ProgressBar progress={`${progress}%`} />
        <div className={styles.progress}>
          <p>
            {progress === 100
              ? `${value} ${metric}`
              : `${((progress * value) / 100).toFixed(
                  1
                )} of ${value} ${metric}`}
          </p>
          <p>{progress === 100 ? "Finished" : `${progress}%`}</p>
        </div>
      </div>
      <div className={styles.button}>
        <CloseButton size={12} onClick={() => onDelete(data)} />
      </div>
    </div>
  );
};

export default FileUploadList;
