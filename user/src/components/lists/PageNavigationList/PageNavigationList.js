import styles from "./PageNavigationList.module.css";
import Link from "next/link";
import Image from "next/image";
import { SvgIcon } from "src/components/icons";

const PageNavigationList = ({ children }) => {
  return <div className={styles.list}>{children}</div>;
};

const PageNavigationButton = ({ data, isActive, isDisabled }) => {
  const { name, link, icon, avatar } = data;

  return (
    <Link
      href={link}
      className={` 
        ${styles.button} 
        ${isActive ? styles.active : ""}
        ${isDisabled ? styles.disabled : ""}
      `}
    >
      {icon ? (
        <SvgIcon icon={icon} />
      ) : (
        <Image src={avatar.image} alt={avatar.name} width={24} height={24} />
      )}
      <p className={styles.name}>{name}</p>
    </Link>
  );
};

PageNavigationList.PageNavigationButton = PageNavigationButton;
PageNavigationButton.displayName = "PageNavigationButton";

export default PageNavigationList;
