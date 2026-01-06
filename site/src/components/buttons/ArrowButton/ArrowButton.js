import styles from "./ArrowButton.module.css";
import Link from "next/link";
import { SvgIcon } from "src/components/icons";

const ArrowButton = ({ text, link, onClick }) => {
  function renderContent() {
    return (
      <>
        {text}
        <SvgIcon icon="arrow" size={12} />
      </>
    );
  }
  
  return link ? (
    <Link href={link} className={styles.button}>
      {renderContent()}
    </Link>
  ) : (
    <button type="button" className={styles.button} onClick={onClick}>
      {renderContent()}
    </button>
  );
};

export default ArrowButton;
