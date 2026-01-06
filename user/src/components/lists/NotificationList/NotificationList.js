import styles from "./NotificationList.module.css";
import Link from "next/link";
import { getTimeSince } from "src/helpers/time";
import { AvatarBadge } from "src/components/badges";

const NotificationList = ({ data }) => {
  const { avatar, title, date, link, isUnread } = data;

  return (
    <Link
      href={link}
      className={`
        ${styles.list} 
        ${isUnread ? styles.unread : ""}
      `}
    >
      <div className={styles.info}>
        <AvatarBadge data={avatar} size={44} />
        <div className={styles.texts}>
          <p>{title}</p>
          <p>{getTimeSince(date)}</p>
        </div>
      </div>
    </Link>
  );
};

export default NotificationList;
