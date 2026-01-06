"use client";

import styles from "../ComponentsPage.module.css";
import {
  AppHeaderNavigation,
  AppFooterNavigation,
} from "src/components/navigations";

const NavigationsPage = () => {
  return (
    <div className={styles.wrapper}>
      <AppHeaderNavigation />
      <AppFooterNavigation />
    </div>
  );
};

export default NavigationsPage;
