"use client";

import styles from "../ComponentsPage.module.css";
import { users, organizations } from "foxbox-example";
import {
  InputBadge,
  AvatarBadge,
  NumberBadge,
  ContextualBadge,
} from "src/components/badges";

const BadgesPage = () => {
  return (
    <div className={styles.wrapper}>
      <NumberBadge number={4} />
      <ContextualBadge type="error" icon="paperclip" size="big" />
      <AvatarBadge data={users["user1"].profile.avatar} size={24} showName />
      <InputBadge
        value={organizations["NObMQ1fZIouv4UE4K3q9"].name}
        avatar={organizations["NObMQ1fZIouv4UE4K3q9"].avatar}
        onDelete={() => {}}
      />
    </div>
  );
};

export default BadgesPage;
