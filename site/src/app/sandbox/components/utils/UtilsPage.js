"use client";

import styles from "../ComponentsPage.module.css";
import { Divider, VideoPlayer } from "src/components/utils";

const UtilsPage = () => {
  return (
    <div className={styles.wrapper}>
      <Divider width="100%" height="1px" direction="horizontal" theme="dark" />
      <VideoPlayer
        link="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Rick Astley - Never Gonna Give You Up (Official Music Video)"
        width="1000px"
        showGradient
      />
    </div>
  );
};

export default UtilsPage;
