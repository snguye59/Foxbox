import styles from "../FeatureCard.module.css";
import Image from "next/image";
import { ArrowButton } from "src/components/buttons";

const Card5 = () => {
  return (
    <div
      className={`${styles.card} ${styles.small} ${styles.textsFirst} ${styles.card5}`}
    >
      <div className={styles.texts}>
        <p>Share encrypted data securely</p>
        <p>
          Foxbox Send allows users to send data directly to others with
          end-to-end encryption, minimizing exposure.
        </p>
        <ArrowButton text="Learn more" onClick={() => {}} />
      </div>
      <div className={styles.illustration}>
        <Image
          src="/images/animated-mockups/global-file-transfer.svg"
          alt="global file transfer"
          fill
        />
      </div>
    </div>
  );
};

export default Card5;
