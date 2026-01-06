"use client";

import styles from "../ComponentsPage.module.css";
import { AppHeaderMenu } from "src/components/menus";

const MenusPage = () => {
  return (
    <div className={styles.wrapper}>
      <AppHeaderMenu isVisible />
    </div>
  );
};

export default MenusPage;
