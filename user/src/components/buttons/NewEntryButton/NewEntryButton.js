import styles from "./NewEntryButton.module.css";
import { SvgIcon } from "src/components/icons";

const NewEntryButton = ({ text, onClick }) => {
  return (
    <button type="button" className={styles.button} onClick={onClick}>
      <SvgIcon icon="plus" size={14} />
      {text}
    </button>
  );
};

export default NewEntryButton;
