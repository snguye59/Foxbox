import styles from "./HelpTopicButton.module.css";
import Link from "next/link";
import { SvgIcon } from "src/components/icons";

const HelpTopicButton = ({ data }) => {
  const { title, subtitle, link, icon } = data;

  return (
    <Link href={link} className={styles.button}>
      <div className={styles.iconBackground}>
        <SvgIcon icon={icon} size={36} />
      </div>
      <div className={styles.texts}>
        <h5>{title}</h5>
        <p>{subtitle}</p>
      </div>
    </Link>
  );
};

export default HelpTopicButton;
