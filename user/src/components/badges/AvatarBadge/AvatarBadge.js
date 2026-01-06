import styles from "./AvatarBadge.module.css";
import Image from "next/image";

const AvatarBadge = ({ data, size, showName }) => {
  const { name, image } = data;

  return (
    <div
      className={`
        ${styles.badge} 
        ${showName ? styles.showName : ""}
      `}
    >
      <Image
        className={styles.avatar}
        src={image}
        alt={name}
        width={size}
        height={size}
      />
      {showName && <p>{name}</p>}
    </div>
  );
};

export default AvatarBadge;
