"use client";

import styles from "../ComponentsPage.module.css";
import { SvgIcon } from "src/components/icons";

const IconsPage = () => {
  return (
    <div className={styles.wrapper}>
      <SvgIcon icon="creditCard" size={30} />
    </div>
  );
};

export default IconsPage;
