import styles from "./UserSidebarNavigation.module.css";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "src/hooks/useUser";
import { usePathname } from "next/navigation";
import { getTimeOfDay } from "src/helpers/time";
import { useState, useEffect, useRef } from "react";
import { useOutsideClick } from "src/hooks/useOutsideClick";
import { primaryLinks } from "src/data/sidebarNavigationData";
import { announcementsData } from "src/data/announcementsData";
import { announcementService } from "src/services/AnnouncementService";
import { SvgIcon } from "src/components/icons";
import { Divider } from "src/components/utils";
import { AvatarBadge } from "src/components/badges";
import { LogoButton } from "src/components/buttons";
import { UserInfoMenu } from "src/components/menus";
import { NewUpdatesCard } from "src/components/cards";
import { PageNavigationList } from "src/components/lists";

const UserSidebarNavigation = ({ showNavigation }) => {
  const menuRef = useRef();
  const buttonRef = useRef();
  const [showMenu, setShowMenu] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(false);

  const pathname = usePathname();
  const { uid, profile } = useUser();
  const { name, email, avatar } = profile || {};
  const { message, icon } = getTimeOfDay();

  async function handleAnnouncementClose() {
    setShowAnnouncement(false);
    await announcementService.dismissAnnouncement(uid);
  }

  useOutsideClick([menuRef, buttonRef], () => setShowMenu(false));

  useEffect(() => {
    async function checkAnnouncementStatus() {
      if (!uid) return;

      const { result } =
        await announcementService.hasDismissedLatestAnnouncement(uid);
      setShowAnnouncement(!result);
    }
    checkAnnouncementStatus();
  }, []);

  return (
    <div
      className={`
        ${styles.navigation} 
        ${showNavigation ? styles.show : styles.hide}
      `}
    >
      <div className={styles.content}>
        <div className={styles.links}>
          <div className={styles.logo}>
            <LogoButton link="/user/dashboard" showText />
          </div>
          <Divider width="216px" direction="vertical" theme="light" />
          <div className={styles.listPanel}>
            <div className={styles.greetingTexts}>
              <Image src={icon.image} alt={icon.name} width={24} height={24} />
              {message}
            </div>
            <div className={styles.list}>
              <PageNavigationList>
                {primaryLinks.map((navItem) => {
                  return (
                    <PageNavigationList.PageNavigationButton
                      key={navItem.link}
                      data={navItem}
                      isActive={pathname === navItem.link}
                      isDisabled={navItem.isDisabled}
                    />
                  );
                })}
              </PageNavigationList>
            </div>
          </div>
          <Divider width="216px" direction="vertical" theme="light" />
          <div className={styles.listPanel}>
            <div className={styles.organizationText}>
              <p>Organizations</p>
              <Link href="/" className={styles.plusButton}>
                <SvgIcon icon="plus" size={14} />
              </Link>
            </div>
          </div>
        </div>
        {showAnnouncement && (
          <div className={styles.announcement}>
            <NewUpdatesCard
              data={announcementsData[0]}
              onClose={handleAnnouncementClose}
            />
          </div>
        )}
      </div>
      <div ref={buttonRef}>
        {profile && (
          <button
            type="button"
            className={`
            ${styles.profileButton} 
            ${showMenu ? styles.active : ""}
          `}
            onClick={() => setShowMenu(!showMenu)}
          >
            <AvatarBadge data={avatar} size={36} />
            <div className={styles.texts}>
              <p>{name}</p>
              <p>{email}</p>
            </div>
            <SvgIcon icon="angle" size={12} />
          </button>
        )}
      </div>
      <div ref={menuRef} className={styles.subMenu}>
        {showMenu && <UserInfoMenu data={profile} />}
      </div>
    </div>
  );
};

export default UserSidebarNavigation;
