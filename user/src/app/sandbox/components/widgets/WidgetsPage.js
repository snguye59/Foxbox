"use client";

import styles from "../ComponentsPage.module.css";
import { users } from "foxbox-example";
import { VaultItemsWidget } from "src/components/widgets";

const WidgetsPage = () => {
  return (
    <div className={styles.wrapper}>
      <VaultItemsWidget
        vault={users["user1"].vaults["KW1uEkUGqLFgwRqqUva5"]}
        items={users["user1"].vaults["KW1uEkUGqLFgwRqqUva5"].items}
        onFormOpen={() => {}}
      />
    </div>
  );
};

export default WidgetsPage;
