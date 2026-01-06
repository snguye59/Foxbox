"use client";

import styles from "../ComponentsPage.module.css";
import { learningResourcesData } from "src/data/learningResourcesData";
import { AvatarBadge, BlogTagBadge } from "src/components/badges";

const BadgesPage = () => {
  return (
    <div className={styles.wrapper}>
      <BlogTagBadge type="security" />
      <AvatarBadge data={learningResourcesData[0].author} size={24} showName />
    </div>
  );
};

export default BadgesPage;
