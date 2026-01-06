import styles from "../VaultItemsWidget.module.css";
import Image from "next/image";

const NoMatchPlaceholder = () => (
  <div className={styles.placeholder}>
    <div className={styles.illustration}>
      <Image
        src="/images/animated-illustrations/workspace.svg"
        alt="workspace"
        fill
      />
    </div>

    <div className={styles.texts}>
      <p>No items match your filter.</p>
      <p>Adjust your filter settings or search query.</p>
    </div>
  </div>
);

export default NoMatchPlaceholder;
