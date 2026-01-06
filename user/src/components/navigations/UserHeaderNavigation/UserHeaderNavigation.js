import styles from "./UserHeaderNavigation.module.css";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { primaryLinks, secondaryLinks } from "src/data/sidebarNavigationData";
import { Divider } from "src/components/utils";
import { SvgIcon } from "src/components/icons";
import { LogoButton } from "src/components/buttons";

const UserHeaderNavigation = ({ onSidebarVisibilityToggle }) => {
  const [isNotified, setIsNotified] = useState(false);

  const pathname = usePathname();

  function getCurrentPageName() {
    const allLinks = [...primaryLinks, ...secondaryLinks];
    const currentPage = allLinks.find(({ link }) => pathname.includes(link));
    return currentPage?.name;
  }

  return (
    <div className={styles.navigation}>
      <div className={styles.logo}>
        <LogoButton link="/user/dashboard" showText />
      </div>
      <div className={styles.notification}>
        <button type="button" className={styles.bellButton} onClick={() => {}}>
          <Image
            src={`/images/colored-icons/${
              isNotified ? "bell-notified" : "bell"
            }.svg`}
            alt="bell"
            width={32}
            height={32}
          />
        </button>
      </div>
      <div className={styles.title}>
        <p>{getCurrentPageName()}</p>
      </div>
      <button
        type="button"
        className={styles.hamburgerButton}
        onClick={() =>
          onSidebarVisibilityToggle((prev) => ({
            showNavigation: !prev.showNavigation,
            userToggled: true,
          }))
        }
      >
        <SvgIcon icon="bars" size={24} />
      </button>
      <div className={styles.divider1}>
        <Divider direction="vertical" theme="light" />
      </div>
      <div className={styles.divider2}>
        <Divider direction="vertical" theme="light" />
      </div>
    </div>
  );
};

export default UserHeaderNavigation;
