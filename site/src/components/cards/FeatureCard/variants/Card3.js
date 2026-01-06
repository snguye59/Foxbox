import styles from "../FeatureCard.module.css";
import Image from "next/image";
import { ArrowButton } from "src/components/buttons";

const Card3 = () => {
  return (
    <div
      className={`${styles.card} ${styles.big} ${styles.textsFirst} ${styles.card3}`}
    >
      <div className={styles.texts}>
        <p>Improve on security with Two-Factor Authentication</p>
        <p>
          Add an extra layer of protection to your account with Two-Factor
          Authentication, verifying your identity to prevent unauthorized
          access.
        </p>
        <ArrowButton text="Learn more" onClick={() => {}} />
      </div>
      <div className={styles.illustration}>
        <Image
          src="/images/animated-mockups/two-step-verification.svg"
          alt="two step verification"
          fill
        />
      </div>
    </div>
  );
};

export default Card3;
