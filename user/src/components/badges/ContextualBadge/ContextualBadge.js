import styles from "./ContextualBadge.module.css";
import { SvgIcon } from "src/components/icons";

const ContextualBadge = ({ type, icon, size }) => {
  return (
    <div className={`${styles.badge} ${styles[type]} ${styles[size]}`}>
      <div className={styles.iconBackground}>
        <SvgIcon icon={icon} />
      </div>
    </div>
  );
};

export default ContextualBadge;
