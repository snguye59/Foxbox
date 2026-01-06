import styles from "./DropdownButton.module.css";
import { SvgIcon } from "src/components/icons";

const DropdownButton = ({ text, isActive, onClick }) => {
  return (
    <button type="button" className={styles.button} onClick={onClick}>
      {text}
      {isActive && <SvgIcon icon="check" size={16} />}
    </button>
  );
};

export default DropdownButton;
