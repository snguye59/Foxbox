import styles from "../FeatureCard.module.css";
import Image from "next/image";
import { ArrowButton } from "src/components/buttons";

const Card2 = () => {
  return (
    <div
      className={`${styles.card} ${styles.small} ${styles.illustrationFirst} ${styles.card2}`}
    >
      <div className={styles.illustration}>
        <Image
          src="/images/animated-mockups/intergration-overview.svg"
          alt="account highlight"
          fill
        />
      </div>
      <div className={styles.texts}>
        <p>Enhance teamwork with multi-account architecture</p>
        <p>
          Create a single identity and participate in multiple accounts,
          seamlessly switching between personal, business, or any accounts that
          you’re invited to.
        </p>
        <ArrowButton text="Learn more" onClick={() => {}} />
      </div>
    </div>
  );
};

export default Card2;
