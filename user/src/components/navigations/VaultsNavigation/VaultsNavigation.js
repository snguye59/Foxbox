import styles from "./VaultsNavigation.module.css";
import { useState, useRef } from "react";
import { useWindowWidth } from "src/hooks/useWindowWidth";
import { useOutsideClick } from "src/hooks/useOutsideClick";
import { SvgIcon } from "src/components/icons";
import { Divider } from "src/components/utils";
import { VaultPickerMenu } from "src/components/menus";
import { LogoButton, VaultIllustrationButton } from "src/components/buttons";

const VaultsNavigation = ({ currentVault, vaults }) => {
  const menuRef = useRef();
  const titleRef = useRef();
  const { windowWidth } = useWindowWidth();
  const [showMenu, setShowMenu] = useState(false);
  const { name, illustration } = currentVault;

  useOutsideClick([menuRef, titleRef], () => setShowMenu(false));

  return (
    <div className={styles.navigation}>
      {showMenu && (
        <div ref={menuRef} className={styles.menu}>
          <VaultPickerMenu data={vaults} onClick={() => setShowMenu(false)} />
        </div>
      )}
      <div className={styles.logo}>
        <LogoButton link="/user/dashboard" showText={windowWidth > 560} />
      </div>
      <div className={styles.divider}>
        <Divider height="78px" direction="horizontal" theme="light" />
      </div>
      <div
        ref={titleRef}
        className={styles.title}
        onClick={() => {
          setShowMenu(!showMenu);
        }}
      >
        <VaultIllustrationButton data={illustration} size="big" />
        <p className={styles.name}>{name}</p>
        <SvgIcon icon="angle" size={18} />
      </div>
    </div>
  );
};

export default VaultsNavigation;
