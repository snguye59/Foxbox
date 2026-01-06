import styles from "./SubmitButton.module.css";
import { SvgIcon } from "src/components/icons";

const SubmitButton = ({ text, type, isLoading, background, onClick }) => {
  return (
    <button
      type={type}
      className={` 
        ${styles.button} 
        ${styles[background]}
        ${isLoading ? styles.loading : styles.submit}
      `}
      onClick={onClick}
    >
      <div>
        {isLoading && <SvgIcon icon="yinYang" />}
        {isLoading ? "Loading..." : text}
      </div>
    </button>
  );
};

export default SubmitButton;
