import styles from "./NotificationTypeSelector.module.css";
import { NumberBadge } from "src/components/badges";
import { notificationsData } from "src/data/notificationsData";

const NotificationTypeSelector = ({ tab, unread, onTabSelect }) => {
  return (
    <div className={styles.selector}>
      {notificationsData.map((notification) => {
        const { type, title } = notification;

        return (
          <button
            type="button"
            key={type}
            className={`
              ${styles.button}
              ${tab === type ? styles.active : ""}
            `}
            onClick={() => onTabSelect(type)}
          >
            {title}
            {type === "unread" && <NumberBadge number={unread} />}
          </button>
        );
      })}
    </div>
  );
};

export default NotificationTypeSelector;
