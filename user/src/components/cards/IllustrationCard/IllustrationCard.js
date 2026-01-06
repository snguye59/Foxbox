import styles from "./IllustrationCard.module.css";
import Image from "next/image";

const IllustrationCard = ({ data }) => {
  const { name, image, background } = data;

  return (
    <div className={styles.card}>
      <div className={styles.frontCard}>
        <Image src={image} alt={name} width={121} height={121} />
      </div>
      <div className={styles.backCard} style={{ background }}></div>
    </div>
  );
};

export default IllustrationCard;
