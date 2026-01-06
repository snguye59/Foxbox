"use client";

import styles from "../ComponentsPage.module.css";
import { ErrorToast } from "src/components/toast-notifications";

const ToastNotifications = () => {
  return (
    <div className={styles.wrapper}>
      <ErrorToast text="There already exists an account with the given email address." />
    </div>
  );
};

export default ToastNotifications;
