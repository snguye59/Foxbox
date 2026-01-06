import styles from "./CloseButton.module.css";
import { SvgIcon } from "src/components/icons";

const CloseButton = ({ size, onClick }) => {
  return (
    <button type="button" className={styles.button} onClick={onClick}>
      <SvgIcon icon="xMark" size={size} />
    </button>
  );
};

export default CloseButton;
