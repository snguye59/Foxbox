"use client";

import styles from "../ComponentsPage.module.css";
import { OverlayBackground } from "src/components/backgrounds";

const BackgroundsPage = () => {
  return (
    <div className={styles.wrapper}>
      <OverlayBackground isBlur onClick={() => {}} />
    </div>
  );
};

export default BackgroundsPage;
