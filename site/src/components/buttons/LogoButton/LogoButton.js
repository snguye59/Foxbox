import styles from "./LogoButton.module.css";
import Link from "next/link";
import Image from "next/image";

const LogoButton = ({ link, showText }) => {
  return (
    <Link
      href={link}
      className={` 
        ${styles.button} 
        ${showText ? styles.showText : ""}
      `}
    >
      <Image
        src="/images/logos/foxbox.svg"
        alt="foxbox"
        width={46}
        height={46}
        priority
      />
    </Link>
  );
};

export default LogoButton;
