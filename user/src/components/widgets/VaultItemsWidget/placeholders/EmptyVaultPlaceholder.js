import styles from "../VaultItemsWidget.module.css";
import Image from "next/image";

const EmptyVaultPlaceholder = () => (
  <div className={styles.placeholder}>
    <div className={styles.illustration}>
      <Image
        src="/images/animated-illustrations/content-creator.svg"
        alt="content creator"
        fill
      />
    </div>
    <div className={styles.texts}>
      <p>Your vault is empty.</p>
      <p>Add new item to get started.</p>
    </div>
  </div>
);

export default EmptyVaultPlaceholder;
