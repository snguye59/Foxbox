import styles from "./HelpCategoryButton.module.css";
import Link from "next/link";
import { SvgIcon } from "src/components/icons";

const HelpCategoryButton = ({ data }) => {
  const { title, link, background, icon } = data;

  return (
    <Link href={link} className={styles.button}>
      <div className={`${styles.iconBackground} ${styles[background]}`}>
        <SvgIcon icon={icon} size={60} />
      </div>
      <div className={styles.text}>
        <p>{title}</p>
      </div>
    </Link>
  );
};

export default HelpCategoryButton;
