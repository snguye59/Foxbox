import styles from "./NewUpdatesCard.module.css";
import Link from "next/link";
import Image from "next/image";
import { CloseButton } from "src/components/buttons";

const NewUpdatesCard = ({ data, onClose }) => {
  const { title, caption, link, background } = data;

  return (
    <div className={styles.card}>
      {onClose && (
        <div className={styles.button}>
          <CloseButton size={12} onClick={onClose} />
        </div>
      )}
      <p className={styles.title}>{title}</p>
      <div className={styles.background}>
        <div className={styles.image}>
          <Image
            src={background.image}
            alt={background.name}
            sizes="100%"
            fill
            priority
          />
        </div>
      </div>
      <Link className={styles.link} href={link}>
        {caption}
      </Link>
    </div>
  );
};

export default NewUpdatesCard;
