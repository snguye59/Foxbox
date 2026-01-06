import styles from "./FileDownloadCard.module.css";
import Image from "next/image";
import { extractFileSize, getIconForFileType } from "src/helpers/file";
import { CloseButton } from "src/components/buttons";
import { ProgressBar } from "src/components/utils";

const FileDownloadCard = ({
  data,
  progress,
  onDownload,
  onCancel,
  onDelete,
}) => {
  const { name, size } = data;
  const fileIcon = getIconForFileType(name);
  const { value, metric } = extractFileSize(size);

  return (
    <div className={styles.card} onClick={onDownload}>
      {onDelete && (
        <div className={styles.button}>
          <CloseButton
            size={16}
            onClick={(e) => {
              e.stopPropagation();
              progress ? onCancel() : onDelete();
            }}
          />
        </div>
      )}
      <div className={styles.info}>
        <Image src={fileIcon} alt="icon" width={90} height={90} />
        <p>{name}</p>
        {progress && <ProgressBar progress={`${progress}%`} />}
      </div>
      <p className={styles.size}>
        {value} {metric}
      </p>
      <p className={styles.progress}>{progress && `${progress}%`}</p>
    </div>
  );
};

export default FileDownloadCard;
