"use client";

import styles from "../ComponentsPage.module.css";
import { OverlayBackground } from "src/components/backgrounds";

const BackgroundsPage = () => {
  return (
    <div className={styles.wrapper}>
      <OverlayBackground position="fixed" isBlur />
    </div>
  );
};

export default BackgroundsPage;
