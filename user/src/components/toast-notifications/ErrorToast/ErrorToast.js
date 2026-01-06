import styles from "./ErrorToast.module.css";
import { SvgIcon } from "src/components/icons";

const ErrorToast = ({ text }) => {
  return (
    <div className={styles.toast}>
      <SvgIcon icon="circleExclamation" size={36} />
      <div className={styles.texts}>
        <p>An error has occurred.</p>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default ErrorToast;
