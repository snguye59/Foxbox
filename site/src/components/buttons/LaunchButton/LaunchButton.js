import styles from "./LaunchButton.module.css";
import Link from "next/link";
import { SvgIcon } from "src/components/icons";

const LaunchButton = ({ text, link, icon }) => {
  return (
    <Link href={link} className={styles.button}>
      <div className={styles.ring}>
        <div className={styles.iconBackground}>
          <SvgIcon icon={icon} />
        </div>
      </div>
      {text}
    </Link>
  );
};

export default LaunchButton;
