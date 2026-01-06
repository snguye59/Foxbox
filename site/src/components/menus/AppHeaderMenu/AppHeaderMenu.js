import styles from "./AppHeaderMenu.module.css";
import { usePathname } from "next/navigation";
import { headerData } from "src/data/headerData";
import { PageNavigationList } from "src/components/lists";

const AppHeaderMenu = ({ isVisible }) => {
  const pathname = usePathname();

  return (
    <div
      className={`
        ${styles.menu} 
        ${isVisible ? styles.show : ""}
      `}
    >
      <PageNavigationList>
        {headerData
          .filter((data) => !data.isAuthLink)
          .map((navItem) => {
            return (
              <PageNavigationList.PageNavigationButton
                key={navItem.link}
                data={navItem}
                isActive={pathname === navItem.link}
              />
            );
          })}
      </PageNavigationList>
      <PageNavigationList>
        {headerData
          .filter((data) => data.isAuthLink)
          .map((navItem) => {
            return (
              <PageNavigationList.PageNavigationButton
                key={navItem.link}
                data={navItem}
                isActive={pathname === navItem.link}
              />
            );
          })}
      </PageNavigationList>
    </div>
  );
};

export default AppHeaderMenu;
