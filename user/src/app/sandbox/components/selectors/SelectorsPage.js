"use client";

import styles from "../ComponentsPage.module.css";
import { NotificationTypeSelector } from "src/components/selectors";

const SelectorsPage = () => {
  return (
    <div className={styles.wrapper}>
      <NotificationTypeSelector
        tab="unread"
        unread={4}
        onTabSelect={() => {}}
      />
    </div>
  );
};

export default SelectorsPage;
