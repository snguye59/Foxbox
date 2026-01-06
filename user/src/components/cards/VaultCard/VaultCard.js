import styles from "./VaultCard.module.css";
import Link from "next/link";
import Image from "next/image";
import { SvgIcon } from "src/components/icons";
import { AvatarBadge } from "src/components/badges";

const VaultCard = ({ data }) => {
  const {
    id,
    name,
    description,
    illustration,
    createdByAvatar,
    organizationAvatar,
    size,
    link,
  } = data;

  return (
    <div
      className={`
        ${styles.card} 
        ${id !== "all-vaults" ? styles.hover : ""}
      `}
    >
      <Link
        href={id === "all-vaults" ? link : `${link}/items`}
        className={styles.frontCard}
        style={{ background: illustration.background }}
      >
        <Image
          src={illustration.image}
          alt={illustration.name}
          width={228}
          height={250}
          priority
        />
        <div className={styles.texts}>
          <p>{name}</p>
          <p>
            <span>{size}</span> {`${size > 1 ? "items" : "item"}`}
          </p>
          <p>{description}</p>
        </div>
      </Link>
      <div className={styles.backCard}>
        <div className={styles.avatars}>
          {organizationAvatar && (
            <AvatarBadge data={organizationAvatar} size={32} />
          )}
          {createdByAvatar && <AvatarBadge data={createdByAvatar} size={32} />}
        </div>
        <Link href={link} className={styles.button}>
          <SvgIcon icon="info" />
        </Link>
      </div>
    </div>
  );
};

export default VaultCard;
