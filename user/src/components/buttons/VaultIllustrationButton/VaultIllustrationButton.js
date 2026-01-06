import styles from "./VaultIllustrationButton.module.css";
import Image from "next/image";

const VaultIllustrationButton = ({ data, size, onClick }) => {
  const { name, image, background } = data;

  return (
    <button
      type="button"
      className={`${styles.button} ${styles[size]}`}
      style={{ background }}
      onClick={onClick}
    >
      <div className={styles.illustration}>
        <Image src={image} alt={name} fill />
      </div>
    </button>
  );
};

export default VaultIllustrationButton;
