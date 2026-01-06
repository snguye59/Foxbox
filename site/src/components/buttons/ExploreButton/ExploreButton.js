import styles from "./ExploreButton.module.css";
import Link from "next/link";
import { SvgIcon } from "src/components/icons";

const ExploreButton = ({ text, link, icon, theme }) => {
  return (
    <Link href={link} className={`${styles.button} ${styles[theme]}`}>
      <SvgIcon icon={icon} />
      {text}
    </Link>
  );
};

export default ExploreButton;
