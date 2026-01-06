import styles from "./AppHeaderNavigation.module.css";
import Link from "next/link";
import { useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { headerData } from "src/data/headerData";
import { useOutsideClick } from "src/hooks/useOutsideClick";
import { SvgIcon } from "src/components/icons";
import { LogoButton } from "src/components/buttons";
import { AppHeaderMenu } from "src/components/menus";

const AppHeaderNavigation = () => {
  const pathname = usePathname();
  const menuRef = useRef();
  const iconRef = useRef();
  const [showMenu, setShowMenu] = useState(false);

  useOutsideClick([menuRef, iconRef], () => setShowMenu(false));

  return (
    <div className={styles.navigation}>
      <div ref={menuRef} className={styles.menu}>
        <AppHeaderMenu isVisible={showMenu} />
      </div>
      <div className={styles.buttons}>
        <LogoButton link="/" showText />
        {headerData
          .filter((data) => !data.isAuthLink)
          .map((data) => {
            const { name, link } = data;

            return (
              <Link
                href={link}
                key={name}
                className={` 
                ${styles.linkButton} 
                ${pathname.includes(link) ? styles.active : ""}
              `}
              >
                {name}
              </Link>
            );
          })}
      </div>
      <div className={`${styles.buttons} ${styles.entry}`}>
        <Link
          href="/login"
          className={` 
            ${styles.linkButton} 
            ${pathname.includes("/login") ? styles.active : ""}
          `}
        >
          Sign in
        </Link>
        <Link href="/register" className={styles.tryButton}>
          Try Foxbox FREE
        </Link>
        <button
          type="button"
          ref={iconRef}
          className={styles.hamburgerButton}
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        >
          <SvgIcon icon="bars" size="24" />
        </button>
      </div>
    </div>
  );
};

export default AppHeaderNavigation;
