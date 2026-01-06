import styles from "./SvgIcon.module.css";
import { variants } from "./variants";

const SvgIcon = ({ icon, size = 24}) => {
  return (
    <svg
      className={styles.icon}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {variants[icon]}
    </svg>
  );
};

export default SvgIcon;
