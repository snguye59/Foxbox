import styles from "./InputBadge.module.css";
import Image from "next/image";
import { CloseButton } from "src/components/buttons";

const InputBadge = ({ value, avatar, onDelete }) => {
  const { name, image } = avatar || {};

  return (
    <div className={styles.badge}>
      <div className={styles.badgeValue}>
        {avatar && <Image src={image} alt={name} width={24} height={24} />}
        <p>{value}</p>
        {onDelete && <CloseButton size={12} onClick={onDelete} />}
      </div>
    </div>
  );
};

export default InputBadge;
