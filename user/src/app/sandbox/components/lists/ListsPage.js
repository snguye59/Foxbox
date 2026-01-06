"use client";

import styles from "../ComponentsPage.module.css";
import { usePathname } from "next/navigation";
import { primaryLinks } from "src/data/sidebarNavigationData";
import { generalCategories } from "src/data/vaultItemCategoriesData";
import {
  FileUploadList,
  RewardTaskList,
  NotificationList,
  PageNavigationList,
  ActivityMetricList,
  VaultItemsFilterList,
} from "src/components/lists";
import { users } from "foxbox-example";

const ListsPage = () => {
  const pathname = usePathname();

  return (
    <div className={styles.wrapper}>
      <ActivityMetricList type="loginSuccess" />
      <PageNavigationList>
        {primaryLinks.map((navItem) => {
          return (
            <PageNavigationList.PageNavigationButton
              key={navItem.link}
              data={navItem}
              isActive={pathname === navItem.link}
            />
          );
        })}
      </PageNavigationList>
      <VaultItemsFilterList title="Title" isExpandable>
        {generalCategories.map((category) => {
          const { type } = category;

          return (
            <VaultItemsFilterList.FilterButton
              key={type}
              data={category}
              isActive={false}
              onClick={() => {}}
            />
          );
        })}
      </VaultItemsFilterList>
      <NotificationList data={users["user1"].notifications["notification1"]} />
      <FileUploadList
        data={{ name: "animal-kingdom.sketch", size: "152454" }}
        progress={14}
        onDelete={() => {}}
      />
      {/* <RewardTaskList /> */}
      {/* <TrustedBrowserList /> */}
    </div>
  );
};

export default ListsPage;
