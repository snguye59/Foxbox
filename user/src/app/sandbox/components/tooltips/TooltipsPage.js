"use client";

import styles from "../ComponentsPage.module.css";
import { InfoTooltip } from "src/components/tooltips";

const TooltipsPage = () => {
  return (
    <div className={styles.wrapper}>
      <InfoTooltip
        data={{
          title: "What is Reminder?",
          description:
            "If you've forgotten your master password but previously created a reminder, Foxbox will try to send that reminder to your email address.",
        }}
      />
    </div>
  );
};

export default TooltipsPage;
