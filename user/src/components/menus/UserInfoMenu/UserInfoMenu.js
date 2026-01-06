import styles from "./UserInfoMenu.module.css";
import { usePathname } from "next/navigation";
import { secondaryLinks } from "src/data/sidebarNavigationData";
import { Divider } from "src/components/utils";
import { AvatarBadge } from "src/components/badges";
import { PageNavigationList } from "src/components/lists";

const UserInfoMenu = ({ data }) => {
  const pathname = usePathname();
  const { name, email, avatar } = data;

  return (
    <div className={styles.menu}>
      <div className={styles.account}>
        <AvatarBadge data={avatar} size={36} />
        <div className={styles.texts}>
          <p>{name}</p>
          <p>{email}</p>
        </div>
      </div>
      <Divider direction="vertical" theme="light" />
      <div className={styles.links}>
        <PageNavigationList>
          {secondaryLinks.map((navItem) => {
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
        <PageNavigationList.PageNavigationButton
          data={{
            name: "Logout",
            link: "/user/logout",
            icon: "bracketArrow",
          }}
        />
      </div>
      <p className={styles.appInfo}>v.1.0.0 • Terms & Conditions</p>
    </div>
  );
};

export default UserInfoMenu;
