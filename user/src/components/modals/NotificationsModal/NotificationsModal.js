import styles from "./NotificationsModal.module.css";
import Link from "next/link";
import { NumberBadge } from "src/components/badges";
import { useState } from "react";
import { getTimeSince } from "src/helpers/time";
import { Divider } from "src/components/utils";
import { users, organizations } from "foxbox-example";

import { AvatarBadge } from "src/components/badges";
import { NotificationTypeSelector } from "src/components/selectors";
import { NotificationList } from "src/components/lists";

const NotificationsModal = () => {
  const [tab, setTab] = useState("unread");

  return (
    <div className={styles.modal}>
      <p>Notifications</p>
      <NotificationTypeSelector tab={tab} unread={4} onTabSelect={setTab} />
      <div className={styles.lists}>
        <NotificationList
          data={users["user1"].notifications["notification1"]}
        />
        <NotificationList
          data={users["user1"].notifications["notification1"]}
        />
        <NotificationList
          data={users["user1"].notifications["notification1"]}
        />
        <NotificationList
          data={users["user1"].notifications["notification1"]}
        />
        <NotificationList
          data={users["user1"].notifications["notification1"]}
        />
        <NotificationList
          data={users["user1"].notifications["notification1"]}
        />
        <NotificationList
          data={users["user1"].notifications["notification1"]}
        />
      </div>
    </div>
  );
};

export default NotificationsModal;
