"use client";

import styles from "../ComponentsPage.module.css";
import { users } from "foxbox-example";
import {
  VaultsNavigation,
  UserHeaderNavigation,
  VaultItemsNavigation,
  UserSidebarNavigation,
} from "src/components/navigations";

const NavigationsPage = () => {
  return (
    <div className={styles.wrapper}>
      <VaultItemsNavigation
        vault={users["user1"].vaults["KW1uEkUGqLFgwRqqUva5"]}
        categories={["login"]}
        tags={["meow", "mew", "m", "fasf", "fsfsdf", "wrfdsfsf", "fasfsafsdf"]}
        currentSort={{
          sortedBy: "Name",
          sortedOrder: "A-Z ordering",
        }}
        currentFilter={{
          filteredBy: "all",
        }}
        onSortSelect={() => {}}
        onFilterSelect={() => {}}
      />
      <UserSidebarNavigation showNavigation />
      <UserHeaderNavigation />
      <VaultsNavigation
        currentVault={users["user1"].vaults["KW1uEkUGqLFgwRqqUva5"]}
        vaults={users["user1"].vaults}
      />
    </div>
  );
};

export default NavigationsPage;
