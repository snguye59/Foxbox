import styles from "./TutorialCard.module.css";
import Image from "next/image";
import Link from "next/link";
import { AvatarBadge } from "src/components/badges";

const TutorialCard = ({ data }) => {
  const { title, author, illustration, sections, readingHours, link } = data;
  const { name, image } = illustration;

  return (
    <Link href={link} className={styles.card}>
      <div className={styles.background}>
        <div className={styles.image}>
          <Image alt={name} src={image} sizes="100%" fill />
        </div>
      </div>
      <div className={styles.badge}>
        <AvatarBadge data={author} size={24} showName />
      </div>
      <div className={styles.texts}>
        <h5>{title}</h5>
        <p>
          {sections} sections - {readingHours} hours
        </p>
      </div>
    </Link>
  );
};

export default TutorialCard;
